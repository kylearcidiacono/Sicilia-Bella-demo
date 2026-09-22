# Sicilia Bella demo

Complete static website in `dist/`, including the approved logo, food photographs and full text menu.

## Existing Cloudflare Worker

Rename `wrangler.example.jsonc` to `wrangler.jsonc` and replace its `name` value with your existing Worker's exact name. The example is deliberately inactive until that name is confirmed.

For a Git-connected Worker, use this repository root, no build command, and deploy command `npx wrangler deploy`. Keep `dist/` intact. No compilation is required.

Reservations contact the restaurant directly; no online booking backend is included.
