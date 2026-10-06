# Додати банківські реквізити (Intesa Sanpaolo)

Дані надані користувачем: IBAN IT07S0306909606100000186199 (контрольна сума перевірена — валідний), SWIFT/BIC BCITITMM, інтестатаріо PEOPLEFORUKRAINE ODV-ETS, каузале «Donazione di beneficenza».

## Зміни

### 1. `src/lib/site.ts` (об'єкт ORG)
- `iban`: "IT07 S030 6909 6061 0000 0186 199" (з пробілами для читабельності, CopyField копіює як є)
- `bankHolder`: PEOPLEFORUKRAINE ODV-ETS
- `bankName`: Intesa Sanpaolo (визначено з BIC BCITITMM — код належить Intesa Sanpaolo, головне відділення, Мілан; ABI 03069 в IBAN відповідає тому ж банку)
- нове поле `swift`: BCITITMM
- нове поле `donationCausal`: Donazione di beneficenza

### 2. Сторінка «Донат» (`src/routes/$lang.donate.tsx`)
У картці «Bonifico bancario» сітка з 2 полів (Інтестатаріо, Банк) стає з 3: додається SWIFT/BIC — BCITITMM.
Рядок каузале тепер бере значення з `ORG.donationCausal` замість зашитого тексту.

### 3. Словники (`src/i18n/it.ts`, `uk.ts`)
- новий ключ `donate.swift`: «SWIFT/BIC» (обидва мови однаково)
- `donate.causal` → `causalLabel`: it — «Causale consigliata:», uk — «Рекомендоване призначення платежу:» (саме значення каузале — спільне, з ORG)

## Залишається заглушкою
- Телефон, соцмережі (Facebook / Instagram / Telegram), посилання на Statuto PDF

## Перевірка
- tsgo --noEmit + віттести
- Playwright: сторінка /it/donate — IBAN, інтестатаріо, банк, SWIFT, каузале; кнопка «Dona online» веде на paypal.me/PeopleforUkraine
