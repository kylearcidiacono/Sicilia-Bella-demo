# Sicilia Bella Ristorante — handover and maintenance record

Last technical review: 23 October 2026

## Ownership and accounts

- Domain: `siciliabellagozo.com`
- Registrar: Namecheap
- DNS: Cloudflare
- Hosting: Cloudflare Workers Static Assets
- Source control: GitHub repository `kylearcidiacono/Sicilia-Bella-demo`

The restaurant/client should retain ownership of the domain registration. Website maintenance access can be delegated without sharing the owner's registrar password.

## Architecture

This is a static informational restaurant website. It has no database, customer login, checkout, online payment processing, newsletter, contact form or hidden admin panel.

Because there is no application database or API backend:
- there are no customer records stored by the website;
- there are no exposed application API keys in the frontend;
- there are no recurring paid API calls that can run away in cost;
- a traffic spike primarily affects Cloudflare static-asset delivery rather than a metered database/API backend.

## Third parties

The website currently uses:
- Cloudflare for DNS, hosting, caching and security;
- Google Fonts for typography;
- outbound links to Google Maps/Google Reviews, Instagram and Facebook.

No Google Analytics, Meta Pixel or advertising tracker is installed.

## Legal/information pages

Present:
- Privacy Policy
- Cookie Policy
- Accessibility statement
- Website Terms
- Custom 404 page
- Food allergy/intolerance notice in the menu

No refund policy is included because the website does not sell products or take payments online. There are no online forms, so form-consent, form-error and thank-you pages are not applicable.

These pages are practical website information and are not a substitute for advice from the restaurant's accountant or lawyer if the business later adds ecommerce, online booking, payments, marketing tracking or customer accounts.

## Search setup

Prepared before launch:
- production-domain canonical URLs;
- unique titles/descriptions for primary pages;
- Open Graph metadata;
- favicon reference;
- descriptive image alt text;
- Restaurant JSON-LD;
- WebSite JSON-LD;
- `robots.txt`;
- XML sitemap;
- internal links to Reviews and Contact;
- temporary `workers.dev` preview marked `noindex`.

Search Console submission and indexing are launch-day actions because the restaurant has requested that the production website not be published yet.

## Security

Cloudflare static-asset headers provide:
- clickjacking protection;
- MIME-sniffing protection;
- referrer restrictions;
- camera/microphone/location permissions disabled;
- a Content Security Policy restricting loaded resources;
- `noindex` protection on the temporary Worker preview.

No secret keys or passwords should ever be committed to this repository.

## Client-supplied content

Menu information, prices, opening hours, business contact information, reviews and imagery should be treated as client/business content. Changes should be confirmed with the restaurant before publication.

## Maintenance arrangement

Typical paid maintenance items may include:
- menu/price updates;
- seasonal and holiday opening hours;
- festive menu additions/removal;
- new images;
- review refreshes;
- future feature additions.

Opening hours must be updated in all three places when changed:
1. homepage;
2. contact page;
3. Restaurant structured data.

## Launch-day DNS

Preferred canonical hostname: `siciliabellagozo.com`.

Attach the apex domain to the Worker. Configure `www.siciliabellagozo.com` as a 301 redirect to the apex hostname while preserving the path/query string.

Do not remove existing MX/TXT email records when changing website DNS.

## Backup / outage plan

GitHub is the source backup. The site is plain static HTML/CSS/JS in `dist/`, so it can be redeployed to another static host if required. In a prolonged Cloudflare hosting issue, deploy the same `dist/` output to an alternative host and update DNS after verifying the replacement.

## Handover acceptance checks

Before final handover:
- client approves desktop and mobile appearance;
- client approves current menu/prices;
- client approves festive menu;
- client approves opening hours;
- all phone/email/map/review links are tested;
- domain HTTPS works;
- root/www redirect works;
- Search Console sitemap is accepted;
- Google Business Profile points to the production domain.
