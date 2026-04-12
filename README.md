# Personal Website

This site is built with React + Vite.

## Run locally

1. Install dependencies (already installed if `node_modules` exists):
   - `npm install`
2. Start local dev server with hot reloading:
   - `npm run dev`
3. Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Build for production

- `npm run optimize-images` (recommended after adding or replacing images)
- `npm run build`
- `npm run preview`

`optimize-images` creates resized/compressed derivatives (JPG + HEIC) in `src/assets/optimized/`.
The site uses these optimized files for faster loading and responsive `srcset`.

## Auto Deploy

This repo auto-deploys to Namecheap via GitHub Actions.

- Workflow file: `.github/workflows/deploy.yml`
- Trigger: push to `main` (or run manually from the Actions tab)
- Deploy target: FTP account root (configured to your web root)
- Uploaded folder: `dist/`

Required GitHub repository secrets:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_PORT`

## Pages in this site

- About
- Paintings
- Code Art
- Robots
- Community
- Face Value

## Add images to pages

Place images in these folders:

- `src/assets/page-images/about/`
- `src/assets/page-images/paintings/`
- `src/assets/page-images/code-art/`
- `src/assets/page-images/robots/`
- `src/assets/page-images/community/`
- `src/assets/page-images/face-value/`
