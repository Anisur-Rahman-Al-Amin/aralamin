# Anisur Rahman Al Amin Portfolio

Responsive React portfolio built with Vite, TypeScript, and Lucide icons.

## Run locally

Install Node.js 22 or newer, then run:

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.
Firebase Hosting serves clean paths such as `/awards`, and rewrites `/api/portfolio` to the protected Cloud Function.

## Update content

Open `/admin`, sign in with the Firebase Auth user, edit a section, and select **Save live** to write the content to MongoDB. Drafts are also saved in that browser. **Download updates** remains available as a backup export.

## Personalize

Edit `src/data/portfolio.ts` to update the profile, research, publication, experience, award, certification, and activity content used by the pages and generated CV. Add or replace a portrait under `public/` and update `profile.imageUrl`. The existing contact email and profile links are configured in the same file.

Place images and documents you are authorized to use in `public/` and update the matching content values.

## Firebase and MongoDB setup

1. In Firebase Authentication, enable Email/Password and create the admin user. Do not put the password in source control.
2. In MongoDB Atlas, create the `Anisur-Rahman` database and `portfolio` collection. Use a least-privilege database user and restrict network access appropriately.
3. Set the server-only Mongo URI with `firebase functions:secrets:set MONGODB_URI`.
4. Sign in at `/admin` and select **Save live** once to initialize the `published` document.
5. For GitHub Actions deployment, add a repository secret named `FIREBASE_SERVICE_ACCOUNT` containing a Firebase deploy service-account JSON document.
6. Deploy locally with `npx firebase-tools deploy --project anisur-rahman-portfolio --only hosting,functions` after authenticating with `firebase login`.

Firebase web configuration is public app metadata. MongoDB credentials and service-account JSON must remain in Secret Manager/GitHub Actions secrets.

## Code map

- `src/App.tsx` composes the page sections.
- `src/components/PortfolioHeader.tsx` owns responsive navigation and active-section state.
- `src/components/HeroSection.tsx` renders the profile introduction and portrait.
- `src/components/PortfolioSections.tsx` contains reusable research, publication, experience, venture, and recognition sections.
- `src/components/ContactSection.tsx` handles the contact form.
- `src/components/SiteFooter.tsx` renders the footer.
- `src/pages/PortfolioDetailPage.tsx` renders each section route from shared data.
- `src/pages/AdminPage.tsx` edits local drafts and exports the typed portfolio data module.
- `src/lib/firebase.ts` initializes Firebase Auth and Analytics.
- `src/lib/portfolioApi.ts` calls the Mongo-backed Cloud Function.
- `functions/index.js` verifies Firebase ID tokens and reads/writes MongoDB.
- `src/pages/AdminPage.tsx` edits portfolio content locally and exports the typed data module.
- `src/data/portfolio.ts` is the single source for editable profile and portfolio entries.
- `src/utils/downloadCv.ts` generates the academic-style CV PDF.
- `styles.css` contains responsive design tokens and component styles.

# aralamin
