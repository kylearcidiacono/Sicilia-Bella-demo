# Sicilia Bella Ristorante website

Production static website for Sicilia Bella Ristorante in Mġarr Harbour, Gozo.

## Production domain

- Canonical domain: `https://siciliabellagozo.com/`
- Temporary preview: `https://sicilia-bella-demo.kylearcidiacono1.workers.dev/`
- The preview hostname is explicitly marked `noindex` through `dist/_headers`.
- Do not submit the preview hostname to search engines.

## Stack

- Static site served from `dist/`
- Cloudflare Workers Static Assets
- No database
- No server-side application code
- No customer accounts
- No online checkout
- No contact form
- No analytics or advertising pixels
- No paid API dependency
- Reservations are confirmed directly by telephone

## Main pages

- `/` — homepage, festive menus and main restaurant menu
- `/reviews/` — manually curated Google review excerpts with links back to Google
- `/contact/` — address, opening hours, phone, email and directions
- `/privacy/` — privacy information
- `/cookies/` — cookie information
- `/accessibility/` — accessibility statement
- `/terms/` — website terms
- `/404.html` — custom not-found page

## SEO

The production code uses `siciliabellagozo.com` for canonical URLs, Open Graph URLs, structured data, `robots.txt` and `sitemap.xml`.

The XML sitemap intentionally contains only pages intended for search results:

- `/`
- `/reviews/`
- `/contact/`

Legal/information pages use `noindex,follow` and are therefore not included in the sitemap.

The homepage contains `WebSite` and `Restaurant` JSON-LD. Restaurant information should be kept consistent with the Google Business Profile.

## Security and privacy

`dist/_headers` applies browser security headers and prevents the temporary `workers.dev` preview from being indexed.

The site currently makes no application API calls and stores no customer data. External services are limited to outbound links and Google Fonts used for typography.

If analytics, pixels, online forms, newsletters, online reservations, payment services or other data-collection features are added later, review the privacy/cookie setup before enabling them.

## Deployment

The Worker configuration is in `wrangler.jsonc`. Static assets are served from `./dist`.

The custom domain must not be attached until the restaurant approves publication.

## Launch checklist

1. Confirm the final menu, festive menu and seasonal opening hours with the restaurant.
2. Confirm `siciliabellagozo.com` is active in Cloudflare.
3. Preserve all existing MX/TXT email records.
4. Attach `siciliabellagozo.com` to the Sicilia Bella Worker as a Custom Domain.
5. Configure `www.siciliabellagozo.com` to redirect permanently (301) to `https://siciliabellagozo.com`, preserving path and query string.
6. Verify HTTPS and the Cloudflare certificate.
7. Test homepage, menu tabs, festive CTA, reviews, Google review button, contact links, legal pages, mobile navigation and reservation buttons.
8. Verify `https://siciliabellagozo.com/robots.txt`.
9. Verify `https://siciliabellagozo.com/sitemap.xml`.
10. Validate canonical URLs and structured data on the production domain.
11. Add/verify the domain property in Google Search Console.
12. Submit `https://siciliabellagozo.com/sitemap.xml`.
13. Request indexing for the homepage, reviews and contact pages.
14. Update the Google Business Profile website field to `https://siciliabellagozo.com/`.
15. After launch verification, consider disabling the public `workers.dev` route so customers only use the branded domain.

## Content maintenance

- Confirm menu items and prices before changing `dist/menu-data.js`.
- Keep the allergen notice visible unless verified dish-by-dish allergen data is supplied.
- Update regular/seasonal opening hours on the homepage, contact page and Restaurant structured data together.
- Festive menus should be removed or replaced when no longer current.
- Selected review excerpts are manually curated; Google remains the source of the complete and current review history.
