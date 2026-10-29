# Email notification for form submissions → info@people4ukraine.org

## Options compared

| | (a) Lovable built-in app email | (b) Resend / Brevo | (c) Existing mailbox over SMTP |
|---|---|---|---|
| Account / API key to manage | None (managed) | New account + API key secret | Mailbox password stored as secret |
| DNS work for owner | Add 2 NS records once (subdomain `notify.people4ukraine.org`) | Add SPF/DKIM/DMARC records manually | None, but deliverability depends on the mailbox host |
| Works on this hosting | Yes, designed for it | Yes (HTTPS API) | Poor: the server runs on an edge runtime without normal SMTP sockets; typical SMTP libraries do not work |
| Retries, bounces, logs | Built in (More → Emails) | Built in at provider | None; password change breaks sending silently |
| Effect on existing mailbox | None (mailbox MX on root domain untouched) | None if configured carefully | Risk of account lock for "suspicious login" |
| Cost | Included with paid plan | Free tier, then paid | Free |

**Recommendation: (a) Lovable built-in app email.** No API key or password to store, no SMTP, delivery logs and retries included, and the association's normal mailbox at `info@people4ukraine.org` keeps working exactly as today. Notifications come from e.g. `noreply@notify.people4ukraine.org` (or the root domain as display) to `info@people4ukraine.org`, with Reply-To = visitor, so "Reply" goes straight to the visitor.

Note: Lovable appends a small unsubscribe footer to every app email; the owner must simply not click it on these notifications.

## What the owner has to do (non-technical)

1. Click "Set up email domain" when I show it, enter `people4ukraine.org`.
2. Lovable shows two "NS" records. Log in where the domain was bought (the registrar) and add them exactly as shown. They only affect `notify.people4ukraine.org`; website and mailbox are untouched.
3. Wait (minutes to a few hours) until More → Emails shows the domain as verified. No passwords or keys needed.
4. If the registrar cannot add NS records, tell me; alternatives are moving DNS to a provider that supports them (e.g. Cloudflare free) or transferring the domain into Lovable.

(Option b would instead need: create a Resend/Brevo account, add its SPF/DKIM/DMARC records, then paste the API key into the secure secret form I open. Option c would need the mailbox SMTP password in the secret form; not recommended.)

## Newsletter recommendation

Do **not** email the association for every newsletter signup. Signups stay in the database and remain visible in Admin → Messaggi ricevuti (filter "newsletter"). A digest is not needed now; if wanted later, it can be a weekly summary to the owner only.

## Step plan

1. Check the email domain status; if none, show the setup dialog (owner steps above). Steps 2–7 can be built before DNS verifies; emails start once verified.
2. Scaffold the app-email template system (template registry + server-only send helper).
3. Create one template `submission-notification`: subject `[People for Ukraine] New {kind} request` (contact message / volunteer / member / partner), body with kind, name, email, phone (if given), message, language, time. Fixed recipient `info@people4ukraine.org`. All values rendered as React props (auto HTML-escaped, no raw HTML); plain-text version generated alongside.
4. New server function `submitForm` (public, server-side): validates input with zod (same rules as today, limits on lengths), checks honeypot + minimum fill time again on the server (client token of start time), applies rate limit, inserts the row with the server client, then sends the notification (skipped for `newsletter`). Email send wrapped in try/catch: failure is logged (`console.error` with submission id and error code, no message body), and the visitor still gets "sent". Idempotency key = `submission-notify-{id}`. Reply-To = visitor email.
5. `SubmissionForm.tsx` calls `submitForm` instead of inserting directly from the browser. Honeypot and 2.5 s fill-time check stay on the client too. Design and texts unchanged.
6. Database migration:
   - Remove the anonymous browser insert policy on `submissions` (all inserts now go through the server), so the form cannot be bypassed to skip limits.
   - Add `submission_rate_limits` (hashed IP / email key, window start, count), RLS on, no public access; used only by the server function.
7. Rate limiting (ad-hoc, since the platform has no built-in one): max ~5 submissions per IP per 10 min and ~3 per email per hour; above it the server returns a friendly "try later" error. IP is stored only as a SHA-256 hash, rows older than 1 day are cleaned on each check. Tradeoff: simple and good enough against casual abuse, not a full anti-bot system. Please confirm you want this.
8. Tests (vitest): kind → subject mapping, newsletter does not trigger a send, email failure still returns success, rate limit blocks the 6th request, validation rejects oversized input.
9. End-to-end check: submit a test contact form in preview → confirm the row in the database → confirm a `sent` event in email logs and arrival at info@people4ukraine.org (check spam folder) → test Reply goes to the visitor → submit newsletter and confirm no email → delete only the test rows by id.

## Risks and mitigations

- **Spam abuse of the endpoint**: server-side validation, honeypot, fill time, rate limit, newsletter excluded; recipient is fixed so the endpoint cannot be used to email anyone else. If spam grows, add a captcha (e.g. Cloudflare Turnstile) later.
- **Notifications landing in spam**: managed SPF/DKIM on the notify subdomain; owner adds the sender address to contacts / marks "not spam" once. Optionally add a DMARC record on the root domain.
- **DNS not completed**: submissions are still stored and visible in Admin; only the email is missing (logged).
- **Unsubscribe footer clicked by mistake**: blocks further notifications; recoverable via the hosted resubscribe page.
- **Personal data**: email contains only what the visitor typed; no IP or extra data.

## Technical details — files touched

- New: `src/lib/email-templates/registry.ts`, `send-email.ts` (scaffolded), `src/lib/email-templates/submission-notification.tsx`
- New: `src/lib/submissions.functions.ts` (server function: validate, rate-limit, insert, notify)
- New: `src/lib/submission-email.ts` (pure helpers: subject by kind, shouldNotify) + `src/test/submissions.test.ts`
- Edit: `src/components/site/SubmissionForm.tsx` (call server function, show rate-limit error)
- Edit: `src/i18n/it.ts`, `src/i18n/uk.ts` (one "too many attempts" string)
- New migration: drop anon insert policy on `submissions`; create `submission_rate_limits` with RLS
- Edit: `AGENTS.md` (rule: form submissions go through the server function; notifications via app email)
- Scaffolded email routes under `src/routes/lovable/email/...` (auto)
