# Deploy to hanhlinh.github.io

## Step 1: Create the GitHub repo

1. Go to https://github.com/new
2. Repo name: **hanhlinh.github.io** (must match exactly your username + `.github.io`)
3. Set to **Public**
4. Do NOT init with README
5. Click **Create repository**

## Step 2: Init git and push

Open terminal in the project folder (`birthday/website/`):

```bash
cd /Users/hoang.le2/HAL/birthday/website

git init
git add -A
git commit -m "Birthday website for Anh Linh"
git branch -M main
git remote add origin https://github.com/hanhlinh/hanhlinh.github.io.git
git push -u origin main
```

## Step 3: Deploy to GitHub Pages

Run the deploy command:

```bash
bun run deploy
```

This will:
- Build the project (`bun run build`)
- Push the `dist/` folder to a `gh-pages` branch automatically

## Step 4: Enable GitHub Pages

1. Go to https://github.com/hanhlinh/hanhlinh.github.io/settings/pages
2. Under **Source**, select **Deploy from a branch**
3. Branch: **gh-pages** / **/ (root)**
4. Click **Save**

## Step 5: Wait and visit

- Wait 1-2 minutes for GitHub to deploy
- Visit: **https://hanhlinh.github.io**

## Redeploy after changes

Every time you make changes, just run:

```bash
bun run deploy
```

That's it. The site will update in 1-2 minutes.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 404 page | Check that `gh-pages` branch exists and Pages source is set to `gh-pages` |
| Blank page | `base: './'` in `vite.config.ts` should already handle this |
| Images not loading | Make sure all images are in `src/assets/` and imported properly |
| Music not playing | User must click/tap the page first (browser autoplay policy) |
