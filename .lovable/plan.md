# Bank details + Facebook + Statuto PDF

## 1. Bank details (src/lib/site.ts, ORG)
- iban: `IT07S0306909606100000186199` (displayed grouped for readability; CopyField copies the raw value)
- bankHolder: `PEOPLEFORUKRAINE ODV-ETS`
- bankName: `Intesa Sanpaolo`
- new field swift: `BCITITMM`
- new field donationCausal: `Donazione di beneficenza`
- phone, socials.instagram, socials.telegram stay placeholders

## 2. Donate page
- The bank-transfer grid gains a third column: **SWIFT/BIC** (holder, bank, SWIFT).
- The causal line renders the translated label followed by `ORG.donationCausal` instead of the hardcoded sentence.
- New i18n keys in both dictionaries: `donate.swift` ("SWIFT/BIC"), `donate.causalLabel` (it: "Causale consigliata:", uk: "Рекомендоване призначення платежу:"). The old `causal` key is replaced.

## 3. Facebook
- ORG.socials.facebook → `https://www.facebook.com/peopleforukraine`.
- It appears automatically in the contact page, footer, and the JSON-LD `sameAs` (realSocials already picks it up).

## 4. Hide unused social buttons
- Contact page and footer render each social icon only when the URL is real (`isReal`), so Instagram and Telegram disappear until real profiles exist. Design unchanged for real links.

## 5. Statuto PDF
- Create a CDN asset pointer from the uploaded `001_-_atto_registrato.pdf` → `src/assets/statuto.pdf.asset.json`.
- ORG.statutoUrl → that CDN URL.
- About page: the "Scarica lo Statuto (PDF)" button becomes a real download link (`target="_blank"`, download attribute) and the "Documento da caricare" note is dropped (the `statutoNote` i18n key is removed).

## Verification
- tsgo --noEmit, vitest.
- Playwright on /it/donate, /uk/donate, /it/about, /uk/contact: SWIFT row, causal text, Facebook link live, Instagram/Telegram hidden, Statuto button downloads the real PDF.
