// Pre-push check for the generated site. Usage: node src/check.mjs
// Verifies every built page: one <h1>, title <= 65 chars, description 110-160 chars,
// unique titles, valid JSON-LD, local links/images resolve, images have alt text.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const problems = [];
const titles = {};

for (const f of files) {
  const s = fs.readFileSync(join(ROOT, f), 'utf8');
  const title = ((s.match(/<title>(.*?)<\/title>/) || [])[1] || '').replace(/&amp;/g, '&');
  const desc = (s.match(/name="description" content="(.*?)"/) || [])[1] || '';
  const h1 = (s.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${f}: ${h1} <h1> tags`);
  if (!title) problems.push(`${f}: missing <title>`);
  if (title.length > 65) problems.push(`${f}: title is ${title.length} chars`);
  if (f !== '404.html' && (desc.length < 110 || desc.length > 160)) problems.push(`${f}: description is ${desc.length} chars`);
  (titles[title] ??= []).push(f);
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { problems.push(`${f}: invalid JSON-LD`); }
  }
  for (const m of s.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    u = u.split('?')[0];
    if (u === './') u = 'index.html';
    if (!fs.existsSync(join(ROOT, u))) problems.push(`${f}: broken local link ${u}`);
  }
  for (const m of s.matchAll(/<img [^>]*>/g)) if (!/ alt="/.test(m[0])) problems.push(`${f}: <img> without alt`);
}
for (const [t, fs2] of Object.entries(titles)) if (fs2.length > 1) problems.push(`duplicate title "${t}": ${fs2.join(', ')}`);

console.log(problems.length ? problems.join('\n') : `ALL CHECKS PASSED (${files.length} pages)`);
process.exitCode = problems.length ? 1 : 0;
