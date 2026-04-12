# Personal Website

This site is built with React + Vite.

## What "Byte" is (likely Vite)

You were likely thinking of **Vite** (pronounced like "veet").
It is a fast frontend dev tool that gives you:

- local development server
- hot module replacement (hot reloading)
- production build output

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
