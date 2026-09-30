// Blog: articles that answer buyer questions and lead to a service page.
import { SITE, ORG_ID, esc, abs, icon, faqHtml, ctaBand, pageHero } from './site.mjs';

const HOME = { name: 'Home', path: 'index.html' };
const BLOG = { name: 'Blog', path: 'blog.html' };

export const POSTS = [
  {
    slug: 'shopify-vs-woocommerce-vs-custom-ecommerce.html',
    title: 'Shopify vs WooCommerce vs Custom E-commerce in India (2026)',
    h1: 'Shopify vs WooCommerce vs custom e-commerce: which should an Indian business choose?',
    description: 'Shopify, WooCommerce or a custom store? A practical comparison for Indian retailers, D2C brands and distributors: costs, payments, GST, B2B pricing and growth.',
    excerpt: 'A practical comparison for Indian retailers, D2C brands and distributors — running costs, payments and GST, B2B pricing, and when each platform stops fitting.',
    date: '2026-09-30',
    minutes: 7,
    service: { slug: 'ecommerce-development-company-chennai.html', name: 'e-commerce development', cta: 'Get a store estimate in 24 hours' },
    summary: 'Choose Shopify to launch quickly with minimal maintenance, WooCommerce for flexibility and lower monthly fees if you are comfortable with WordPress, and a custom build when you need B2B dealer pricing, complex catalogues or deep integration with your own billing and inventory systems.',
    body: `
<h2>The short answer</h2>
<p>There is no single best platform. The right choice depends on four things: how fast you need to launch, how unusual your pricing and catalogue are, what other systems the store must talk to, and who will manage it after launch.</p>
<div class="table-wrap"><table>
  <thead><tr><th scope="col"></th><th scope="col">Shopify</th><th scope="col">WooCommerce</th><th scope="col">Custom</th></tr></thead>
  <tbody>
    <tr><th scope="row">Launch speed</th><td>Fastest</td><td>Fast</td><td>Slowest (phased)</td></tr>
    <tr><th scope="row">Monthly running cost</th><td>Plan fee + paid apps</td><td>Hosting + some premium plugins</td><td>Hosting + maintenance</td></tr>
    <tr><th scope="row">Flexibility</th><td>Within Shopify’s rules</td><td>High</td><td>Unlimited</td></tr>
    <tr><th scope="row">B2B / dealer pricing</th><td>Limited without higher plans or apps</td><td>Possible with plugins</td><td>Built to your exact rules</td></tr>
    <tr><th scope="row">Maintenance effort</th><td>Low (hosted for you)</td><td>Medium (updates, security)</td><td>Needs a support partner</td></tr>
    <tr><th scope="row">You own</th><td>Your data; platform is rented</td><td>Code and data</td><td>Code and data</td></tr>
  </tbody>
</table></div>

<h2>When Shopify is the right choice</h2>
<p>Shopify is a hosted platform: you pay a monthly plan, and Shopify takes care of servers, security and updates. It suits businesses that want to start selling quickly and do not want to think about technology.</p>
<ul>
  <li><strong>Good for:</strong> new D2C brands, fashion, lifestyle and gifting stores, and retailers with a few hundred products and standard pricing.</li>
  <li><strong>Indian setup:</strong> Razorpay, PayU, UPI and cash on delivery are all available, and Shiprocket and most couriers have Shopify apps.</li>
  <li><strong>Watch out for:</strong> app subscriptions add up. Many features — reviews, subscriptions, advanced filters, GST invoices — come from paid apps, so check the total monthly cost, not just the plan price.</li>
</ul>

<h2>When WooCommerce is the right choice</h2>
<p>WooCommerce is a free plugin that turns a WordPress website into a store. You host it yourself, which means lower fixed fees and more control — and more responsibility for updates, speed and security.</p>
<ul>
  <li><strong>Good for:</strong> businesses that already use WordPress, content-heavy brands that blog a lot, and stores that need custom features on a tighter budget.</li>
  <li><strong>Watch out for:</strong> slow hosting and too many plugins are the two most common reasons WooCommerce stores become slow. Choose good hosting and keep plugins to what you actually use.</li>
</ul>

<h2>When a custom e-commerce build makes sense</h2>
<p>A custom store is built for your business rules instead of fitting them into a platform’s settings. It costs more upfront, so it only makes sense when the platforms genuinely hold you back.</p>
<ul>
  <li><strong>B2B and dealer ordering:</strong> different prices per dealer, credit limits, minimum order quantities and bulk order forms. See <a href="dealer-ordering-system-for-distributors.html">how distributors take dealer orders online</a>.</li>
  <li><strong>Complex products:</strong> made-to-order items, measurements, configurable bundles or quotes instead of fixed prices.</li>
  <li><strong>Deep integration:</strong> live stock from your ERP or Tally, a mobile app sharing the same backend, or a marketplace-style multi-vendor setup.</li>
  <li><strong>Performance at scale:</strong> large catalogues and high traffic, often using a headless setup — a fast Next.js storefront on top of a commerce backend.</li>
</ul>

<h2>Things that matter on every platform</h2>
<ul>
  <li><strong>Mobile speed.</strong> Most Indian shoppers browse on phones, often on patchy networks. Compress images, limit apps and scripts, and test product pages on a real mid-range phone.</li>
  <li><strong>Checkout.</strong> Offer UPI and COD, keep the form short, and allow guest checkout.</li>
  <li><strong>GST invoices.</strong> Make sure invoices show GSTIN, HSN codes and the correct tax split for intra-state and inter-state orders.</li>
  <li><strong>Order notifications.</strong> WhatsApp and SMS updates reduce “where is my order?” calls.</li>
  <li><strong>SEO basics.</strong> Unique product descriptions, clean URLs, product schema and a sitemap — set up before launch.</li>
</ul>

<h2>A simple way to decide</h2>
<ol>
  <li>If you need to launch in weeks and your pricing is the same for every customer, start with <strong>Shopify</strong>.</li>
  <li>If you want lower monthly fees and more control, and have someone to maintain it, choose <strong>WooCommerce</strong>.</li>
  <li>If you sell to dealers, have complex products, or need the store to be part of your operations system, plan a <strong>custom build</strong> — possibly starting with Shopify or WooCommerce for retail and adding a custom B2B portal.</li>
</ol>
`,
    faqs: [
      { q: 'Is Shopify or WooCommerce cheaper in India?', a: 'WooCommerce usually has lower fixed monthly fees because the software is free and you pay only for hosting and any premium plugins. Shopify has a monthly plan fee plus paid apps, but saves you hosting and maintenance work. Compare the total monthly cost including apps, plugins and support.' },
      { q: 'Can I move from Shopify or WooCommerce to a custom store later?', a: 'Yes. Products, customers and order history can be migrated, and 301 redirects protect your Google rankings. Many businesses start on a platform and move to custom when their needs outgrow it.' },
      { q: 'Which platform is best for B2B or wholesale selling?', a: 'For simple wholesale pricing, platform apps or plugins can work. For dealer-specific price lists, credit limits and integration with billing, a custom B2B portal is usually the better long-term choice.' },
    ],
  },
  {
    slug: 'dealer-ordering-system-for-distributors.html',
    title: 'Dealer Ordering System for Distributors: Take Orders Online',
    h1: 'How distributors can take dealer orders online — and stop re-typing WhatsApp orders',
    description: 'Guide for Indian distributors: replace WhatsApp and phone orders with a dealer ordering portal and app, with dealer-wise pricing, credit limits and Tally export.',
    excerpt: 'Replace WhatsApp and phone orders with a dealer ordering portal: what it should include, how it connects to Tally, and how to roll it out without upsetting dealers.',
    date: '2026-09-30',
    minutes: 6,
    service: { slug: 'custom-software-development.html', name: 'custom software development', cta: 'Get a dealer portal estimate' },
    summary: 'A dealer ordering system lets each dealer log in on a phone or computer, see their own prices, stock and credit, place orders and reorder in a few taps, with orders flowing directly to billing and dispatch instead of being typed in from WhatsApp messages and phone calls.',
    body: `
<h2>The problem with WhatsApp and phone orders</h2>
<p>For many distributors in Chennai and across India, the ordering process looks like this: dealers send orders as WhatsApp messages, voice notes or phone calls; someone in the office types them into Excel; then someone types them again into Tally or the billing software. Price lists go out as PDFs and are out of date within weeks.</p>
<p>It works — until volume grows. Then the same problems appear everywhere:</p>
<ul>
  <li>Orders are missed or entered wrongly, especially at month-end.</li>
  <li>Dealers call to ask about prices, stock and outstanding balance.</li>
  <li>Sales staff spend their day on admin instead of selling.</li>
  <li>The owner cannot see today’s orders, pending dispatches or collections without asking someone.</li>
</ul>

<h2>What a dealer ordering system does</h2>
<p>A dealer ordering system (also called a B2B ordering portal) gives every dealer a login on the web and, optionally, an Android app. Instead of messaging, they place orders themselves — and the order goes straight to your team.</p>
<h3>Features that matter most</h3>
<ul>
  <li><strong>Dealer-specific pricing:</strong> each dealer sees their own price list, discounts and schemes.</li>
  <li><strong>Live stock visibility:</strong> dealers see what is available before ordering.</li>
  <li><strong>Quick reorder:</strong> repeat a previous order in a couple of taps — most B2B orders are repeats.</li>
  <li><strong>Credit limits and outstanding balance:</strong> dealers see what they owe; orders beyond the limit go for approval.</li>
  <li><strong>Order status:</strong> confirmed, packed, dispatched, delivered — no more “where is my order?” calls.</li>
  <li><strong>Sales rep mode:</strong> field staff can place orders on behalf of dealers from their phone.</li>
  <li><strong>Billing integration:</strong> export orders to Tally or Zoho, or sync automatically, so nobody re-types anything.</li>
  <li><strong>Owner dashboard:</strong> today’s orders, top dealers, pending dispatches and collections at a glance.</li>
</ul>

<h2>Off-the-shelf app or custom portal?</h2>
<p>Several ready-made B2B ordering apps exist and can be a good start for simple needs. A custom portal makes more sense when your pricing rules are complex (slabs, schemes, dealer categories), when you need tight integration with your existing billing, or when you want your own branded app for dealers.</p>

<h2>How to roll it out without upsetting dealers</h2>
<ol>
  <li><strong>Start with your top 10–20 dealers.</strong> Onboard them personally and fix issues quickly.</li>
  <li><strong>Keep WhatsApp as a backup at first.</strong> Accept both channels for a few weeks, then nudge dealers to the portal.</li>
  <li><strong>Make it faster than WhatsApp.</strong> Reorder, favourites and search must make ordering quicker than typing a message.</li>
  <li><strong>Give a reason to switch.</strong> Early access to schemes, live stock or faster dispatch for portal orders.</li>
  <li><strong>Measure it.</strong> Track the share of orders coming through the portal and the time your office saves.</li>
</ol>

<h2>What to prepare before talking to a developer</h2>
<ul>
  <li>Your product list with units, pack sizes and categories.</li>
  <li>How pricing works: dealer categories, discounts, schemes, GST.</li>
  <li>Your billing software and how orders get there today.</li>
  <li>How many dealers and sales staff will use it.</li>
  <li>A few real example orders, including the messy ones.</li>
</ul>
`,
    faqs: [
      { q: 'Can a dealer ordering system work with Tally?', a: 'Yes. Orders can be exported in a Tally-compatible format or synced through an integration, so orders do not need to be typed in manually.' },
      { q: 'Do dealers need to install an app?', a: 'Not necessarily. A mobile-friendly web portal works on any phone browser. An Android app is useful for frequent orderers and field sales staff.' },
      { q: 'How long does it take to build a dealer ordering portal?', a: 'A focused first version with dealer login, pricing, ordering, status and billing export typically takes 8–12 weeks, with more features added in later phases.' },
    ],
  },
  {
    slug: 'signs-your-business-has-outgrown-excel.html',
    title: '7 Signs Your Business Has Outgrown Excel (and What to Do Next)',
    h1: '7 signs your business has outgrown Excel — and what to do next',
    description: 'Still running orders, stock and approvals on Excel and WhatsApp? Seven warning signs for growing businesses, and how to choose SaaS tools or custom software.',
    excerpt: 'Seven warning signs that spreadsheets and WhatsApp are holding your business back, and how to choose between an off-the-shelf tool and custom software.',
    date: '2026-09-30',
    minutes: 5,
    service: { slug: 'custom-software-development.html', name: 'custom software development', cta: 'Get a project estimate' },
    summary: 'A business has outgrown Excel when several people edit the same data, numbers disagree between files, reports take hours to prepare, and customers or staff wait on information that should be instant. The next step is either a well-chosen off-the-shelf tool or custom software built around your process.',
    body: `
<p>Excel is one of the best tools ever made for a small business. It is flexible, everyone knows it, and it costs almost nothing. That is exactly why so many companies keep running on it long after it has stopped being the right tool. Here are the signs to look for.</p>

<h2>1. Nobody is sure which file is the latest</h2>
<p>“Orders_final_v3_updated.xlsx” on one laptop, a slightly different copy on WhatsApp, and another on email. When people argue about which number is right, the spreadsheet has become a risk.</p>

<h2>2. The same data is typed more than once</h2>
<p>An order arrives on WhatsApp, gets typed into Excel, then again into billing, then again into a dispatch sheet. Every re-type costs time and introduces errors.</p>

<h2>3. Reports take hours, and are out of date when they arrive</h2>
<p>If month-end reporting means a person spending a day copying, pasting and fixing formulas, you are paying for information that software could produce instantly.</p>

<h2>4. Only one person understands the sheet</h2>
<p>Complex macros and formulas built by one employee become a single point of failure. When they are on leave — or leave — the business slows down.</p>

<h2>5. You cannot control who sees or changes what</h2>
<p>Sales can see purchase prices, anyone can overwrite a formula, and there is no record of who changed a number. As the team grows, that becomes a real problem.</p>

<h2>6. Customers and dealers wait on answers you should have instantly</h2>
<p>“Is it in stock?”, “Where is my order?”, “What is my outstanding?” — if answering these means calling the office and checking a sheet, customers notice.</p>

<h2>7. The file itself is struggling</h2>
<p>Slow to open, crashes when two people use it, or has grown to tens of thousands of rows. That is Excel telling you it was not designed for this job.</p>

<h2>What to do next</h2>
<h3>Option 1: an off-the-shelf tool</h3>
<p>If your process is fairly standard — basic invoicing, a simple CRM, standard inventory — a ready-made SaaS tool can be the fastest and cheapest fix. Check that it supports Indian GST, works on mobile, and exports your data if you ever leave.</p>
<h3>Option 2: custom software</h3>
<p>If your process is specific — dealer pricing, production steps, approvals, project-based quoting — or you have already tried tools that did not fit, custom software built around your workflow is usually the better long-term answer. It can start small: one module that removes the biggest pain, then grow.</p>
<h3>How to start either way</h3>
<ol>
  <li>List the three tasks that waste the most time each week.</li>
  <li>Note every place the same data gets typed twice.</li>
  <li>Decide which numbers the owner needs to see daily without asking anyone.</li>
  <li>Use that list to evaluate tools — or to brief a developer.</li>
</ol>
`,
    faqs: [
      { q: 'Is custom software expensive for a small business?', a: 'It does not have to be. Starting with one module that removes the biggest manual task keeps the first investment small, and the time saved often pays for it. You then add modules as the business grows.' },
      { q: 'Can we keep using Excel alongside new software?', a: 'Yes. Good business software can import from and export to Excel, so reports and existing habits can continue during the transition.' },
    ],
  },
];

function articleHtml(p) {
  return `<article class="article">
  <p class="article-meta">${fmtDate(p.date)} · ${p.minutes} min read · ${SITE.name}</p>
  <div class="answer"><h2>In short</h2><p>${esc(p.summary)}</p></div>
  <div class="prose">${p.body}</div>
  <aside class="article-cta">
    <h2>Need help with this?</h2>
    <p>Wee4 Tech Solutions is a ${esc(p.service.name)} company in Chennai. Send us your requirement and get a written scope, timeline and price within 24 hours.</p>
    <a class="btn btn-brand" href="${p.service.slug}">${esc(p.service.cta)} ${icon('arrow')}</a>
  </aside>
  <h2 class="faq-title">Frequently asked questions</h2>
  ${faqHtml(p.faqs)}
</article>`;
}

function fmtDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function blogPages() {
  const index = {
    path: 'blog.html',
    pageType: 'CollectionPage',
    title: `Software, E-commerce & Automation Guides | Wee4 Tech Blog`,
    description: 'Practical guides for growing businesses on custom software, e-commerce, dealer ordering systems, automation and AI, from the Wee4 Tech team in Chennai.',
    crumbs: [HOME, BLOG],
    schema: {
      '@type': 'Blog',
      '@id': `${abs('blog.html')}#blog`,
      name: `${SITE.name} Blog`,
      publisher: { '@id': ORG_ID },
      blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.h1, url: abs(p.slug), datePublished: p.date })),
    },
    body: `
${pageHero({ crumbs: [HOME, BLOG], eyebrow: 'Blog', h1: 'Guides for growing businesses', lead: 'Practical, no-jargon answers on custom software, e-commerce, automation and AI — written by the people who build it.', actions: false })}
<section class="section">
  <div class="container">
    <div class="grid grid-3">${POSTS.map((p) => `<article class="card card-link post-card">
      <p class="article-meta">${fmtDate(p.date)} · ${p.minutes} min read</p>
      <h2><a href="${p.slug}">${esc(p.h1)}</a></h2>
      <p>${esc(p.excerpt)}</p>
      <span class="more">Read article ${icon('arrow')}</span>
    </article>`).join('')}</div>
  </div>
</section>
${ctaBand()}`,
  };

  const posts = POSTS.map((p) => {
    const crumbs = [HOME, BLOG, { name: p.h1, path: p.slug }];
    const others = POSTS.filter((o) => o.slug !== p.slug);
    return {
      path: p.slug,
      ogType: 'article',
      title: p.title,
      description: p.description,
      crumbs,
      faqs: p.faqs,
      speakable: true,
      waText: `Hi Wee4 Tech, I read your article "${p.h1}" and would like to discuss my requirement.`,
      schema: {
        '@type': 'BlogPosting',
        '@id': `${abs(p.slug)}#article`,
        headline: p.h1,
        description: p.description,
        datePublished: p.date,
        dateModified: p.date,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: abs(p.slug),
        image: `${SITE.url}${SITE.ogImage}`,
        inLanguage: 'en-IN',
      },
      body: `
${pageHero({ crumbs, eyebrow: 'Blog', h1: esc(p.h1), lead: esc(p.excerpt), actions: false })}
<section class="section">
  <div class="container narrow">${articleHtml(p)}</div>
</section>
<section class="section-sm alt">
  <div class="container">
    <h2 style="font-size:1.5rem">More guides</h2>
    <div class="grid grid-2">${others.map((o) => `<article class="card card-link post-card"><p class="article-meta">${o.minutes} min read</p><h3><a href="${o.slug}">${esc(o.h1)}</a></h3><p>${esc(o.excerpt)}</p></article>`).join('')}</div>
  </div>
</section>
${ctaBand({ title: 'Have a similar challenge?', text: 'Tell us what you are trying to fix. You will get a written scope, timeline and price within 24 hours.', primary: { label: p.service.cta, href: `contact.html` } })}`,
    };
  });
  return [index, ...posts];
}
