# GitHub Pages Deployment Guide

## What's Been Done

Your site is now ready for GitHub Pages with the following improvements:

### 1. Graceful Backend Handling
- When the backend is unavailable, users see a friendly "We're Getting Ready! 🚀" message instead of errors
- The form submission shows: "Our platform is currently being upgraded. We'll be launching soon!"
- Added a launch announcement banner at the top of the site

### 2. GitHub Pages Configuration
- Created `.github/workflows/deploy.yml` for automatic deployment
- Updated `vite.config.ts` with the correct base path
- Added `404.html` for proper SPA routing on GitHub Pages
- Updated `index.html` with SPA routing script

## How to Deploy

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**

### Step 2: Push Your Changes

```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

### Step 3: Wait for Deployment

- Go to the **Actions** tab in your repository
- You'll see the "Deploy to GitHub Pages" workflow running
- Once it's complete (green checkmark), your site is live!

### Step 4: Access Your Site

Your site will be available at:
```
https://thunder25beast.github.io/ai-salon2/
```

## Important Notes

### Backend Status
- The site currently points to: `https://eagle-backend-v2-staging.up.railway.app/api`
- Since this backend is unavailable, the site shows "launching soon" messages
- When you have a new backend, update `src/lib/axios.ts` line 4

### Removing the Launch Banner
When you're ready to remove the "Platform launching soon" banner:
1. Open `src/pages/Index.tsx`
2. Remove these lines:
   ```tsx
   <div className="fixed top-0 left-0 w-full z-50">
     <AnnouncementBanner />
   </div>
   ```
3. Also remove the import: `import AnnouncementBanner from '../components/AnnouncementBanner';`
4. Update `src/components/Navigation.tsx` line 33 from `top-8` back to `top-0`

### Custom Domain (Optional)
If you want to use a custom domain:
1. Go to Settings → Pages
2. Add your custom domain
3. Update the `base` in `vite.config.ts` to `'/'`

## Troubleshooting

### Site Not Loading?
- Check the Actions tab for any build errors
- Make sure GitHub Pages is enabled in Settings
- Wait a few minutes after the first deployment

### Routes Not Working?
- The 404.html and index.html scripts handle SPA routing
- Make sure both files are in the `public` folder

### Need to Deploy from a Different Branch?
- Update `.github/workflows/deploy.yml` line 4 to your branch name
- Or manually trigger the workflow from the Actions tab

## Testing Locally

Before deploying, test the build locally:

```bash
npm run build
npm run preview
```

This will show you exactly what will be deployed to GitHub Pages.
