import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLatestBlogPosts } from "@/hooks/use-latest-blog-posts";
import { allIndianRecipes } from "@/data/recipes";

/** Local, optimised copies of recipe photos that also live on GitHub. */
const localRecipeImage: Record<string, string> = {
  "ragi-porridge": "/brand/food/ragi-porridge.webp",
  "sprouted-moong-salad": "/brand/food/sprout-salad.webp",
  "vegetable-dalia": "/brand/food/millet-bowl.webp",
  "millet-idli-coconut-chutney": "/brand/food/idli.webp",
};

const recipePicks = ["ragi-porridge", "sprouted-moong-salad", "millet-idli-coconut-chutney", "vegetable-dalia"]
  .map((id) => allIndianRecipes.find((r) => r.id === id))
  .filter(Boolean) as typeof allIndianRecipes;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const Journal = () => {
  const { posts, loading } = useLatestBlogPosts(4);
  const loaded = !loading;

  const [lead, ...rest] = posts;

  return (
    <section id="journal" className="scroll-mt-20 bg-brand-paper py-20 md:py-32">
      <div className="dg-wrap">
        <div className="flex flex-col justify-between gap-6 border-b border-brand-teal/15 pb-8 md:flex-row md:items-end">
          <Reveal>
            <p className="dg-eyebrow text-brand-terra">The Dietary Guide journal</p>
            <h2 className="mt-5 text-[clamp(2.7rem,6vw,5.2rem)] text-brand-teal">
              Read, cook, <em className="text-brand-terra">eat better.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/blog" className="dg-btn dg-btn-line">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Articles, from the live blog */}
        {!loaded && (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr]" aria-hidden>
            <div className="aspect-[1200/630] animate-pulse rounded-[1.75rem] bg-brand-sand/60" />
            <div className="space-y-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl bg-brand-sand/50" />
              ))}
            </div>
          </div>
        )}

        {loaded && lead && (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <Reveal>
              <Link to={`/blog/${lead.slug}`} className="group block">
                <div className="dg-zoom aspect-[1200/630] overflow-hidden rounded-[1.75rem] bg-brand-sand">
                  <img src={lead.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="mt-6 flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand-terra">
                  <span>{lead.tags[0] || "Nutrition"}</span>
                  <span className="h-px w-6 bg-current opacity-50" />
                  <span className="text-brand-teal/50">{formatDate(lead.created_at)}</span>
                </div>
                <h3 className="mt-3 text-[2rem] text-brand-teal transition-colors group-hover:text-brand-terra md:text-[2.7rem]">{lead.title}</h3>
                <p className="mt-3 line-clamp-3 max-w-2xl text-[0.98rem] leading-[1.7] text-brand-teal/70">{lead.snippet}</p>
              </Link>
            </Reveal>

            <ul className="divide-y divide-brand-teal/15 border-y border-brand-teal/15 lg:-mt-6 lg:border-t-0">
              {rest.map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 70}>
                  <Link to={`/blog/${p.slug}`} className="group grid grid-cols-[1fr_8.5rem] items-start gap-5 py-6 md:grid-cols-[1fr_11rem]">
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-terra">{p.tags[0] || "Nutrition"}</p>
                      <h3 className="mt-2 line-clamp-3 text-[1.45rem] text-brand-teal transition-colors group-hover:text-brand-terra md:text-[1.6rem]">{p.title}</h3>
                      <p className="mt-2 flex items-center gap-1.5 text-[0.76rem] font-semibold text-brand-teal/50">
                        <Clock className="h-3.5 w-3.5" /> {p.reading_time} min read
                      </p>
                    </div>
                    <div className="dg-zoom aspect-[1200/630] overflow-hidden rounded-xl bg-brand-sand">
                      <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        )}

        {/* Recipes, from the recipe library */}
        <div className="mt-20">
          <Reveal className="flex items-baseline justify-between gap-4">
            <h3 className="text-[2rem] text-brand-teal md:text-[2.6rem]">From the recipe library</h3>
            <Link to="/recipes" className="dg-link shrink-0 text-[0.9rem] text-brand-teal">
              All recipes <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <ul className="dg-scroll-x -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {recipePicks.map((r, i) => (
              <Reveal as="li" key={r.id} delay={i * 70} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                <Link to={`/recipes/${r.id}`} className="group block">
                  <div className="dg-zoom aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-brand-sand">
                    <img src={localRecipeImage[r.id] || r.imageUrl} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-terra">
                    {r.mealType} · {r.prepTime}
                  </p>
                  <h4 className="mt-1.5 text-[1.45rem] leading-tight text-brand-teal transition-colors group-hover:text-brand-terra">{r.title}</h4>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Journal;
