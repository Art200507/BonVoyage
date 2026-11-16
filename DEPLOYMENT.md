# Deployment prerequisites

Use Vercel at the repository root. Set the variables from `.env.example`. Enable Google sign-in in your own Firebase project, register the deployment domain under authorized domains, create Firestore, and deploy `firestore.rules` with the Firebase CLI against that same project. The tutorial Firebase configuration has been removed. Old documents without `ownerUid` require a trusted migration; email addresses in localStorage do not authorize access.

Gemini runs only through `/api/generate-trip`, which verifies a Firebase ID token. Configure `GEMINI_API_KEY` server-side and a provider budget/rate limit. Browser Maps keys must be restricted by API and deployment origin. Run with `vercel dev` to serve the API locally. Verify sign-in, generation, saving, reload, cross-user denial, and logout against configured services before advertising a live demo.
