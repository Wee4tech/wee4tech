// Shared site config, icons and page layout.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Content hash appended to CSS/JS URLs so browsers fetch new versions after each deploy
// (line endings are normalised so the hash is the same on Windows and Linux checkouts)
const ver = (p) => createHash('md5').update(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n')).digest('hex').slice(0, 8);

export const SITE = {
  url: 'https://wee4techsolutions.com',
  name: 'Wee4 Tech Solutions',
  legalName: 'Wee4 Tech Solutions',
  tagline: 'Software development, IT consulting & training company in Chennai',
  founded: '2023',
  phone: '+91 95004 29423',
  phoneHref: '+919500429423',
  whatsapp: 'https://wa.me/919500429423',
  email: 'info@wee4techsolutions.com',
  hrEmail: 'hr@wee4techsolutions.com',
  address: {
    street: 'No. 21/15, Bashyam 1st Street, Otteri, Purasaiwakkam',
    city: 'Chennai',
    region: 'Tamil Nadu',
    postal: '600012',
    country: 'IN',
  },
  geo: { lat: 13.0972316, lng: 80.2496009 },
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0308466693355!2d80.24960097515468!3d13.097231612111276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265c237b36027%3A0x9645697b4bfad5d3!2s21%2C%20Bashyam%201st%20St%2C%20Otteri%2C%20Purasaiwakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600012!5e0!3m2!1sen!2sin!4v1740380633484!5m2!1sen!2sin',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=21%2F15+Bashyam+1st+Street+Otteri+Chennai+600012',
  social: {
    x: 'https://x.com/Wee4tech',
    facebook: 'https://www.facebook.com/61572509766761',
    instagram: 'https://www.instagram.com/wee4tech/',
  },
  // Other business profiles (used only in structured data so search engines connect them)
  profiles: [
    'https://www.indiamart.com/company/80611659/',
    'https://www.naukri.com/wee4-tech-solutions-jobs-careers-124602214',
    'https://cutshort.io/company/wee4-tech-solutions-41-wOaMkhO3',
  ],
  gaId: 'G-3681GW1G8P',
  ogImage: '/assets/img/og-image.jpg',
};

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = (path) => (path === 'index.html' ? `${SITE.url}/` : `${SITE.url}/${path}`);
export const href = (path) => (path === 'index.html' ? './' : path);

// Minimal line icons (24x24, stroke based)
const P = {
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  devices: '<rect x="2" y="4" width="14" height="11" rx="2"/><path d="M5 19h8"/><rect x="17" y="8" width="5" height="12" rx="1"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  grad: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  brain: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
  truck: '<path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
};
const FILLED = {
  xsocial: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
  facebook: '<path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/>',
  instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>',
  whatsapp: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41"/>',
};
export function icon(name, cls = '') {
  const c = cls ? ` class="${cls}"` : '';
  if (FILLED[name]) return `<svg${c} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${FILLED[name]}</svg>`;
  return `<svg${c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;
}

// ---------- Structured data ----------
export function orgSchema(services, courses) {
  return {
    '@type': ['ProfessionalService', 'Organization'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: ['Wee4 Tech', 'Wee4Tech', 'Wee4techsolutions'],
    url: `${SITE.url}/`,
    logo: { '@type': 'ImageObject', url: `${SITE.url}/assets/img/logo.png`, width: 480, height: 128 },
    image: `${SITE.url}${SITE.ogImage}`,
    description: 'Wee4 Tech Solutions is a Chennai-based software company offering custom software development, e-commerce development, web and mobile app development, software maintenance and support, IT consulting, digital marketing, IT staffing and job-oriented IT training.',
    foundingDate: SITE.founded,
    email: SITE.email,
    telephone: SITE.phoneHref,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapLink,
    areaServed: [{ '@type': 'City', name: 'Chennai' }, { '@type': 'Country', name: 'India' }, 'Worldwide'],
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', telephone: SITE.phoneHref, email: SITE.email, areaServed: 'Worldwide', availableLanguage: ['English', 'Tamil'] },
      { '@type': 'ContactPoint', contactType: 'human resources', email: SITE.hrEmail },
    ],
    sameAs: [...Object.values(SITE.social), ...SITE.profiles],
    knowsAbout: ['Custom software development', 'Web application development', 'Mobile app development', 'Android app development', 'iOS app development', 'Flutter', 'React Native', 'Software maintenance and support', 'IT consulting', 'Cloud computing', 'Artificial intelligence', 'Digital marketing', 'Search engine optimization', 'IT staffing', 'Python', 'Java', 'MERN stack', 'Data science', 'Machine learning'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software services and IT training',
      itemListElement: [
        ...services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(s.slug) } })),
        ...courses.map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Course', name: c.name, url: abs(c.slug) } })),
      ],
    },
  };
}

export function websiteSchema() {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE.url}/`, name: SITE.name, publisher: { '@id': ORG_ID }, inLanguage: 'en-IN' };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })),
  };
}

// ---------- Reusable blocks ----------
export function breadcrumbHtml(crumbs) {
  return `<nav aria-label="Breadcrumb"><ol class="breadcrumb">${crumbs
    .map((c, i) => (i === crumbs.length - 1 ? `<li><span aria-current="page">${esc(c.name)}</span></li>` : `<li><a href="${href(c.path)}">${esc(c.name)}</a></li>`))
    .join('')}</ol></nav>`;
}

export function faqHtml(faqs) {
  return `<div class="faq">${faqs
    .map((f) => `<details><summary><h3>${esc(f.q)}</h3>${icon('plus')}</summary><div class="a"><p>${f.a}</p></div></details>`)
    .join('\n')}</div>`;
}

export function ctaBand({ title = 'Have a project or training need in mind?', text = 'Tell us what you want to build or learn. We will reply within one business day with clear next steps — no obligation.', primary = { label: 'Get a project estimate', href: 'contact.html' } } = {}) {
  return `<section class="section-sm"><div class="container"><div class="cta-band">
  <div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
  <div class="actions"><a class="btn btn-primary" href="${primary.href}">${esc(primary.label)} ${icon('arrow')}</a><a class="btn btn-ghost" href="tel:${SITE.phoneHref}">${icon('phone')} Call ${SITE.phone}</a></div>
</div></div></section>`;
}

// ---------- Layout ----------
function header(active, services) {
  const is = (p) => (active === p ? ' aria-current="page"' : '');
  const svcActive = services.some((s) => s.slug === active) || active === 'services.html';
  return `<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="./" aria-label="${SITE.name} — home"><img src="assets/img/optimized/logo.webp" alt="${SITE.name}" width="168" height="45"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon('menu')}</button>
    <nav id="site-nav" class="nav" aria-label="Main">
      <ul>
        <li class="has-sub">
          <button class="nav-parent" type="button" aria-expanded="false"${svcActive ? ' style="color:var(--brand)"' : ''}>Services ${icon('chevron')}</button>
          <ul class="submenu">
            <li><a href="services.html"${is('services.html')}>All services<small>Overview of what we do</small></a></li>
            ${services.filter((s) => s.group !== 'hire').map((s) => `<li><a href="${s.slug}"${is(s.slug)}>${esc(s.name)}<small>${esc(s.menu)}</small></a></li>`).join('\n            ')}
            <li class="sub-label">Hire developers</li>
            ${services.filter((s) => s.group === 'hire').map((s) => `<li><a href="${s.slug}"${is(s.slug)}>${esc(s.name)}<small>${esc(s.menu)}</small></a></li>`).join('\n            ')}
          </ul>
        </li>
        <li><a href="courses.html"${is('courses.html')}>Academy</a></li>
        <li><a href="about.html"${is('about.html')}>About</a></li>
        <li><a href="blog.html"${is('blog.html')}>Blog</a></li>
        <li><a href="career.html"${is('career.html')}>Careers</a></li>
        <li class="nav-cta"><a href="contact.html"${is('contact.html')}>Contact us</a></li>
      </ul>
    </nav>
  </div>
</header>`;
}

function footer(services, courses) {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="footer-logo" href="./"><img src="assets/img/optimized/logo.webp" alt="${SITE.name}" width="150" height="40" loading="lazy"></a>
        <p>${SITE.name} is a custom software and e-commerce development company in Chennai, founded in ${SITE.founded}. We also run Wee4 Academy for IT training.</p>
        <address>${SITE.address.street},<br>${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}, India</address>
        <p class="mt-0"><a href="tel:${SITE.phoneHref}">${SITE.phone}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
        <div class="social">
          <a href="${SITE.social.x}" target="_blank" rel="noopener" aria-label="Wee4 Tech on X">${icon('xsocial')}</a>
          <a href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="Wee4 Tech on Facebook">${icon('facebook')}</a>
          <a href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Wee4 Tech on Instagram">${icon('instagram')}</a>
          <a href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="Chat with Wee4 Tech on WhatsApp">${icon('whatsapp')}</a>
        </div>
      </div>
      <div>
        <h2>Services</h2>
        <ul>${services.filter((s) => s.group !== 'hire').map((s) => `<li><a href="${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2>Hire developers</h2>
        <ul>${services.filter((s) => s.group === 'hire').map((s) => `<li><a href="${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul>
        <h2 style="margin-top:28px">Wee4 Academy</h2>
        <ul>${courses.map((c) => `<li><a href="${c.slug}">${esc(c.short)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2>Company</h2>
        <ul>
          <li><a href="about.html">About us</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="career.html">Careers</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="services.html">All services</a></li>
          <li><a href="courses.html">All courses</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="mb-0">© <span data-year>${new Date().getFullYear()}</span> ${SITE.name}. All rights reserved.</p>
      <ul><li><a href="privacy-policy.html">Privacy policy</a></li><li><a href="terms-and-conditions.html">Terms &amp; conditions</a></li></ul>
    </div>
  </div>
</footer>`;
}

export function layout(page, { services, courses }) {
  const url = abs(page.path);
  const graph = [orgSchema(services, courses), websiteSchema(), {
    '@type': page.pageType || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-IN',
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE.url}${page.image || SITE.ogImage}` },
    dateModified: page.modified,
    ...(page.speakable ? { speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.answer'] } } : {}),
  }];
  if (page.crumbs) graph.push(breadcrumbSchema(page.crumbs));
  if (page.faqs && page.faqs.length) graph.push(faqSchema(page.faqs));
  if (page.schema) graph.push(...[].concat(page.schema));

  const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${url}">
  <meta name="author" content="${SITE.name}">
  <meta name="theme-color" content="#122120">
  <meta name="geo.region" content="IN-TN">
  <meta name="geo.placename" content="Chennai">
  <meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}">
  <meta name="ICBM" content="${SITE.geo.lat}, ${SITE.geo.lng}">

  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:locale" content="en_IN">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE.url}${SITE.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${SITE.name} logo">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@Wee4tech">
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${SITE.url}${SITE.ogImage}">

  <link rel="icon" href="assets/img/favicon.ico" sizes="48x48">
  <link rel="icon" href="assets/img/icon-192.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="alternate" type="text/plain" href="llms.txt" title="LLM-readable site summary">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css?v=${ver('assets/css/style.css')}">
${page.preload ? `  <link rel="preload" as="image" href="${page.preload}">\n` : ''}
  <script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1)}
  </script>

  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.gaId}');</script>
${page.head || ''}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header(page.path, services)}
<main id="main">
${page.body}
</main>
${footer(services, courses)}
<a class="wa-float" href="${SITE.whatsapp}?text=${encodeURIComponent(page.waText || 'Hi Wee4 Tech, I would like to know more about your services.')}" target="_blank" rel="noopener" aria-label="Chat with Wee4 Tech on WhatsApp" data-wa>${icon('whatsapp')}<span class="wa-label">Chat with us</span></a>
<script src="assets/js/site.js?v=${ver('assets/js/site.js')}" defer></script>
${page.scripts || ''}
</body>
</html>
`;
}

export function pageHero({ crumbs, eyebrow, h1, lead, actions = true, extra = '', cta = 'Get a project estimate', ctaHref = 'contact.html' }) {
  return `<section class="page-hero">
  <div class="container">
    ${crumbs ? breadcrumbHtml(crumbs) : ''}
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${actions ? `<div class="hero-actions"><a class="btn btn-primary" href="${ctaHref}">${esc(cta)} ${icon('arrow')}</a><a class="btn btn-ghost" href="tel:${SITE.phoneHref}">${icon('phone')} ${SITE.phone}</a></div>` : ''}
    ${extra}
  </div>
</section>`;
}
