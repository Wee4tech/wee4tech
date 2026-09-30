import { readFileSync } from 'node:fs';
import { SITE, ORG_ID, esc, abs, icon, faqHtml, ctaBand, pageHero, breadcrumbHtml } from './site.mjs';
import { SERVICES, COURSES, COURSE_FACTS, TESTIMONIALS, CLIENTS } from './content.mjs';
import { blogPages } from './blog.mjs';

const SYLLABUS = JSON.parse(readFileSync(new URL('./syllabus.json', import.meta.url), 'utf8'));
const svc = (slug) => SERVICES.find((s) => s.slug === slug);
const HOME = { name: 'Home', path: 'index.html' };

const serviceCard = (s) => `<article class="card card-link">
  <div class="icon-box">${icon(s.icon)}</div>
  <h3><a href="${s.slug}">${esc(s.name)}</a></h3>
  <p>${esc(s.card)}</p>
  <span class="more">Learn more ${icon('arrow')}</span>
</article>`;

const courseCard = (c, lazy = true) => `<article class="card course-card card-link">
  <img src="assets/img/optimized/${c.img}.webp" alt="" width="413" height="234"${lazy ? ' loading="lazy"' : ''} decoding="async">
  <div class="body">
    <p class="tag">${esc(c.category)}</p>
    <h3><a href="${c.slug}">${esc(c.name)}</a></h3>
    <p>${esc(c.summary.split('. ')[0])}.</p>
    <div class="meta"><span>${icon('calendar')} ${COURSE_FACTS.duration}</span><span>${icon('award')} Certificate</span></div>
  </div>
</article>`;

const quoteHtml = (t) => `<figure class="card quote">
  <blockquote><p>${esc(t.text)}</p></blockquote>
  <figcaption><span class="avatar" aria-hidden="true">${t.name[0]}</span><span><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></span></figcaption>
</figure>`;
const testimonialsHtml = () => `<div class="grid grid-3">${TESTIMONIALS.map(quoteHtml).join('')}</div>`;

const clientsHtml = () => `<div class="clients">${CLIENTS.map((c) => {
  const img = `<img src="${c.img}" alt="${esc(c.name)} logo" width="${c.w}" height="${c.h}" loading="lazy" decoding="async">`;
  return c.url ? `<a href="${c.url}" target="_blank" rel="noopener" title="${esc(c.name)}">${img}</a>` : `<a aria-disabled="true" title="${esc(c.name)}">${img}</a>`;
}).join('')}</div>`;

const PROCESS = [
  { t: 'Discover', d: 'We learn your goals, users and constraints, and agree on measurable outcomes.' },
  { t: 'Plan & design', d: 'Scope, milestones, architecture and clickable UX prototypes you can review.' },
  { t: 'Build', d: 'Short sprints with weekly demos, code reviews and automated tests.' },
  { t: 'Launch', d: 'Deployment, data migration, analytics and training for your team.' },
  { t: 'Support & grow', d: 'Monitoring, maintenance and continuous improvements after go-live.' },
];
const processHtml = () => `<ol class="steps">${PROCESS.map((p) => `<li><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>`;

// ---------------- Home ----------------
const HOME_FAQS = [
  { q: 'How much does custom software or an e-commerce website cost?', a: 'It depends on the features, number of users, integrations (payments, shipping, Tally, marketplaces) and whether you need a mobile app. Instead of a vague range, we send a written, itemised estimate within 24 hours of receiving your requirement, so you can decide what goes into the first release.' },
  { q: 'How long does it take to build an online store or a web application?', a: 'A Shopify or WooCommerce store usually takes 3–6 weeks. A custom web application or dealer portal typically takes 8–14 weeks, delivered in phases so your team starts using it early.' },
  { q: 'Do I own the source code?', a: 'Yes. The source code, designs, domain and cloud accounts belong to you. You can keep us for support or hand everything to another team at any time.' },
  { q: 'Can you take over software that another developer built?', a: 'Yes. We audit the code and hosting, document what we find, fix urgent issues first and then continue with regular <a href="software-maintenance-support.html">maintenance and support</a>.' },
  { q: 'Do you work with clients outside Chennai and outside India?', a: `Yes. We are based in Otteri, Chennai and work with clients across India and abroad over video calls, WhatsApp and shared project boards. Chennai clients can also meet us in person.` },
  { q: 'What happens after launch?', a: 'The same team that built your software stays on to support it: bug fixes, security updates, backups, monitoring and new features under a monthly plan. You are never left with software nobody understands.' },
];

const HOME_SERVICES = [
  { slug: 'custom-software-development.html', icon: 'code', name: 'Custom Software', text: 'Order, inventory, dealer and approval systems built around how your business runs, not how a SaaS tool wants you to work.' },
  { slug: 'ecommerce-development-company-chennai.html', icon: 'cart', name: 'E-commerce Development', text: 'Online stores that load fast, rank on Google and connect to your payments, shipping and inventory.' },
  { slug: 'web-development-company-chennai.html', icon: 'devices', name: 'Web Applications', text: 'Customer portals, dashboards and SaaS products in React, Next.js and .NET.' },
  { slug: 'mobile-app-development-chennai.html', icon: 'smartphone', name: 'Mobile Apps', text: 'Android and iOS apps for ordering, field staff and customers, from one Flutter codebase.' },
  { slug: 'hire-developers-chennai.html', icon: 'users', name: 'Dedicated Developers', text: 'Pre-vetted .NET, React and Python developers who join your team on a monthly contract.' },
];

const INDUSTRIES = [
  { icon: 'factory', t: 'Manufacturing', p: 'Orders on WhatsApp, stock in Excel, dispatch status by phone.' },
  { icon: 'truck', t: 'Distribution & wholesale', p: 'Dealers can’t see today’s prices or place orders online.' },
  { icon: 'store', t: 'Retail & D2C brands', p: 'Store is slow on mobile and doesn’t match shop-floor stock.' },
  { icon: 'building', t: 'Construction & interiors', p: 'Quotes built by hand, site progress shared as WhatsApp photos.' },
  { icon: 'briefcase', t: 'Logistics & services', p: 'Customers keep calling to ask for status updates.' },
  { icon: 'grad', t: 'Education & healthcare', p: 'Admissions, fees and appointments still run on paper.' },
];

const TECH_GROUPS = [
  { t: 'Web front end', icon: 'devices', d: 'Fast, SEO-friendly interfaces', items: [['React', 'react'], ['Next.js', 'nextdotjs'], ['Angular', 'angular'], ['TypeScript', 'typescript']] },
  { t: 'Backend & APIs', icon: 'code', d: 'Secure business logic and integrations', items: [['.NET', 'dotnet'], ['Node.js', 'nodedotjs'], ['Python', 'python'], ['Django', 'django']] },
  { t: 'Mobile apps', icon: 'smartphone', d: 'One codebase for Android and iOS', items: [['Flutter', 'flutter'], ['React Native', 'react'], ['Kotlin', 'kotlin'], ['Swift', 'swift']] },
  { t: 'E-commerce', icon: 'cart', d: 'Stores that sell and stay in sync', items: [['Shopify', 'shopify'], ['WooCommerce', 'woocommerce'], ['WordPress', 'wordpress'], ['Razorpay', 'razorpay']] },
  { t: 'Databases', icon: 'layers', d: 'Reliable, well-structured data', items: [['SQL Server', null, 'layers'], ['MySQL', 'mysql'], ['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb']] },
  { t: 'Cloud & AI', icon: 'cloud', d: 'Hosting, automation and AI', items: [['AWS', null, 'cloud'], ['Azure', null, 'cloud'], ['Docker', 'docker'], ['LLM APIs', null, 'brain']] },
];
const techLogo = ([name, slug, fallback]) => slug
  ? `<img src="https://cdn.simpleicons.org/${slug}/e3eeec" alt="" width="22" height="22" loading="lazy" decoding="async">`
  : icon(fallback);

const HOME_PROCESS = [
  { t: 'Requirement call', w: '30 min · free', d: 'Tell us the problem. A voice note, a spreadsheet or a one-line idea is enough to start.' },
  { t: 'Estimate & proposal', w: 'within 24 hours', d: 'Written scope, timeline and itemised price, with milestones you can hold us to.' },
  { t: 'Discovery sprint', w: '1–2 weeks', d: 'Detailed specs and a clickable prototype you review before development starts.' },
  { t: 'Build', w: 'weekly demos', d: 'Working software every week, so there are no surprises at the end.' },
  { t: 'Launch', w: 'go-live', d: 'Deployment, data migration and hands-on training for your team.' },
  { t: 'Support', w: 'monthly plan', d: 'Fixes, updates, monitoring and new features from the team that built it.' },
];

function home() {
  const wa = `${SITE.whatsapp}?text=${encodeURIComponent('Hi Wee4 Tech, I would like a project estimate.')}`;
  return {
    path: 'index.html',
    title: 'Custom Software & E-commerce Development in Chennai | Wee4 Tech',
    ogTitle: 'Wee4 Tech Solutions — Custom Software & E-commerce Development, Chennai',
    description: 'Chennai software company building custom business software, e-commerce stores, web apps and mobile apps for growing businesses. Estimate in 24 hours.',
    speakable: true,
    faqs: HOME_FAQS,
    waText: 'Hi Wee4 Tech, I would like a project estimate.',
    body: `
<section class="hero">
  <div class="container hero-grid">
    <div>
      <p class="eyebrow">Custom Software &amp; E-commerce Development Company in Chennai</p>
      <h1>Custom software &amp; e&#8209;commerce development for <em>growing businesses</em></h1>
      <p class="lead">We replace spreadsheets, WhatsApp orders and outdated systems with web apps, online stores and mobile apps your team actually uses — built in Chennai by one team that stays on to support it.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="contact.html">Get a project estimate in 24 hours ${icon('arrow')}</a>
        <a class="btn btn-ghost" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp us</a>
      </div>
      <p class="proof">Trusted by ${CLIENTS.map((c) => `<strong>${esc(c.name)}</strong>`).join(' · ')} · <a href="#clients">See our work</a></p>
    </div>
    <aside class="hero-card" aria-label="How we work">
      <h2>From idea to impact</h2>
      <ol>
        <li><span>01</span><span><strong>Consult</strong><small>Clarify goals, scope and the right technology</small></span></li>
        <li><span>02</span><span><strong>Develop</strong><small>Design and build in short, visible iterations</small></span></li>
        <li><span>03</span><span><strong>Maintain</strong><small>Keep it secure, fast and up to date</small></span></li>
        <li><span>04</span><span><strong>Grow</strong><small>SEO, marketing and new features that drive results</small></span></li>
      </ol>
    </aside>
  </div>
</section>

<section class="section-sm">
  <div class="container">
    <div class="answer">
      <h2>Who is Wee4 Tech Solutions?</h2>
      <p>Wee4 Tech Solutions is a custom software and e-commerce development company in Chennai, founded in ${SITE.founded}. We build web applications, online stores, mobile apps and AI automation for manufacturers, distributors, retailers and growing businesses in India and abroad — and we stay on to maintain what we build. We also provide dedicated developers on monthly contracts.</p>
    </div>
  </div>
</section>

<section class="section alt" id="services">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">What we build</p>
      <h2>Software that removes the manual work from your business</h2>
      <p>Five things we do well. Every project includes support after launch.</p>
    </div>
    <div class="grid svc-grid">${HOME_SERVICES.map((s, i) => `<article class="card card-link${i < 2 ? ' featured' : ''}">
      <div class="icon-box">${icon(s.icon)}</div>
      <h3><a href="${s.slug}">${esc(s.name)}</a></h3>
      <p>${esc(s.text)}</p>
      <span class="more">Learn more ${icon('arrow')}</span>
    </article>`).join('\n')}</div>
    <p class="also">Also: <a href="ai-development-company-chennai.html">AI automation &amp; cloud</a> · <a href="software-maintenance-support.html">Maintenance &amp; support</a> · <a href="it-consulting.html">IT consulting</a> · <a href="digital-marketing.html">SEO &amp; marketing for stores we build</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">Why Wee4 Tech</p>
      <h2>Four promises we put in writing</h2>
    </div>
    <div class="grid grid-4">
      <div class="card"><div class="icon-box">${icon('clock')}</div><h3>Estimate in 24 hours</h3><p>Send your requirement and get a written scope, timeline and price the next working day.</p></div>
      <div class="card"><div class="icon-box">${icon('target')}</div><h3>Fixed price, fixed milestones</h3><p>You pay per delivered milestone, not for hours you can’t see.</p></div>
      <div class="card"><div class="icon-box">${icon('shield')}</div><h3>You own everything</h3><p>Source code, designs, domain and cloud accounts are in your name from day one.</p></div>
      <div class="card"><div class="icon-box">${icon('wrench')}</div><h3>We stay after launch</h3><p>The team that built your software maintains it, on a simple monthly plan.</p></div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">Industries</p>
      <h2>Built for businesses that have outgrown Excel and WhatsApp</h2>
      <p>Does one of these sound familiar?</p>
    </div>
    <div class="grid grid-3">${INDUSTRIES.map((i) => `<div class="card industry"><div class="icon-box">${icon(i.icon)}</div><div><h3>${esc(i.t)}</h3><p>“${esc(i.p)}”</p></div></div>`).join('')}</div>
    <p class="text-center mt-lg"><a class="btn btn-brand" href="contact.html">Tell us what’s slowing you down ${icon('arrow')}</a></p>
  </div>
</section>

<section class="section" id="clients">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">Clients</p>
      <h2>Trusted by growing brands</h2>
    </div>
    ${clientsHtml()}
    <div class="mt-lg">${testimonialsHtml()}</div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">How we work</p>
      <h2>From first call to launch — no surprises</h2>
      <p>You know the price before we start and see working software every week.</p>
    </div>
    <ol class="steps six">${HOME_PROCESS.map((p) => `<li><h3>${esc(p.t)}</h3><p class="when">${esc(p.w)}</p><p>${esc(p.d)}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section dark tech-section">
  <div class="container">
    <div class="tech-head">
      <div>
        <p class="eyebrow" style="color:var(--amber)">Technology</p>
        <h2>Proven tools, chosen for your project</h2>
      </div>
      <p>We pick the stack that fits your team, budget and hosting — and that your next developer can maintain — not just the one we like best.</p>
    </div>
    <div class="tech-grid">${TECH_GROUPS.map((g) => `<div class="tech-card">
      <div class="tech-card-head"><span class="icon-box">${icon(g.icon)}</span><div><h3>${esc(g.t)}</h3><p>${esc(g.d)}</p></div></div>
      <ul>${g.items.map((i) => `<li>${techLogo(i)}<span>${esc(i[0])}</span></li>`).join('')}</ul>
    </div>`).join('')}</div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">FAQ</p>
      <h2>Questions buyers ask us</h2>
    </div>
    ${faqHtml(HOME_FAQS)}
  </div>
</section>

<section class="section-sm">
  <div class="container">
    <p class="academy-line">${icon('grad')} Looking for IT training instead? <a href="courses.html">Explore Wee4 Academy courses</a> in Python, Java, MERN, Data Science and Machine Learning.</p>
  </div>
</section>

${ctaBand({ title: 'Tell us what’s slowing your business down', text: 'Send a voice note, a spreadsheet or a one-line idea. You’ll get a scope, timeline and price range within 24 hours — no obligation.', primary: { label: 'Get my estimate', href: 'contact.html' } })}
`,
  };
}

// ---------------- Services hub ----------------
function servicesHub() {
  const crumbs = [HOME, { name: 'Services', path: 'services.html' }];
  const faqs = [
    { q: 'Which software services does Wee4 Tech offer?', a: 'Custom software development, website and web app development, mobile app development (Android and iOS), software maintenance and support, IT consulting, cloud and AI solutions, digital marketing and SEO, and IT staffing.' },
    { q: 'Can you handle both development and long-term maintenance?', a: 'Yes. Development plus ongoing maintenance is our most common engagement, and it gives you one accountable team for the full life of your software.' },
    { q: 'Which industries do you work with?', a: 'We have worked with e-commerce, retail, food and 3D visualisation businesses, and our processes apply to most industries including services, education, healthcare, logistics and manufacturing.' },
  ];
  return {
    path: 'services.html',
    title: 'Software Development & IT Services in Chennai | Wee4 Tech',
    description: 'Wee4 Tech services: custom software, mobile apps, websites, maintenance & support, IT consulting, cloud & AI, digital marketing and IT staffing.',
    crumbs, faqs,
    schema: {
      '@type': 'ItemList',
      name: 'Wee4 Tech Solutions services',
      itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(s.slug), name: s.name })),
    },
    body: `
${pageHero({ crumbs, eyebrow: 'Services', h1: 'Software development & IT services', lead: 'Everything you need to plan, build, run and grow digital products — delivered by one accountable team in Chennai.' })}
<section class="section">
  <div class="container">
    <div class="grid grid-3">${SERVICES.filter((sv) => sv.group !== 'hire').map(serviceCard).join('\n')}</div>
    <div class="section-head" style="margin-top:64px"><p class="eyebrow">Hire developers</p><h2>Add developers or a whole team</h2><p>Pre-vetted developers from Chennai on monthly contracts, for teams in India and abroad.</p></div>
    <div class="grid grid-4">${SERVICES.filter((sv) => sv.group === 'hire').map(serviceCard).join('\n')}</div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">Compare</p><h2>Which service do you need?</h2></div>
    <div class="table-wrap"><table>
      <thead><tr><th scope="col">If you want to…</th><th scope="col">Choose</th></tr></thead>
      <tbody>
        <tr><td>Build software tailored to your business process</td><td><a href="custom-software-development.html">Custom Software Development</a></td></tr>
        <tr><td>Sell online with a fast store or a B2B dealer portal</td><td><a href="ecommerce-development-company-chennai.html">E-commerce Development</a></td></tr>
        <tr><td>Launch a website, customer portal or web application</td><td><a href="web-development-company-chennai.html">Website & Web App Development</a></td></tr>
        <tr><td>Launch an Android or iOS app</td><td><a href="mobile-app-development-chennai.html">Mobile App Development</a></td></tr>
        <tr><td>Keep an existing application secure, fast and improving</td><td><a href="software-maintenance-support.html">Software Maintenance & Support</a></td></tr>
        <tr><td>Get expert advice before investing in technology</td><td><a href="it-consulting.html">IT Consulting & Services</a></td></tr>
        <tr><td>Automate work with AI or move to the cloud</td><td><a href="ai-development-company-chennai.html">AI & Cloud Solutions</a></td></tr>
        <tr><td>Get more leads from Google, AI search and social media</td><td><a href="digital-marketing.html">Digital Marketing & SEO</a></td></tr>
        <tr><td>Add skilled developers to your team quickly</td><td><a href="hire-developers-chennai.html">Hire Developers</a></td></tr>
        <tr><td>Build a long-term offshore team in India</td><td><a href="dedicated-development-team.html">Dedicated Development Team</a></td></tr>
        <tr><td>Build or modernise a .NET or React application</td><td><a href="dotnet-development-company-chennai.html">.NET Development</a> · <a href="react-development-company-chennai.html">React & Next.js</a></td></tr>
        <tr><td>Train yourself or your team in programming</td><td><a href="courses.html">IT Training & Courses</a></td></tr>
      </tbody>
    </table></div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">Process</p><h2>How every engagement runs</h2></div>
    ${processHtml()}
  </div>
</section>
<section class="section alt"><div class="container"><div class="section-head center"><h2>Services FAQ</h2></div>${faqHtml(faqs)}</div></section>
${ctaBand()}
`,
  };
}


// Extra sections for specific service pages
const ECOM_PLATFORMS = [
  ['Best for', 'Launching fast with little maintenance', 'Flexible stores on a budget, content-heavy brands', 'B2B pricing, complex catalogues, deep integrations'],
  ['Time to launch', 'Fastest', 'Fast', 'Longer (phased)'],
  ['Ongoing costs', 'Monthly Shopify plan + paid apps', 'Hosting + occasional premium plugins', 'Hosting + maintenance plan'],
  ['Customisation', 'Within Shopify’s limits', 'High, via plugins and custom code', 'Unlimited'],
  ['Dealer / B2B pricing', 'Limited without higher plans or apps', 'Possible with plugins', 'Built exactly to your rules'],
  ['Who manages it', 'You, with our support', 'You, with our maintenance', 'You, with our maintenance'],
];

const ECOM_INCLUDES = [
  'Mobile-first design tuned for fast product pages',
  'Razorpay, PayU, UPI and cash on delivery',
  'Shiprocket or courier integration with tracking',
  'GST-ready invoices',
  'WhatsApp / SMS order notifications',
  'Stock sync with your inventory or billing',
  'SEO basics: schema, sitemap, clean URLs, speed',
  'Google Analytics 4 and Meta Pixel set up',
  'Admin training and a short how-to guide',
  'Backups, SSL and security hardening',
];

const ECOM_PACKAGES = [
  { t: 'Launch', sub: 'Shopify or WooCommerce', items: ['Theme customised to your brand', 'Product and category setup', 'Payments, shipping and GST invoices', 'SEO and analytics basics'], best: 'New online brands and offline retailers going online' },
  { t: 'Growth', sub: 'Shopify, WooCommerce or headless', items: ['Custom design and features', 'Inventory / billing integration', 'WhatsApp alerts, reviews, offers', 'Speed optimisation and migration'], best: 'Stores that are slow or have outgrown their setup' },
  { t: 'Custom & B2B', sub: 'Custom build', items: ['Dealer-wise pricing and credit limits', 'Bulk and repeat ordering', 'ERP / Tally / marketplace integration', 'Web + mobile app on one backend'], best: 'Distributors, wholesalers and high-volume brands' },
];

function ecommerceExtra() {
  return `
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Choose a platform</p><h2>Shopify, WooCommerce or custom: which is right for you?</h2><p>We work with all three, so our advice follows your business, not our preferred tool.</p></div>
    <div class="table-wrap"><table>
      <thead><tr><th scope="col"></th><th scope="col">Shopify</th><th scope="col">WooCommerce</th><th scope="col">Custom / headless</th></tr></thead>
      <tbody>${ECOM_PLATFORMS.map((r) => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
  </div>
</section>
<section class="section alt">
  <div class="container split top">
    <div>
      <p class="eyebrow">Standard in our builds</p>
      <h2>What every store we build includes</h2>
      <p>The things that decide whether a store actually sells — set up before launch, not added later.</p>
    </div>
    <ul class="check-list cols">${ECOM_INCLUDES.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  </div>
</section>
<section class="section">
  <div class="container split top">
    <div>
      <p class="eyebrow">B2B e-commerce</p>
      <h2>Dealer ordering portals for distributors and wholesalers</h2>
      <p>If your dealers order by WhatsApp, phone or email, a consumer store isn’t the answer. A B2B portal shows each dealer their own prices and credit, lets them reorder in seconds, and sends orders straight to billing — no re-typing.</p>
      <ul class="check-list">
        <li>Dealer-specific price lists, discounts and credit limits</li>
        <li>Bulk order forms and one-tap reorder from history</li>
        <li>Order approval, dispatch status and invoices in one place</li>
        <li>Export to Tally or Zoho; optional Android app for your sales team</li>
      </ul>
      <a class="btn btn-brand" href="contact.html?interest=E-commerce%20Development">Get a B2B portal estimate ${icon('arrow')}</a>
    </div>
    <div class="card" style="background:var(--surface)">
      <h3>Signs you need a B2B portal</h3>
      <ul class="check-list mb-0">
        <li>Staff spend hours typing WhatsApp orders into Excel or Tally</li>
        <li>Dealers call to ask for prices or stock</li>
        <li>Price lists go out as PDFs and are soon out of date</li>
        <li>Nobody knows outstanding credit without checking the ledger</li>
      </ul>
    </div>
  </div>
</section>
<section class="section alt" id="packages">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">Packages</p><h2>E-commerce packages</h2><p>Every quote is fixed and itemised, and sent within 24 hours of your requirement.</p></div>
    <div class="grid grid-3">${ECOM_PACKAGES.map((k) => `<div class="card package"><h3>${esc(k.t)}</h3><p class="pkg-sub">${esc(k.sub)}</p><ul class="check-list">${k.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul><p class="pkg-best"><strong>Best for:</strong> ${esc(k.best)}</p><a class="btn btn-outline" href="contact.html?interest=E-commerce%20Development">Get a quote</a></div>`).join('')}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">Clients</p><h2>What store owners say</h2></div>
    ${clientsHtml()}
    <div class="grid grid-2 mt-lg">${TESTIMONIALS.filter((t) => /store|e-commerce/i.test(t.text)).map(quoteHtml).join('')}</div>
  </div>
</section>
<section class="section-sm alt">
  <div class="container split">
    <div><p class="eyebrow">After launch</p><h2 style="font-size:1.6rem">Grow sales once your store is live</h2><p class="mb-0">We handle SEO, Google Shopping and Meta ads for stores we build, and keep the store fast and secure with a monthly plan.</p></div>
    <div class="hero-actions" style="margin:0"><a class="btn btn-brand" href="digital-marketing.html">SEO &amp; marketing ${icon('arrow')}</a><a class="btn btn-outline" href="software-maintenance-support.html">Maintenance plans</a></div>
  </div>
</section>`;
}

function customExtra() {
  const rows = [
    ['Fits your process', 'You change how you work to fit the tool', 'Built around your exact workflow and approvals'],
    ['Cost over time', 'Per-user monthly fees that grow with your team', 'One-time build plus an optional maintenance plan'],
    ['Integrations', 'Limited to what the vendor supports', 'Connects to Tally, Zoho, payment gateways, your store and apps'],
    ['Ownership', 'Vendor owns the software and your data format', 'You own the code, data and hosting'],
    ['Changes', 'Wait for the vendor roadmap', 'Add features when your business needs them'],
    ['Best when', 'Your process is standard and small', 'Your process is your advantage, or tools no longer fit'],
  ];
  return `
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Build vs buy</p><h2>Custom software vs off-the-shelf tools</h2><p>Ready-made tools are the right answer for many businesses. Custom software wins when your process doesn’t fit them.</p></div>
    <div class="table-wrap"><table>
      <thead><tr><th scope="col"></th><th scope="col">Off-the-shelf / SaaS</th><th scope="col">Custom software</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody>
    </table></div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Industries</p><h2>Custom software for Chennai businesses that have outgrown Excel</h2></div>
    <div class="grid grid-3">${INDUSTRIES.map((i) => `<div class="card industry"><div class="icon-box">${icon(i.icon)}</div><div><h3>${esc(i.t)}</h3><p>“${esc(i.p)}”</p></div></div>`).join('')}</div>
  </div>
</section>
<section class="section">
  <div class="container split top">
    <div>
      <p class="eyebrow">Pricing</p>
      <h2>What decides the cost of custom software?</h2>
      <p>We send a written, itemised estimate within 24 hours — here is what drives it, so you can decide what goes into the first release.</p>
      <a class="btn btn-brand" href="contact.html?interest=Custom%20Software%20Development">Get my estimate ${icon('arrow')}</a>
    </div>
    <ul class="check-list">
      <li><strong>Number of modules and screens</strong> — orders, inventory, dealers, reports, approvals</li>
      <li><strong>User roles and permissions</strong> — owner, staff, dealers, customers</li>
      <li><strong>Integrations</strong> — Tally, Zoho, payment gateways, SMS/WhatsApp, e-commerce</li>
      <li><strong>Mobile app</strong> — whether field staff or customers need an Android/iOS app</li>
      <li><strong>Data migration</strong> — moving years of Excel or old-system data cleanly</li>
      <li><strong>Hosting and support</strong> — cloud hosting and a monthly maintenance plan</li>
    </ul>
  </div>
</section>`;
}

const HIRE_STEPS = [
  { t: 'Share your requirement', w: 'day 0', d: 'Role, skills, experience level, working hours and duration.' },
  { t: 'Get a shortlist', w: 'within 72 hours', d: 'Profiles of pre-vetted developers matched to your stack.' },
  { t: 'Interview & select', w: 'your call', d: 'Interview candidates and give them a task if you wish.' },
  { t: 'Developer starts', w: 'within a week', d: 'Onboarding into your tools, repositories and stand-ups.' },
  { t: 'Monthly review', w: 'ongoing', d: 'Regular check-ins, and a replacement if it isn’t the right fit.' },
];

function hireExtra() {
  const roles = [
    ['.NET developer', 'C#, ASP.NET Core, Web API, SQL Server, Azure'],
    ['React / Next.js developer', 'React, Next.js, TypeScript, REST/GraphQL'],
    ['Full-stack developer', 'React + Node.js or .NET, databases, deployment'],
    ['Python developer', 'Django / FastAPI, automation, data, AI integration'],
    ['Mobile developer', 'Flutter or React Native, store publishing'],
    ['QA / automation tester', 'Manual testing, Selenium / Playwright, API tests'],
  ];
  return `
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">How it works</p><h2>From requirement to a developer on your team in about a week</h2></div>
    <ol class="steps">${HIRE_STEPS.map((p) => `<li><h3>${esc(p.t)}</h3><p class="when">${esc(p.w)}</p><p>${esc(p.d)}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Roles</p><h2>Developers you can hire</h2><p>Junior, mid-level and senior profiles are available for each role. Monthly pricing is shared with your shortlist.</p></div>
    <div class="table-wrap"><table>
      <thead><tr><th scope="col">Role</th><th scope="col">Typical skills</th><th scope="col">Engagement</th></tr></thead>
      <tbody>${roles.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>Monthly contract · contract-to-hire</td></tr>`).join('')}</tbody>
    </table></div>
    <p class="mt-lg"><a class="btn btn-brand" href="contact.html?interest=Hire%20Developers">Request developer profiles ${icon('arrow')}</a></p>
  </div>
</section>
<section class="section">
  <div class="container split top">
    <div>
      <p class="eyebrow">Vetting</p>
      <h2>How we screen developers</h2>
      <p>Every developer is assessed by our own engineers before you see their profile.</p>
    </div>
    <ul class="check-list">
      <li>Technical interview with a senior engineer in the same stack</li>
      <li>Practical coding task based on real project work</li>
      <li>Code-quality review: readability, tests and version control habits</li>
      <li>Communication check for client calls and written updates</li>
      <li>Reference and background verification</li>
    </ul>
  </div>
</section>`;
}

function dedicatedExtra() {
  const zones = [
    ['United Kingdom / Europe', 'IST is 3.5–5.5 hours ahead', 'Your morning overlaps our afternoon — 3 to 5 shared hours'],
    ['UAE / Middle East', 'IST is 1.5–2.5 hours ahead', 'Almost the full working day overlaps'],
    ['USA / Canada', 'IST is 9.5–12.5 hours ahead', 'Agreed early-morning or late-evening overlap for stand-ups'],
    ['Australia / Singapore', 'IST is 2.5–5.5 hours behind', 'Your afternoon overlaps our morning'],
  ];
  return `
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Working together</p><h2>Time-zone overlap from Chennai (IST)</h2><p>We agree fixed overlap hours for stand-ups, reviews and questions before the team starts.</p></div>
    <div class="table-wrap"><table>
      <thead><tr><th scope="col">Your location</th><th scope="col">Time difference</th><th scope="col">Typical overlap</th></tr></thead>
      <tbody>${zones.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody>
    </table></div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Team models</p><h2>Start small, scale when it works</h2></div>
    <div class="grid grid-3">
      <div class="card"><div class="icon-box">${icon('users')}</div><h3>Single developer</h3><p>One dedicated developer joining your existing team. The quickest way to add capacity.</p></div>
      <div class="card"><div class="icon-box">${icon('layers')}</div><h3>Core team</h3><p>Two to four developers plus QA, working as a unit on one product or module.</p></div>
      <div class="card"><div class="icon-box">${icon('rocket')}</div><h3>Full squad</h3><p>Developers, QA, UI/UX and a project lead who run delivery end to end.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Onboarding</p><h2>How a dedicated team is set up</h2></div>
    <ol class="steps">${[
      { t: 'Planning call', w: 'week 1', d: 'Roles, skills, overlap hours, tools and budget.' },
      { t: 'Team proposal', w: 'within days', d: 'Team plan with monthly pricing per member.' },
      { t: 'Interviews', w: 'week 1–2', d: 'You interview and approve every member.' },
      { t: 'Onboarding', w: 'week 2–4', d: 'Access, tools, repositories and first sprint.' },
      { t: 'Weekly reporting', w: 'ongoing', d: 'Progress reports and monthly reviews.' },
    ].map((p) => `<li><h3>${esc(p.t)}</h3><p class="when">${esc(p.w)}</p><p>${esc(p.d)}</p></li>`).join('')}</ol>
  </div>
</section>`;
}

const SERVICE_EXTRAS = { ecommerce: ecommerceExtra, custom: customExtra, hire: hireExtra, dedicated: dedicatedExtra };

// ---------------- Service detail ----------------
function servicePage(s) {
  const crumbs = [HOME, { name: 'Services', path: 'services.html' }, { name: s.name, path: s.slug }];
  return {
    path: s.slug,
    title: s.title,
    description: s.description,
    crumbs, faqs: s.faqs, speakable: true,
    waText: s.waText || `Hi Wee4 Tech, I'm interested in ${s.name}.`,
    schema: {
      '@type': 'Service',
      '@id': `${abs(s.slug)}#service`,
      name: s.name,
      serviceType: s.serviceType,
      description: s.answer.a,
      url: abs(s.slug),
      provider: { '@id': ORG_ID },
      areaServed: [{ '@type': 'City', name: 'Chennai' }, { '@type': 'Country', name: 'India' }, 'Worldwide'],
      hasOfferCatalog: { '@type': 'OfferCatalog', name: s.name, itemListElement: s.included.map((i) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: i.t, description: i.d } })) },
    },
    body: `
${pageHero({ crumbs, eyebrow: s.name, h1: esc(s.h1), lead: esc(s.lead), cta: s.ctaLabel || 'Get a project estimate', ctaHref: `contact.html?interest=${encodeURIComponent(s.name)}` })}
<section class="section">
  <div class="container split top">
    <div>
      <div class="answer"><h2>${esc(s.answer.q)}</h2><p>${esc(s.answer.a)}</p></div>
      <div style="margin-top:32px">${s.intro.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
    </div>
    <aside class="card" style="background:var(--surface)">
      <h2 style="font-size:1.25rem">Who this is for</h2>
      <ul class="check-list">${s.forWho.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
      <h2 style="font-size:1.25rem;margin-top:24px">Why Wee4 Tech</h2>
      <ul class="check-list mb-0">${s.why.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
    </aside>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">What’s included</p><h2>${esc(s.name)} services we provide</h2></div>
    <div class="grid grid-3">${s.included.map((i) => `<div class="card"><div class="icon-box">${icon('check')}</div><h3>${esc(i.t)}</h3><p>${esc(i.d)}</p></div>`).join('')}</div>
  </div>
</section>
${s.extra ? SERVICE_EXTRAS[s.extra]() : ''}
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Process</p><h2>How we deliver</h2></div>
    ${processHtml()}
  </div>
</section>
<section class="section-sm alt">
  <div class="container">
    <h2 style="font-size:1.5rem">${s.slug === 'hire-developers-chennai.html' ? 'Roles we staff' : s.slug === 'digital-marketing.html' ? 'Tools we use' : 'Technologies we use'}</h2>
    <ul class="chips">${s.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">FAQ</p><h2>${esc(s.name)} — frequently asked questions</h2></div>
    ${faqHtml(s.faqs)}
  </div>
</section>
<section class="section-sm alt">
  <div class="container">
    <h2 style="font-size:1.5rem">Related services</h2>
    <div class="grid grid-3">${s.related.map((r) => serviceCard(svc(r))).join('')}</div>
  </div>
</section>
${ctaBand({ title: `Talk to us about ${s.name.toLowerCase()}`, text: 'Share your requirements and get a written scope, timeline and fixed price within 24 hours.', primary: { label: s.ctaLabel || 'Get a project estimate', href: `contact.html?interest=${encodeURIComponent(s.name)}` } })}
`,
  };
}

// ---------------- Courses hub ----------------
function coursesHub() {
  const crumbs = [HOME, { name: 'Wee4 Academy', path: 'courses.html' }];
  const faqs = [
    { q: 'Which IT courses does Wee4 Tech offer in Chennai?', a: 'C Programming, C++, Core Python, Advanced Python, Java, Full Stack Web Development (MERN), Data Science and Machine Learning.' },
    { q: 'How long are the courses and do I get a certificate?', a: `Each course runs for ${COURSE_FACTS.duration} with 1-hour sessions, and you receive a certificate on completion.` },
    { q: 'Do you provide corporate training?', a: 'Yes. We run customised training for company teams on programming, web development, data science and related topics. <a href="contact.html">Contact us</a> with your requirements.' },
    { q: 'Which course should a beginner choose?', a: 'For general programming, start with <a href="core-python-course.html">Core Python</a> or <a href="c-programming-course.html">C</a>. For web development careers, choose <a href="mern-stack-course.html">MERN</a>. For analytics and AI, start with <a href="data-science-course.html">Data Science</a>.' },
    { q: 'How do I enrol or check batch timings?', a: `Call ${SITE.phone} or send an enquiry through our <a href="contact.html">contact page</a>, and we will share upcoming batch dates and timings.` },
  ];
  const cats = [...new Set(COURSES.map((c) => c.category))];
  return {
    path: 'courses.html',
    title: 'IT Training Courses in Chennai: Python, Java, MERN | Wee4 Tech',
    description: 'Job-oriented IT training in Chennai: C, C++, Python, Java, MERN full stack, Data Science and Machine Learning courses with certificate. Enquire for batches.',
    crumbs, faqs,
    schema: {
      '@type': 'ItemList',
      name: 'IT training courses',
      itemListElement: COURSES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(c.slug), name: c.name })),
    },
    body: `
${pageHero({ crumbs, eyebrow: 'IT training in Chennai', h1: 'Wee4 Academy: career-focused IT training in Chennai', lead: 'Learn programming, full stack development, data science and machine learning from developers who build real software every day.', actions: false, extra: `<div class="hero-actions"><a class="btn btn-primary" href="contact.html?interest=Training">Enquire about batches ${icon('arrow')}</a><a class="btn btn-ghost" href="tel:${SITE.phoneHref}">${icon('phone')} ${SITE.phone}</a></div>` })}
<section class="section-sm">
  <div class="container">
    <div class="answer"><h2>What training does Wee4 Tech provide?</h2><p>Wee4 Tech Solutions offers ${COURSES.length} job-oriented IT courses in Chennai — C, C++, Core Python, Advanced Python, Java, Full Stack Web Development (MERN), Data Science and Machine Learning. Each course lasts ${COURSE_FACTS.duration}, is taught hands-on by working developers and includes a certificate.</p></div>
  </div>
</section>
${cats.map((cat) => `<section class="section-sm"><div class="container"><h2>${esc(cat)} courses</h2><div class="grid grid-3">${COURSES.filter((c) => c.category === cat).map((c) => courseCard(c)).join('')}</div></div></section>`).join('\n')}
<section class="section alt">
  <div class="container split">
    <div>
      <p class="eyebrow">Why learn with us</p>
      <h2>Training by a working software company</h2>
      <ul class="check-list">
        <li>Trainers who build and maintain real client projects</li>
        <li>Hands-on sessions and practical exercises in every module</li>
        <li>Interview preparation and career guidance</li>
        <li>Certificate on completion</li>
        <li>Corporate and customised batches available</li>
      </ul>
      <a class="btn btn-brand" href="contact.html?interest=Training">Talk to a counsellor ${icon('arrow')}</a>
    </div>
    <img class="rounded-img" src="assets/img/optimized/workshop.webp" alt="Students attending a hands-on IT training session" width="1200" height="680" loading="lazy" decoding="async">
  </div>
</section>
<section class="section"><div class="container"><div class="section-head center"><h2>Training FAQ</h2></div>${faqHtml(faqs)}</div></section>
${ctaBand({ title: 'Ready to start learning?', text: 'Tell us which course interests you and we will share the next batch dates and timings.', primary: { label: 'Enquire now', href: 'contact.html?interest=Training' } })}
`,
  };
}

// ---------------- Course detail ----------------
function coursePage(c) {
  const crumbs = [HOME, { name: 'Wee4 Academy', path: 'courses.html' }, { name: c.short, path: c.slug }];
  const modules = SYLLABUS[c.slug];
  const faqs = [
    ...c.faqs,
    { q: `What are the prerequisites for the ${c.name.replace(' Course', '')} course?`, a: c.prereq },
    { q: 'How do I join the next batch?', a: `Call ${SITE.phone} or send an enquiry via our <a href="contact.html?interest=Training">contact form</a>. We will share batch dates, timings and fees.` },
  ];
  const others = COURSES.filter((o) => o.slug !== c.slug && o.category === c.category).concat(COURSES.filter((o) => o.category !== c.category)).slice(0, 3);
  return {
    path: c.slug,
    title: c.title,
    description: c.description,
    crumbs, faqs, speakable: true,
    image: `/assets/img/optimized/${c.img}.webp`,
    schema: {
      '@type': 'Course',
      '@id': `${abs(c.slug)}#course`,
      name: c.name,
      description: c.summary,
      url: abs(c.slug),
      provider: { '@id': ORG_ID },
      inLanguage: 'en',
      educationalCredentialAwarded: 'Certificate of completion',
      timeRequired: 'P3M',
      coursePrerequisites: c.prereq,
      teaches: c.outcomes,
      syllabusSections: modules.map((m) => ({ '@type': 'Syllabus', name: m.title, description: m.topics.join(', ') })),
    },
    body: `
${pageHero({ crumbs, eyebrow: `${c.category} course · Chennai`, h1: `${esc(c.name)} in Chennai`, lead: esc(c.summary), actions: false, extra: `<div class="hero-actions"><a class="btn btn-primary" href="contact.html?interest=${encodeURIComponent(c.short)}">Enquire about this course ${icon('arrow')}</a><a class="btn btn-ghost" href="tel:${SITE.phoneHref}">${icon('phone')} ${SITE.phone}</a></div>` })}
<section class="section-sm">
  <div class="container">
    <dl class="facts">
      <div><dt>Duration</dt><dd>${COURSE_FACTS.duration}</dd></div>
      <div><dt>Sessions</dt><dd>${COURSE_FACTS.session}</dd></div>
      <div><dt>Certificate</dt><dd>${COURSE_FACTS.certificate}</dd></div>
      <div><dt>Modules</dt><dd>${modules.length} modules</dd></div>
    </dl>
  </div>
</section>
<section class="section-sm">
  <div class="container split top">
    <div>
      <h2>What you will learn</h2>
      <ul class="check-list">${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
    </div>
    <div>
      <h2>Who should join</h2>
      <ul class="check-list">${c.audience.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
      <p class="muted"><strong>Prerequisites:</strong> ${esc(c.prereq)}</p>
    </div>
  </div>
</section>
<section class="section alt" id="syllabus">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Syllabus</p><h2>${esc(c.name)} syllabus</h2><p>${modules.length} modules covering ${modules.map((m) => m.title).slice(0, 4).join(', ')} and more.</p></div>
    <div class="syllabus">${modules.map((m, i) => `<details${i === 0 ? ' open' : ''}><summary><span><span class="n">${String(i + 1).padStart(2, '0')}</span>${esc(m.title)}</span>${icon('chevron')}</summary><div><ul>${m.topics.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div></details>`).join('\n')}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">FAQ</p><h2>${esc(c.name)} — FAQ</h2></div>
    ${faqHtml(faqs)}
  </div>
</section>
<section class="section-sm alt">
  <div class="container">
    <h2 style="font-size:1.5rem">You may also like</h2>
    <div class="grid grid-3">${others.map((o) => courseCard(o)).join('')}</div>
  </div>
</section>
${ctaBand({ title: `Join the next ${c.short} batch`, text: 'Get batch dates, timings and fee details. We usually reply within one business day.', primary: { label: 'Enquire now', href: `contact.html?interest=${encodeURIComponent(c.short)}` } })}
`,
  };
}

// ---------------- About ----------------
function about() {
  const crumbs = [HOME, { name: 'About us', path: 'about.html' }];
  const faqs = [
    { q: 'When was Wee4 Tech Solutions founded?', a: `Wee4 Tech Solutions was established in ${SITE.founded} in Chennai, Tamil Nadu, India.` },
    { q: 'What makes Wee4 Tech different from other software companies?', a: 'We combine software delivery, long-term maintenance, digital marketing and IT training under one roof, so clients get one accountable partner and our trainers teach from real project experience.' },
  ];
  return {
    path: 'about.html',
    pageType: 'AboutPage',
    title: 'About Wee4 Tech Solutions | Software Company in Chennai Since 2023',
    description: 'Wee4 Tech Solutions is a Chennai software company, founded in 2023, delivering custom software, maintenance, IT consulting, digital marketing and IT training.',
    crumbs, faqs,
    body: `
${pageHero({ crumbs, eyebrow: `Est. ${SITE.founded} · Chennai`, h1: 'Driven by innovation, dedicated to your success', lead: 'We are a software development, IT consulting and training company helping businesses and individuals thrive with technology.' })}
<section class="section">
  <div class="container split">
    <div>
      <p class="eyebrow">Our story</p>
      <h2>Why we started Wee4 Tech</h2>
      <p>Wee4 Tech Solutions was founded in ${SITE.founded} in Chennai with a simple mission: to make great software accessible to businesses of every size, and to help people build rewarding careers in technology.</p>
      <p>Our team brings together seasoned professionals with extensive experience in the software industry. We stay ahead of the curve by embracing emerging technologies, and we adapt to evolving market needs so our solutions remain relevant and effective.</p>
      <p>Every engagement begins with a deep understanding of your objectives, challenges and audience. Your satisfaction is our priority — we work closely with you to deliver results that exceed expectations.</p>
    </div>
    <img class="rounded-img" src="assets/img/optimized/about.webp" alt="Wee4 Tech Solutions team in a planning meeting" width="1024" height="768" loading="lazy" decoding="async">
  </div>
</section>
<section class="section-sm">
  <div class="container">
    <dl class="facts">
      <div><dt>Founded</dt><dd>${SITE.founded}</dd></div>
      <div><dt>Headquarters</dt><dd>Chennai, India</dd></div>
      <div><dt>Service lines</dt><dd>${SERVICES.length} + Training</dd></div>
      <div><dt>Courses</dt><dd>${COURSES.length} programmes</dd></div>
    </dl>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">Our values</p><h2>What we stand for</h2></div>
    <div class="grid grid-4">
      <div class="card"><div class="icon-box">${icon('handshake')}</div><h3>Partnership</h3><p>We act as an extension of your team and measure success by your outcomes.</p></div>
      <div class="card"><div class="icon-box">${icon('zap')}</div><h3>Innovation</h3><p>We adopt proven emerging technologies — cloud, AI, modern frameworks — when they add real value.</p></div>
      <div class="card"><div class="icon-box">${icon('shield')}</div><h3>Quality & integrity</h3><p>Clean code, honest estimates, transparent communication and ownership of results.</p></div>
      <div class="card"><div class="icon-box">${icon('grad')}</div><h3>Continuous learning</h3><p>We train others and keep learning ourselves, so our skills stay current.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">What we do</p><h2>Services & training</h2></div>
    <div class="grid grid-3">${SERVICES.slice(0, 6).map(serviceCard).join('')}</div>
    <p class="text-center mt-lg"><a class="btn btn-outline" href="services.html">All services</a> <a class="btn btn-outline" href="courses.html">All courses</a></p>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">Clients</p><h2>Brands we have worked with</h2></div>
    ${clientsHtml()}
    <div class="mt-lg">${testimonialsHtml()}</div>
  </div>
</section>
<section class="section"><div class="container">${faqHtml(faqs)}</div></section>
${ctaBand()}
`,
  };
}

// ---------------- Career ----------------
function career() {
  const crumbs = [HOME, { name: 'Careers', path: 'career.html' }];
  const faqs = [
    { q: 'How do I apply for a job at Wee4 Tech Solutions?', a: `Fill in the application form on this page and upload your resume, or email it to ${SITE.hrEmail}. Our HR team will contact you if your profile matches a current or upcoming opening.` },
    { q: 'Which locations do you hire for?', a: 'We hire for Chennai and for client positions in Coimbatore, Bangalore, Hyderabad and Pune.' },
    { q: 'Do you hire freshers?', a: 'Yes, we consider freshers with strong fundamentals. Our training courses can also help you build job-ready skills.' },
  ];
  const f = (id, label, attrs = '', type = 'text', cls = '') => `<div class="${cls}"><label for="${id}">${label}</label><input type="${type}" id="${id}" name="${id}" ${attrs}></div>`;
  return {
    path: 'career.html',
    title: 'Careers at Wee4 Tech Solutions | IT Jobs in Chennai',
    description: 'Explore IT jobs at Wee4 Tech Solutions, Chennai. Apply for software developer, tester and IT roles in Chennai, Bangalore, Hyderabad, Coimbatore and Pune.',
    crumbs, faqs,
    head: '  <script src="https://www.google.com/recaptcha/api.js" async defer></script>',
    body: `
${pageHero({ crumbs, eyebrow: 'Careers', h1: 'Build your career with Wee4 Tech', lead: 'We are building a community of talented, driven people who are passionate about what they do. If you want to grow, be valued for your contributions and work in a culture of creativity and support — we want to hear from you.', actions: false, extra: `<div class="hero-actions"><a class="btn btn-primary" href="#apply">Apply now ${icon('arrow')}</a></div>` })}
<section class="section">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">Why join us</p><h2>Grow with a team that values you</h2></div>
    <div class="grid grid-3">
      <div class="card"><div class="icon-box">${icon('rocket')}</div><h3>Design-led digital transformation</h3><p>Work on products that combine business opportunity with real customer needs, from idea to launch.</p></div>
      <div class="card"><div class="icon-box">${icon('grad')}</div><h3>Continuous learning</h3><p>Access to our in-house training programmes and mentoring from experienced engineers.</p></div>
      <div class="card"><div class="icon-box">${icon('handshake')}</div><h3>We empower our people</h3><p>Ownership, collaboration and a shared vision to make a meaningful impact.</p></div>
    </div>
  </div>
</section>
<section class="section alt" id="apply">
  <div class="container split top">
    <div>
      <p class="eyebrow">Apply</p>
      <h2>Submit your application</h2>
      <p>Share your details and resume. Our HR team reviews every application and will contact you when there is a suitable opening.</p>
      <ul class="contact-list" style="margin-top:28px">
        <li><span class="icon-box">${icon('mail')}</span><span><strong>HR email</strong><a href="mailto:${SITE.hrEmail}">${SITE.hrEmail}</a></span></li>
        <li><span class="icon-box">${icon('phone')}</span><span><strong>Call</strong><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></span></li>
        <li><span class="icon-box">${icon('pin')}</span><span><strong>Office</strong>${SITE.address.street}, ${SITE.address.city} ${SITE.address.postal}</span></li>
      </ul>
    </div>
    <form id="career-form" class="form-card" novalidate>
      <div class="form-grid">
        ${f('name', 'Full name', 'required autocomplete="name"')}
        ${f('email', 'Email', 'required autocomplete="email"', 'email')}
        ${f('phone', 'Mobile number', 'required autocomplete="tel" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" title="10-digit mobile number"', 'tel')}
        ${f('Skills', 'Key skills', 'required placeholder="e.g. React, Node.js, SQL"')}
        ${f('CurrentLocation', 'Current location', 'required')}
        <div><label for="PreferredLocation">Preferred location</label><select id="PreferredLocation" name="PreferredLocation" required><option value="">Choose a location</option><option>Chennai</option><option>Coimbatore</option><option>Bangalore</option><option>Hyderabad</option><option>Pune</option></select></div>
        ${f('TotalExp', 'Total experience (years)', 'required inputmode="decimal" pattern="[0-9]+(\\.[0-9]+)?"')}
        ${f('RelevantExp', 'Relevant experience (years)', 'required inputmode="decimal" pattern="[0-9]+(\\.[0-9]+)?"')}
        ${f('CTC', 'Current CTC (per annum)', 'required inputmode="decimal" pattern="[0-9]+(\\.[0-9]+)?"')}
        ${f('ExpectedCTC', 'Expected CTC (per annum)', 'required inputmode="decimal" pattern="[0-9]+(\\.[0-9]+)?"')}
        <div><label for="CurrentCompany">Current company <span class="opt">(optional)</span></label><input type="text" id="CurrentCompany" name="CurrentCompany" autocomplete="organization"></div>
        <div><label for="Referredby">Referred by <span class="opt">(optional)</span></label><input type="text" id="Referredby" name="Referredby"></div>
        <div class="full"><label for="resume">Upload resume (PDF or Word)</label><input type="file" id="resume" name="resume" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"></div>
        <div class="full"><div class="g-recaptcha" data-sitekey="6LdvncMqAAAAADMWeGtXi0FiyMjtbFsyYVUEsvFD"></div></div>
      </div>
      <p class="form-note">By applying you agree to our <a href="privacy-policy.html">privacy policy</a>.</p>
      <div style="margin-top:20px"><button class="btn btn-brand" type="submit"><span class="spinner" aria-hidden="true"></span> Submit application</button></div>
      <div class="form-status" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>
<section class="section"><div class="container"><div class="section-head center"><h2>Careers FAQ</h2></div>${faqHtml(faqs)}</div></section>
`,
  };
}

// ---------------- Contact ----------------
function contact() {
  const crumbs = [HOME, { name: 'Contact', path: 'contact.html' }];
  // Short, plain-language choices. Aliases let service/course links pre-select the right one.
  const opts = [
    ['Custom business software', ['Custom Software Development', '.NET Development', 'IT Consulting & Services']],
    ['E-commerce store', ['E-commerce Development']],
    ['Website or web application', ['Website & Web App Development', 'React & Next.js Development']],
    ['Mobile app (Android / iOS)', ['Mobile App Development']],
    ['AI or automation', ['AI & Cloud Solutions']],
    ['Hire developers / dedicated team', ['Hire Developers', 'Dedicated Development Team']],
    ['Fix or maintain existing software', ['Software Maintenance & Support']],
    ['SEO & digital marketing', ['Digital Marketing & SEO']],
    ['IT training (Wee4 Academy)', ['Training', ...COURSES.map((c) => c.short)]],
    ['Something else', ['Other']],
  ];
  return {
    path: 'contact.html',
    pageType: 'ContactPage',
    title: 'Contact Wee4 Tech Solutions | Software Company in Chennai',
    description: `Get a custom software, e-commerce or app estimate in 24 hours from Wee4 Tech Solutions, Chennai. Call or WhatsApp ${SITE.phone} or send your requirement.`,
    crumbs,
    body: `
${pageHero({ crumbs, eyebrow: 'Contact', h1: 'Get a project estimate in 24 hours', lead: 'Tell us what you want to build, fix or automate. We reply with a written scope, timeline and price.', actions: false })}
<section class="section">
  <div class="container split top">
    <div>
      <h2>Get in touch</h2>
      <ul class="contact-list">
        <li><span class="icon-box">${icon('phone')}</span><span><strong>Call us</strong><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></span></li>
        <li><span class="icon-box">${icon('whatsapp')}</span><span><strong>WhatsApp</strong><a href="${SITE.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a></span></li>
        <li><span class="icon-box">${icon('mail')}</span><span><strong>Email</strong><a href="mailto:${SITE.email}">${SITE.email}</a><br><span class="muted">Careers: <a href="mailto:${SITE.hrEmail}">${SITE.hrEmail}</a></span></span></li>
        <li><span class="icon-box">${icon('pin')}</span><span><strong>Office</strong><address style="font-style:normal">${SITE.address.street},<br>${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}, India</address><a href="${SITE.mapLink}" target="_blank" rel="noopener">Get directions</a></span></li>
      </ul>
      <iframe class="map" title="Wee4 Tech Solutions office location on Google Maps" src="${SITE.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
    <form id="contact-form" class="form-card" novalidate>
      <h2 style="font-size:1.4rem">Send us a message</h2>
      <div class="form-grid">
        <div><label for="name">Name</label><input type="text" id="name" name="name" required maxlength="60" autocomplete="name"></div>
        <div><label for="email">Email</label><input type="email" id="email" name="email" required maxlength="100" autocomplete="email"></div>
        <div><label for="phone">Mobile number</label><input type="tel" id="phone" name="phone" required autocomplete="tel" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" title="10-digit mobile number"></div>
        <div><label for="interest">I’m interested in</label><select id="interest" name="interest" required><option value="">Choose one</option>${opts.map(([o, al]) => `<option data-aliases="${esc(al.join('|'))}">${esc(o)}</option>`).join('')}</select></div>
        <div class="full"><label for="subject">Subject <span class="opt">(optional)</span></label><input type="text" id="subject" name="subject" maxlength="100"></div>
        <div class="full"><label for="message">Message</label><textarea id="message" name="message" required minlength="10" maxlength="1000" placeholder="A few lines about your project, timeline or the course you want to join"></textarea></div>
      </div>
      <p class="form-note">We respect your privacy. See our <a href="privacy-policy.html">privacy policy</a>.</p>
      <div style="margin-top:20px"><button class="btn btn-brand" type="submit"><span class="spinner" aria-hidden="true"></span> Send message</button></div>
      <div class="form-status" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>
`,
    scripts: `<script>
(function(){var p=new URLSearchParams(location.search).get('interest');if(!p)return;var s=document.getElementById('interest');for(var i=1;i<s.options.length;i++){var o=s.options[i];if(o.text===p||(o.getAttribute('data-aliases')||'').split('|').indexOf(p)>-1){s.selectedIndex=i;if(o.text!==p){document.getElementById('message').value='Interested in: '+p+'\\n';}return;}}})();
</script>`,
  };
}

// ---------------- Legal ----------------
function legal(path, name, h1, description, html) {
  const crumbs = [HOME, { name, path }];
  return {
    path, title: `${name} | ${SITE.name}`, description, crumbs,
    body: `${pageHero({ crumbs, h1, actions: false })}
<section class="section"><div class="container narrow prose">${html}</div></section>`,
  };
}

const UPDATED = '30 September 2026';

function privacy() {
  return legal('privacy-policy.html', 'Privacy policy', 'Privacy policy', 'How Wee4 Tech Solutions collects, uses and protects personal information submitted through this website.', `
<p class="updated">Last updated: ${UPDATED}</p>
<p>This privacy policy explains how ${SITE.name} (“we”, “us”, “our”) collects, uses and protects personal information when you visit <a href="${SITE.url}/">${SITE.url.replace('https://', '')}</a> or contact us.</p>
<h2>Information we collect</h2>
<ul>
  <li><strong>Enquiry forms:</strong> name, email address, mobile number, area of interest and your message.</li>
  <li><strong>Career applications:</strong> name, contact details, skills, experience, current and expected salary, locations, referral details and the resume you upload.</li>
  <li><strong>Usage data:</strong> pages visited, device and browser type, approximate location and referral source, collected through Google Analytics cookies.</li>
</ul>
<h2>How we use your information</h2>
<ul>
  <li>To respond to your enquiry and provide proposals, course information or support.</li>
  <li>To evaluate job applications and contact candidates about suitable roles.</li>
  <li>To understand how visitors use our website so we can improve it.</li>
  <li>To meet legal and regulatory obligations.</li>
</ul>
<p>We do not sell your personal information.</p>
<h2>Cookies and analytics</h2>
<p>We use Google Analytics to measure website traffic. Google Analytics sets cookies that collect anonymised usage information. You can block or delete cookies in your browser settings, or install the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener" target="_blank">Google Analytics opt-out add-on</a>. The careers form uses Google reCAPTCHA to prevent spam, which is subject to Google’s privacy policy and terms.</p>
<h2>Sharing of information</h2>
<p>We share information only with service providers that help us operate our website and business (for example hosting, form processing and analytics), with clients when you have applied for a role and agreed to be put forward, or where required by law.</p>
<h2>Data retention and security</h2>
<p>We keep enquiry and application data only for as long as needed for the purposes above, and we use reasonable technical and organisational measures to protect it. No method of transmission over the internet is completely secure.</p>
<h2>Your rights</h2>
<p>Subject to applicable law, including India’s Digital Personal Data Protection Act, 2023, you may request access to, correction of, or deletion of your personal data, and you may withdraw consent at any time. Write to us at <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<h2>Third-party links</h2>
<p>Our website links to other sites, such as client websites and social networks. We are not responsible for their privacy practices.</p>
<h2>Changes to this policy</h2>
<p>We may update this policy from time to time. The “last updated” date above shows when it was last revised.</p>
<h2>Contact</h2>
<p>${SITE.name}, ${SITE.address.street}, ${SITE.address.city} ${SITE.address.postal}, Tamil Nadu, India. Email: <a href="mailto:${SITE.email}">${SITE.email}</a> · Phone: <a href="tel:${SITE.phoneHref}">${SITE.phone}</a></p>
`);
}

function terms() {
  return legal('terms-and-conditions.html', 'Terms & conditions', 'Terms & conditions', 'Terms and conditions governing the use of the Wee4 Tech Solutions website and services.', `
<p class="updated">Last updated: ${UPDATED}</p>
<p>Welcome to ${SITE.name} (“we”, “us”, “our”). These terms govern your use of our website and any software or services we provide. By using them you agree to these terms. If you do not agree, please do not use them.</p>
<h2>Acceptance of terms</h2>
<p>We may update these terms at any time. Continued use of our website, software or services after changes are published means you accept the revised terms. Specific projects and training programmes may also be governed by a separate written agreement, which takes precedence where it conflicts with these terms.</p>
<h2>Licence</h2>
<p>Where we provide software to you, we grant a non-exclusive, non-transferable, limited licence to use it in accordance with these terms and any applicable agreement. You may not sublicense, modify, distribute or reverse-engineer it without our written permission, except where ownership has been transferred to you under a project agreement.</p>
<h2>User obligations</h2>
<p>You agree to use our website, software and services lawfully and ethically. You must not:</p>
<ul>
  <li>use them for any unlawful or fraudulent activity;</li>
  <li>attempt to interfere with their proper working;</li>
  <li>circumvent any security measures or access restricted areas.</li>
</ul>
<h2>Intellectual property</h2>
<p>All content on this website — including text, graphics, logos and code — is owned by or licensed to ${SITE.name}. You may not use our trademarks or content without permission.</p>
<h2>Privacy</h2>
<p>Your use of our website and services is also governed by our <a href="privacy-policy.html">privacy policy</a>.</p>
<h2>Disclaimers</h2>
<p>The website and any software are provided “as is” without warranties of any kind, express or implied, unless agreed otherwise in writing. We do not guarantee uninterrupted or error-free operation.</p>
<h2>Limitation of liability</h2>
<p>To the fullest extent permitted by law, we are not liable for any indirect, incidental or consequential damages arising from your use of our website, software or services.</p>
<h2>Termination</h2>
<p>We may suspend or terminate access to our software or services if you violate these terms.</p>
<h2>Governing law</h2>
<p>These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.</p>
<h2>Contact us</h2>
<p>Questions about these terms? Email <a href="mailto:${SITE.email}">${SITE.email}</a> or call <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>.</p>
`);
}

function notFound() {
  return {
    path: '404.html', noindex: true,
    title: `Page not found | ${SITE.name}`,
    description: 'The page you are looking for could not be found.',
    body: `<section class="page-hero"><div class="container"><p class="eyebrow">Error 404</p><h1>We can’t find that page</h1><p class="lead">It may have moved during our website update. Try one of these instead:</p><div class="hero-actions"><a class="btn btn-primary" href="./">Home</a><a class="btn btn-ghost" href="services.html">Services</a><a class="btn btn-ghost" href="courses.html">Courses</a><a class="btn btn-ghost" href="contact.html">Contact</a></div></div></section>`,
  };
}

export function allPages() {
  return [home(), servicesHub(), ...SERVICES.map(servicePage), coursesHub(), ...COURSES.map(coursePage), about(), ...blogPages(), career(), contact(), privacy(), terms(), notFound()];
}

// Old URLs → new URLs (static redirect stubs)
export const REDIRECTS = {
  ...Object.fromEntries(COURSES.map((c) => [c.old, c.slug])),
  'service-details.html': 'hire-developers-chennai.html',
  'privacypolicy.html': 'privacy-policy.html',
  'termsandcondition.html': 'terms-and-conditions.html',
  'testimonials.html': 'about.html',
  'team.html': 'about.html',
  'portfolio.html': 'services.html',
  'portfolio-details.html': 'services.html',
  'pricing.html': 'contact.html',
  'blog-details.html': 'blog.html',
  'web-app-development.html': 'web-development-company-chennai.html',
  'mobile-app-development.html': 'mobile-app-development-chennai.html',
  'it-staffing.html': 'hire-developers-chennai.html',
  'cloud-ai-solutions.html': 'ai-development-company-chennai.html',
};
