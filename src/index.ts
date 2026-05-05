import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { parseHTML } from 'linkedom';
import { readTurnstileTokenFromUrl, verifyTurnstileToken } from '../_shared/turnstile';
import { renderTextToolPage, turnstileSiteKeyFromEnv } from '../_shared/tool-page';

type Env = { Bindings: { TURNSTILE_SITE_KEY?: string; TURNSTILE_SECRET_KEY?: string } };

const app = new Hono<Env>();
app.use('/api/*', cors());
app.get('/', (c) => c.html(renderTextToolPage({ title: 'Heading Structure Audit', description: 'Audit heading levels, missing H1s, and skipped hierarchy depth.', endpoint: '/api/audit', sample: '{ "headingCount": 0, "issues": [] }', siteKey: turnstileSiteKeyFromEnv(c.env), buttonLabel: 'Audit', toolSlug: 'heading-structure-audit' })));
app.get('/health', (c) => c.json({ ok: true }));
app.get('/api/audit', async (c) => {
  const captcha = await verifyTurnstileToken(c.env, readTurnstileTokenFromUrl(c.req.url), c.req.header('CF-Connecting-IP'));
  if (!captcha.ok) return c.json({ error: captcha.error }, 403);
  const normalized = normalizeUrl(c.req.query('url') ?? '');
  if (!normalized) return c.json({ error: 'A valid http(s) URL is required.' }, 400);
  const html = await fetchHtml(normalized);
  if (!html) return c.json({ error: 'Failed to fetch page.' }, 502);
  const { document } = parseHTML(html);
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((el: any) => ({ level: Number(el.tagName[1]), text: (el.textContent || '').trim() }));
  const issues: string[] = [];
  const h1Count = headings.filter((h) => h.level === 1).length;
  if (h1Count === 0) issues.push('Missing H1');
  if (h1Count > 1) issues.push('Multiple H1 tags found');
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) issues.push(`Skipped from H${headings[i - 1].level} to H${headings[i].level}`);
  }
  return c.json({ url: normalized, headingCount: headings.length, headings, issues });
});

async function fetchHtml(url: string) { const r = await fetch(url, { headers: { accept: 'text/html,application/xhtml+xml' } }).catch(() => null); return r?.ok ? r.text() : null; }
function normalizeUrl(value: string): string | null { try { return new URL(value.startsWith('http') ? value : `https://${value}`).toString(); } catch { return null; } }
export default app;
