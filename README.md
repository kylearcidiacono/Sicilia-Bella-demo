# Sicilia Bella Ristorante website

Production-ready static website for Sicilia Bella Ristorante in Mġarr Harbour, Gozo.

## Stack

- Static site served from `dist/`
- Cloudflare Workers Static Assets
- No build step
- No database
- No analytics or advertising trackers
- Reservations are confirmed directly by telephone

## Main pages

- `/` — restaurant homepage and menu
- `/reviews/` — selected Google reviews with links to the full Google listing and review form
- `/contact/` — contact details, opening hours and directions
- `/privacy/` — privacy policy
- `/cookies/` — cookie policy
- `/accessibility/` — accessibility statement

## Deployment

The production Worker configuration is in `wrangler.jsonc`. The static asset directory is `./dist`.

For the existing Git-connected Worker, deploy from the repository root using the configured Cloudflare deployment workflow. No compilation is required.

## Go-live domain checklist

The current canonical URLs, Open Graph URLs, Restaurant schema URLs, `robots.txt` and `sitemap.xml` intentionally use the existing Cloudflare Worker address while the custom domain is pending.

When the client's final custom domain is connected, replace the Worker hostname in:

- `dist/index.html`
- `dist/reviews/index.html`
- `dist/contact/index.html`
- `dist/privacy/index.html`
- `dist/cookies/index.html`
- `dist/accessibility/index.html`
- `dist/robots.txt`
- `dist/sitemap.xml`

Then verify HTTPS, canonical URLs, redirects, `robots.txt`, `sitemap.xml`, structured data and all navigation links before submitting the production domain to Google Search Console.

Do not submit the temporary `workers.dev` address to Search Console.

## Content maintenance

- Confirm menu items and prices with the restaurant before changing `dist/menu-data.js`.
- Keep the allergen notice visible unless verified dish-by-dish allergen data is supplied by the restaurant.
- Update opening hours on the homepage, contact page and Restaurant structured data together.
- Selected review text is manually curated; Google remains the source of the complete review history.
- If analytics, pixels, online forms, newsletters, booking systems or payment services are added later, review and update the privacy/cookie setup before enabling them.
