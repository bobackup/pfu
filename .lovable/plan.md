# Внести юридичні дані асоціації

## Що змінюємо

Єдиний файл: `src/lib/site.ts` (об'єкт `ORG`). Значення, які стали реальними:

| Поле | Нове значення |
|---|---|
| `legalName` | People for Ukraine ODV-ETS |
| `legalForm` | ODV — Organismo di Volontariato (Ente del Terzo Settore) |
| `address` | Via Dei Mille, 16 — 47842 San Giovanni in Marignano (RN), Italia |
| `codiceFiscale` | 91185700407 |
| `email` | info@people4ukraine.org |
| `paymentUrl` | https://paypal.me/PeopleforUkraine (розшифровано з QR-коду з вашого скану; профіль PEOPLE FOR UKRAINE ODV-ETS активний) |
| `mapEmbed` / `mapLink` | прив'язані до нової адреси (San Giovanni in Marignano) |

Рахунок банку (IBAN, банк, власник) користувач поки не додав — ці поля лишаються заглушками в `[дужках]`.

## Що лишається заглушкою (дані ще не надані)

- Телефон, IBAN, назва банку та власник рахунку
- Соцмережі (Facebook / Instagram / Telegram)
- Посилання на Statuto PDF

Вони залишаться в `[дужках]`, поки ви їх не надішлете.

## Де це відобразиться (автоматично, без інших правок)

- «Донат»: кнопка онлайн-донату тепер веде на paypal.me/PeopleforUkraine (замість example.com)

- Футер: назва, адреса, C.F., email (у стрічці 5x1000 тепер реальний код)
- «Про нас»: блок юридичних даних
- «Контакти»: адреса, email, карта за новою адресою
- «Приватність» (it + uk): контролер даних / titolare
- «Донат»: код фіскале для 5x1000
- JSON-LD (schema.org NGO): legalName, адреса, email, taxID — з'являться в структурованих даних, бо функція `isReal` тепер бачить реальні значення

## Перевірка

- tsgo --noEmit + віттести
- Playwright: сторінки /it/about, /it/contact, /it/privacy — переконатися, що заглушки замінені реальними даними, карта веде за новою адресою
