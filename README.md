# People for Ukraine — website

Multilingual website (Italian default, Ukrainian; English-ready) for **People for Ukraine**, a Ukrainian-Italian non-profit association in Rimini. Public pages present the association, activities, news & events, donations (IBAN, 5×1000) and contact/volunteer forms; a protected admin area lets editors publish bilingual news/events and read form submissions.

## Stack
TanStack Start (React 19, SSR) · Vite · Tailwind CSS v4 · shadcn/ui · Lovable Cloud (database, auth, storage). Fonts (Manrope, Unbounded) are self-hosted.

## Setup
```bash
bun install
bun run dev      # http://localhost:8080
bunx vitest run  # tests
```
Environment variables (`.env`) are provided by Lovable Cloud. Optional: `SITE_URL` (e.g. `https://example.org`) forces the origin used in canonical/hreflang URLs; otherwise it is taken from the request.

## Content
- Organisation details (IBAN, codice fiscale, address, socials, partners): `src/lib/site.ts`. Values in `[brackets]` are placeholders and are left out of structured data.
- UI translations: `src/i18n/*.ts`. To add English, create `en.ts` and add it to `LOCALES`.
- Admin: sign in at `/auth`; the first account became admin. News/events are managed at `/admin`.
