# AppStore Platform

A responsive **React + Vite** app store for browsing apps by category, viewing details on a protected route, toggling install state, posting session-based reviews, and managing your profile with **Firebase Authentication**.

## Features

- **Public:** Home (`/`), Apps catalog (`/apps`) with Swiper slider (3+ slides), trending (top ratings), Productivity / Gaming / Education sections, **Most Downloaded** extra section, About (`/about`).
- **Auth:** Login & Register with email/password, **Google** sign-in, password rules (uppercase, lowercase, min 6 chars), **React Toastify** for feedback, `onAuthStateChanged` with navbar loading state.
- **Protected:** App details (`/app/:id`), My Profile (`/profile`) — unauthenticated users are redirected to `/login` with return navigation.
- **App details:** Full JSON fields, Install/Uninstall toggle, reviews (install at least once to review; after uninstall you can still review if you had installed), instant session reviews.
- **Profile:** Display name, email, photo; update via Firebase `updateProfile()`.
- **404** custom page; **dynamic** `document.title` per page; **`public/_redirects`** for SPA hosting on Netlify.

## Tech stack

React 18, React Router 7, Tailwind CSS, DaisyUI, Firebase Auth, Swiper, AOS, react-icons, react-toastify.

## Setup

1. **Clone / open** the `appstore-platform` folder.

2. **Install**

   ```bash
   npm install
   ```

3. **Firebase**

   - Create a Firebase project and enable **Authentication** → Email/Password and **Google**.
   - Add your production domain under **Authorized domains** (e.g. Netlify subdomain).
   - Copy `.env.example` to `.env.local` and fill in your web app config:

   ```bash
   cp .env.example .env.local
   ```

4. **Run locally**

   ```bash
   npm run dev
   ```

5. **Build**

   ```bash
   npm run build
   ```

   Preview production build:

   ```bash
   npm run preview
   ```

## Deployment (Netlify / Firebase Hosting / Surge)

- Build command: `npm run build`
- Publish directory: `dist`
- Ensure SPA fallback: this repo includes `public/_redirects` with `/* /index.html 200` for Netlify. For Firebase Hosting, add a rewrite to `index.html` in `firebase.json`.

## Data

Catalog lives in `src/data/apps.json` (9 apps, 3 categories). Replace or fetch from an API as needed.

## Assignment checklist

Remember: meaningful **Git commits**, **README**, responsive UI, **env-based** Firebase config, hosting with **authorized domains**, and no **reload errors** on protected routes (SPA redirect rules + client router).
