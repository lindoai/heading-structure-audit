# Heading Structure Audit

Audit heading order, missing H1s, and skipped heading levels.

## Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lindoai/heading-structure-audit)

## Features

- extracts all H1-H6 headings in order
- flags missing H1s
- flags multiple H1s
- flags skipped heading depth

## Local development

```bash
npm install
npm run dev
npm run typecheck
```

## Deploy

```bash
npm run deploy
```

## Production env

- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

## API

### GET `/api/audit?url=https://example.com`

Returns heading list and issue summary in JSON.
