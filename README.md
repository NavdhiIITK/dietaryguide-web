# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/98898bb5-a368-4660-a64d-36a6424af23b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/98898bb5-a368-4660-a64d-36a6424af23b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/98898bb5-a368-4660-a64d-36a6424af23b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Blog System

This project includes a hybrid blog system that supports both:

1. **Static blogs** - Defined in `src/data/blogs.ts` for SEO-optimized content
2. **Dynamic blogs** - Stored in Supabase for user-generated content

### Blog Routing Fix

The blog detail pages (`/blog/:id`) have been fixed to handle both static and dynamic content sources. The system now:

- First checks for static blogs in the local data file
- Falls back to Supabase for dynamic blogs
- Includes proper GitHub Pages SPA routing support
- Handles 404 redirects correctly for client-side routing

### GitHub Pages Deployment

The project includes:
- `public/404.html` for SPA routing on GitHub Pages
- GitHub Actions workflow for automated deployment
- Proper base path configuration in Vite

# Deployment trigger update



