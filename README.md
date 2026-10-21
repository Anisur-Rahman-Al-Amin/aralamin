# Anisur Rahman Al Amin Portfolio

Responsive React portfolio built with Vite, TypeScript, and Lucide icons.

## Run locally

Install Node.js 22 or newer, then run:

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.
Section pages use clean paths such as `/aralamin/awards`. A generated `404.html` fallback keeps direct links and page refreshes working on GitHub Pages.

## Update content

Open `/aralamin/admin`, choose a section, and edit its fields. Drafts are saved only in that browser. Select **Download updates** to create a replacement `portfolio.ts`; copy it over `src/data/portfolio.ts`, run `npm run build`, then commit and push to publish. The admin page does not store credentials or publish directly.

## Personalize

Edit `src/data/portfolio.ts` to update the profile, research, publication, experience, award, certification, and activity content used by the pages and generated CV. Add or replace a portrait under `public/` and update `profile.imageUrl`. The existing contact email and profile links are configured in the same file.

Open `/aralamin/admin` to edit content in the browser. Drafts stay in that browser. Select **Download updates**, replace `src/data/portfolio.ts` with the downloaded file, run `npm run build`, then commit and push to publish. The static admin does not publish directly and does not store GitHub credentials.

Place images and documents you are authorized to use in `public/` and update the matching content values.

## Code map

- `src/App.tsx` composes the page sections.
- `src/components/PortfolioHeader.tsx` owns responsive navigation and active-section state.
- `src/components/HeroSection.tsx` renders the profile introduction and portrait.
- `src/components/PortfolioSections.tsx` contains reusable research, publication, experience, venture, and recognition sections.
- `src/components/ContactSection.tsx` handles the contact form.
- `src/components/SiteFooter.tsx` renders the footer.
- `src/pages/PortfolioDetailPage.tsx` renders each section route from shared data.
- `src/pages/AdminPage.tsx` edits local drafts and exports the typed portfolio data module.
- `src/pages/AdminPage.tsx` edits portfolio content locally and exports the typed data module.
- `src/data/portfolio.ts` is the single source for editable profile and portfolio entries.
- `src/utils/downloadCv.ts` generates the academic-style CV PDF.
- `styles.css` contains responsive design tokens and component styles.

# aralamin
