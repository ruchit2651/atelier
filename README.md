# Atelier North — Architecture Portfolio

A React 18 + Vite portfolio and studio content manager. The public site runs on local seed content without Firebase; configure Firebase to enable authentication, live Firestore content, contact submissions, and image uploads.

## Folder structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── vercel.json
├── netlify.toml
├── firestore.rules
├── storage.rules
├── seed/content.json
└── src/
    ├── main.jsx, App.jsx
    ├── admin/Admin.jsx
    ├── assets/                 # Add local brand assets here
    ├── components/             # Layout, cards, buttons, SEO, modal, loader
    ├── context/                # Auth and theme contexts
    ├── hooks/useCollection.js
    ├── pages/                  # Home, projects, about, journal, contact, 404
    ├── services/               # Firebase, Firestore data, Storage upload
    └── styles/global.css
```

## Local setup

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`. The public demo works without Firebase values.
4. Run `npm run dev` and open the URL printed by Vite.
5. Run `npm run build` for a production build; `npm run preview` previews that build.

## Firebase setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/), register a Web app, and copy its config into `.env.local` using the `VITE_FIREBASE_*` keys in `.env.example`.
2. Enable **Authentication → Email/Password**. Create the studio admin account(s) in Authentication.
3. Create Firestore Database. In Firestore, create a document `admins/{AUTH_UID}` for each trusted admin UID. Do this from the Firebase console or a trusted Admin SDK environment; client rules intentionally forbid edits to this allow-list.
4. Publish `firestore.rules` from the Firebase console. The rules require an `admins/{uid}` document for every privileged operation; a frontend UID setting is only a display gate and is not the security boundary.
5. Set `VITE_ADMIN_USERNAME` and `VITE_ADMIN_EMAIL` in `.env.local` for the admin username sign-in. The email must belong to the Firebase Email/Password account. Paste its trusted UID into `VITE_ALLOWED_ADMIN_UIDS` (comma-separated) and create `admins/{uid}` in Firestore. Restart Vite after changing environment values.
6. Import `seed/content.json` into Firestore, creating collections `projects`, `posts` and document `settings/site`. Add optional `team` and `testimonials` docs the same way. The sample images are remote Unsplash URLs; replace them with studio-owned images.

### Security rules

The included Firestore rules allow public reads for published portfolio content and settings, public contact-message creation with basic validation, and admin-only content management/inbox access. Storage reads are public while writes require the Firestore admin allow-list and an image under 10 MB. Review rules against your final data fields before launch. Never put Firebase Admin credentials in this frontend.

### Admin notes

Go to `/admin`, sign in with an enabled account, and add its UID to both `admins/{uid}` and `VITE_ALLOWED_ADMIN_UIDS`. The admin provides read-only lists for projects and team members, site hero/contact settings, and the inquiry inbox. Blog and testimonial sections are not available in the admin. Existing project and team images appear as thumbnails when available; images have no admin controls to upload, replace, reorder, or delete them. Published records and settings update on public pages in real time; drafts stay hidden. Project visibility is separate from the project's completion status. Contact submissions are written to `messages`.

Without Firebase, demo content changes are stored in the current browser and update its public pages immediately (and other tabs in that browser). Demo changes are not shared with visitors on other devices. Configure Firebase and deploy the Firestore/Storage rules for shared, live site updates.

## Deployment

Deploy the repository to Vercel or Netlify, set the same `VITE_FIREBASE_*` variables and `VITE_ALLOWED_ADMIN_UIDS` in the hosting dashboard, then deploy. `vercel.json` and `netlify.toml` rewrite SPA paths to `index.html`, so nested routes load directly. Use the Firebase Auth authorized-domain settings for the production hostname. Do not deploy `.env.local`.

## Customize before launch

- Studio name, wordmark, biography, office address, phone, email, socials, and maps location.
- Palette and type in `src/styles/global.css` (Playfair Display + DM Sans by default).
- Hero title/image, projects, categories, team, testimonials, awards, and journal content.
- Admin allow-list, Firestore/Storage rules, privacy/consent text, and form validation for your jurisdiction.

## Current implementation boundaries

The starter includes route-level page transitions, responsive navigation, reduced-motion support, light/dark preference, semantic labels, image alt text, and data loading/error/empty states. Before production, connect the admin inbox/settings screens, replace the basic textarea content editor with a maintained rich-text editor if formatting is needed, implement sortable gallery editing, and add a real newsletter provider. These capabilities require provider-specific configuration and are presented as clear extension points rather than fake integrations.
