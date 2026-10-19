<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Public pages live under `src/routes/$lang.*` (it, uk); UI strings in `src/i18n/*.ts` typed by `Dict` — add a locale by adding a dictionary and listing it in `LOCALES`.
- Posts store per-language columns (`title_it`, `title_uk`, `title_en`…) read via `pickLocalized`, so new languages need no schema rewrite.
- Public post reads go through server functions with a publishable client so pages render for SEO.
- Editor access uses the `user_roles` table + `is_editor()`; the first signed-in user claims admin via `claim_first_admin()`.
- The image bucket is private (public buckets are blocked by workspace policy), so uploads store long-lived signed URLs.
- Organisation details (IBAN, codice fiscale, address) live in one file, `src/lib/site.ts`.
- Absolute SEO URLs (canonical, hreflang, og:url/og:image) use the origin loaded by the `/$lang` layout via `getRequestOrigin` (SITE_URL env overrides) and passed through `pageHead`; keeps tags correct on any domain.
- Curated documentary photos live as CDN asset pointers and are referenced from static bilingual content; this keeps source history small while preserving real association imagery.
