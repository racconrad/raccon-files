# raccon-files

Bilingual (ES/EN) personal portfolio built with Astro, Tailwind and GSAP: a raccoon guides visitors through projects, skills, journey and contact scenes.

Live: https://racconrad.github.io/raccon-files/

## Run locally

```sh
pnpm install
pnpm dev
```

`pnpm build` writes the static site to `dist/`. Pushing to `main` deploys it to GitHub Pages.

## Edit content

- Profile, projects, skills, timeline and `show` toggles: `src/data/portfolio.ts`
- ES/EN copy: `src/data/ui.ts`
- Colors and links: `src/site.config.ts`
- Raccoon poses: `public/images/raccoon/*.svg`

Fonts are self-hosted; licenses are in `public/fonts/`.
