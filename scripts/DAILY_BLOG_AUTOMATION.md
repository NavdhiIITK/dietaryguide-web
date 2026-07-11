# Daily Blog Automation

Fully automatic daily blog posting for Dietary Guide. Every day a GitHub Action
writes one fresh, SEO + AI-search optimised article, renders a branded thumbnail,
pushes the image to the `dgblog` repo, and publishes the post straight to Firestore
so it is live on dietaryguide.in within seconds. Runs on GitHub's servers, so your
computer does not need to be on.

## Files

- `.github/workflows/daily-blog.yml` — the schedule + orchestration (runs 07:00 IST daily).
- `scripts/generate-blog-post.mjs` — writes the article with Claude (uses web search to
  fact-check, dedupes against your existing Firestore posts, and self-validates against
  the style guide: no em dashes, no banned phrases, allowed HTML tags only, 900-1500
  words, keyword placement, FAQ, approved tags). Output: `post.json`.
- `scripts/make_thumbnail.py` — renders a 1200x630 branded thumbnail from `post.json`.
- `scripts/assets/fonts/` — bundled Poppins fonts so the thumbnail looks identical in CI.
- `scripts/publish-blog-post.mjs` — writes `post.json` to Firestore (the `blogs` collection).

## One-time setup

### 1. Add three GitHub repository secrets
Repo → Settings → Secrets and variables → Actions → New repository secret:

- `ANTHROPIC_API_KEY` — your Claude API key (used to write the article).
- `FIREBASE_SERVICE_ACCOUNT_JSON` — the full contents of
  `scripts/dietaryguideblog-firebase-adminsdk-fbsvc-745313ecb4.json` (paste the whole JSON).
- `DGBLOG_TOKEN` — a GitHub token with write access to `amishardev/dgblog`
  (fine-grained token → Repository access: `amishardev/dgblog` → Contents: Read and write).

### 2. (Optional) Pick a model
Repo → Settings → Secrets and variables → Actions → Variables → New variable:
- `ANTHROPIC_MODEL` — defaults to `claude-sonnet-5` if unset.

### 3. Test before it goes live
Actions tab → **Daily Blog Post** → **Run workflow** → tick **dry_run** → Run.
This writes the article and thumbnail and uploads them as a downloadable artifact,
without pushing the image or publishing. Review the artifact, then run again without
dry_run (or wait for the 07:00 IST schedule) to publish for real.

## Notes

- Duplicate protection: the publisher refuses to overwrite an existing slug, and the
  writer is given your existing titles to avoid. If a title still collides, the run
  fails loudly rather than overwriting.
- Thumbnails accumulate in `amishardev/dgblog/thumbnails/<slug>.png`.
- Change the time by editing the `cron` line in the workflow (it is in UTC; 07:00 IST = `30 1 * * *`).
- Local run (from your machine, which can reach Firestore):
  `node scripts/generate-blog-post.mjs && python scripts/make_thumbnail.py post.json thumb.png`
  then set an `image` URL in `post.json` and `node scripts/publish-blog-post.mjs post.json`.
- The service account key is gitignored (`dietaryguideblog-*.json`); never commit it.
