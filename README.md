# Anisur Rahman Al Amin Portfolio

Responsive React portfolio built with Vite, TypeScript, and Lucide icons.

## Run locally

Install Node.js 22 or newer, then run:

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.
Section pages use hash routes such as `/#/awards`, so direct navigation works on static GitHub Pages hosting.

## Personalize

Edit `src/data/portfolio.ts` to update the profile, research, publication, experience, award, certification, and activity content used by the pages and generated CV. Add or replace a portrait under `public/` and update `profile.imageUrl`. The existing contact email and profile links are configured in the same file.

Place images and documents you are authorized to use in `public/` and update the matching content values.

## Code map

- `src/App.tsx` composes the page sections.
- `src/components/PortfolioHeader.tsx` owns responsive navigation and active-section state.
- `src/components/HeroSection.tsx` renders the profile introduction and portrait.
- `src/components/PortfolioSections.tsx` contains reusable research, publication, experience, venture, and recognition sections.
- `src/components/ContactSection.tsx` handles the contact form.
- `src/components/SiteFooter.tsx` renders the footer.
- `src/pages/PortfolioDetailPage.tsx` renders each section route from shared data.
- `src/data/portfolio.ts` is the single source for editable profile and portfolio entries.
- `src/utils/downloadCv.ts` generates the academic-style CV PDF.
- `styles.css` contains responsive design tokens and component styles.

# aralamin
