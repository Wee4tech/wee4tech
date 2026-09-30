import { readFileSync } from 'node:fs';
import { SITE, ORG_ID, esc, abs, icon, faqHtml, ctaBand, pageHero, breadcrumbHtml } from './site.mjs';
import { SERVICES, COURSES, COURSE_FACTS, TESTIMONIALS, CLIENTS } from './content.mjs';

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

const testimonialsHtml = () => `<div class="grid grid-3">${TESTIMONIALS.map((t) => `<figure class="card quote">
  <blockquote><p>${esc(t.text)}</p></blockquote>
  <figcaption><span class="avatar" aria-hidden="true">${t.name[0]}</span><span><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></span></figcaption>
</figure>`).join('')}</div>`;

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
  { q: 'What does Wee4 Tech Solutions do?', a: 'Wee4 Tech Solutions is a software company in Chennai, India. We build custom software, websites and Android/iOS mobile apps; maintain and support existing applications; provide IT consulting, cloud and AI solutions, digital marketing and IT staffing; and run job-oriented IT training courses.' },
  { q: 'Where is Wee4 Tech Solutions located?', a: `Our office is at ${SITE.address.street}, ${SITE.address.city} ${SITE.address.postal}, Tamil Nadu, India. We work with clients across India and internationally.` },
  { q: 'Do you offer both software development and ongoing maintenance?', a: 'Yes. Most clients engage us to build a product and then continue with a monthly <a href="software-maintenance-support.html">maintenance and support plan</a>, so the same team that built the software keeps it secure and improving.' },
  { q: 'What IT training courses do you offer?', a: 'We offer C, C++, Core Python, Advanced Python, Java, Full Stack Web Development (MERN), Data Science and Machine Learning. Each course runs for 3 months with a certificate. See <a href="courses.html">all courses</a>.' },
  { q: 'How do I start a project with Wee4 Tech?', a: `Call ${SITE.phone}, email ${SITE.email} or use our <a href="contact.html">contact form</a>. We will schedule a free consultation to understand your requirements and share a proposal with scope, timeline and cost.` },
];

function home() {
  const featured = SERVICES;
  return {
    path: 'index.html',
    title: 'Software Development & IT Training Company in Chennai | Wee4 Tech',
    ogTitle: 'Wee4 Tech Solutions — Software Development, IT Consulting & Training',
    description: 'Chennai software company for custom software development, maintenance & support, IT consulting, cloud & AI, digital marketing, IT staffing and IT training.',
    speakable: true,
    faqs: HOME_FAQS,
    body: `
<section class="hero">
  <div class="container hero-grid">
    <div>
      <p class="eyebrow">Software company in Chennai, India</p>
      <h1>We build, run and grow <em>your software</em>.</h1>
      <p class="lead">Wee4 Tech Solutions delivers custom software and mobile app development, long-term maintenance, IT consulting, digital marketing and industry-ready IT training — one partner from the first idea to the thousandth user.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="contact.html">Get a free consultation ${icon('arrow')}</a>
        <a class="btn btn-ghost" href="services.html">Explore services</a>
      </div>
      <ul class="hero-points">
        <li>${icon('checkCircle')} You own the code</li>
        <li>${icon('checkCircle')} Weekly progress demos</li>
        <li>${icon('checkCircle')} Support after launch</li>
      </ul>
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
      <p>Wee4 Tech Solutions is a software development and IT services company founded in ${SITE.founded} and based in Chennai, Tamil Nadu. We help startups, SMEs and enterprises with custom software, web and mobile app development (Android and iOS), software maintenance and support, IT consulting, cloud and AI, digital marketing and IT staffing — and we train the next generation of developers through career-focused courses.</p>
    </div>
  </div>
</section>

<section class="section alt" id="services">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">What we do</p>
      <h2>Software & IT services for every stage of growth</h2>
      <p>Build something new, keep what you have running smoothly, or get expert advice before you invest.</p>
    </div>
    <div class="grid grid-3">${featured.map(serviceCard).join('\n')}
      <article class="card card-link" style="background:var(--ink);border-color:var(--ink)">
        <div class="icon-box" style="background:rgba(253,190,38,.14);color:var(--amber)">${icon('grad')}</div>
        <h3 style="color:#fff"><a href="courses.html">IT Training & Courses</a></h3>
        <p style="color:#a9bdba">Job-oriented courses in Python, Java, MERN, Data Science and Machine Learning, taught by working developers.</p>
        <span class="more" style="color:var(--amber)">View courses ${icon('arrow')}</span>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <p class="eyebrow">Development + maintenance</p>
      <h2>One team that builds it — and stays to look after it</h2>
      <p>Many businesses get stuck when the agency that built their software moves on. We work differently: the engineers who design and build your product continue to maintain, secure and improve it after launch.</p>
      <ul class="check-list">
        <li><strong>Build:</strong> custom software, web apps and mobile apps designed around your process.</li>
        <li><strong>Run:</strong> monitoring, security updates, backups and fast bug fixes.</li>
        <li><strong>Improve:</strong> a monthly hours bank for new features, reports and UX refinements.</li>
        <li><strong>Grow:</strong> SEO and digital marketing that brings the right users to what we built.</li>
      </ul>
      <a class="btn btn-brand" href="software-maintenance-support.html">See maintenance plans ${icon('arrow')}</a>
    </div>
    <img class="rounded-img" src="assets/img/optimized/team.webp" alt="Wee4 Tech team collaborating on a software project" width="1200" height="680" loading="lazy" decoding="async">
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">How we work</p>
      <h2>A clear, predictable delivery process</h2>
      <p>No black boxes. You see working software every week and always know what is next.</p>
    </div>
    ${processHtml()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">Engagement models</p>
      <h2>Work with us the way that suits you</h2>
    </div>
    <div class="grid grid-4">
      <div class="card"><div class="icon-box">${icon('target')}</div><h3>Fixed-scope project</h3><p>Agreed features, timeline and price. Ideal for MVPs and well-defined builds.</p></div>
      <div class="card"><div class="icon-box">${icon('users')}</div><h3>Dedicated team</h3><p>A full-time team that works as an extension of yours, month to month.</p></div>
      <div class="card"><div class="icon-box">${icon('shield')}</div><h3>Maintenance retainer</h3><p>Monthly support, updates and enhancements for live applications.</p></div>
      <div class="card"><div class="icon-box">${icon('briefcase')}</div><h3>Staff augmentation</h3><p>Pre-screened developers who join your team on contract or contract-to-hire.</p></div>
    </div>
  </div>
</section>

<section class="section dark">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow" style="color:var(--amber)">IT training in Chennai</p>
      <h2>Build your career with industry-focused courses</h2>
      <p>Learn from developers who ship real software. Every course includes hands-on practice and a certificate.</p>
    </div>
    <div class="grid grid-4">${COURSES.slice(0, 8).map((c) => `<a class="card card-link" href="${c.slug}" style="text-decoration:none"><p class="eyebrow" style="color:var(--amber);margin-bottom:6px">${esc(c.category)}</p><h3>${esc(c.short)}</h3><p>${COURSE_FACTS.duration} · Certificate</p></a>`).join('')}</div>
    <p class="text-center mt-lg"><a class="btn btn-primary" href="courses.html">View all courses ${icon('arrow')}</a></p>
  </div>
</section>

<section class="section">
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
      <p class="eyebrow">FAQ</p>
      <h2>Frequently asked questions</h2>
    </div>
    ${faqHtml(HOME_FAQS)}
  </div>
</section>

${ctaBand()}
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
    <div class="grid grid-3">${SERVICES.map(serviceCard).join('\n')}</div>
  </div>
</section>
<section class="section alt">
  <div class="container">
    <div class="section-head center"><p class="eyebrow">Compare</p><h2>Which service do you need?</h2></div>
    <div class="table-wrap"><table>
      <thead><tr><th scope="col">If you want to…</th><th scope="col">Choose</th></tr></thead>
      <tbody>
        <tr><td>Build software tailored to your business process</td><td><a href="custom-software-development.html">Custom Software Development</a></td></tr>
        <tr><td>Launch a website, online store or web portal</td><td><a href="web-app-development.html">Website & Web App Development</a></td></tr>
        <tr><td>Launch an Android or iOS app</td><td><a href="mobile-app-development.html">Mobile App Development</a></td></tr>
        <tr><td>Keep an existing application secure, fast and improving</td><td><a href="software-maintenance-support.html">Software Maintenance & Support</a></td></tr>
        <tr><td>Get expert advice before investing in technology</td><td><a href="it-consulting.html">IT Consulting & Services</a></td></tr>
        <tr><td>Move to the cloud or automate work with AI</td><td><a href="cloud-ai-solutions.html">Cloud & AI Solutions</a></td></tr>
        <tr><td>Get more leads from Google, AI search and social media</td><td><a href="digital-marketing.html">Digital Marketing & SEO</a></td></tr>
        <tr><td>Add skilled developers to your team quickly</td><td><a href="it-staffing.html">IT Staffing & Resourcing</a></td></tr>
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

// ---------------- Service detail ----------------
function servicePage(s) {
  const crumbs = [HOME, { name: 'Services', path: 'services.html' }, { name: s.name, path: s.slug }];
  return {
    path: s.slug,
    title: s.title,
    description: s.description,
    crumbs, faqs: s.faqs, speakable: true,
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
${pageHero({ crumbs, eyebrow: s.name, h1: esc(s.h1), lead: esc(s.lead) })}
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
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Process</p><h2>How we deliver</h2></div>
    ${processHtml()}
  </div>
</section>
<section class="section-sm alt">
  <div class="container">
    <h2 style="font-size:1.5rem">${s.slug === 'it-staffing.html' ? 'Roles we staff' : s.slug === 'digital-marketing.html' ? 'Tools we use' : 'Technologies we use'}</h2>
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
${ctaBand({ title: `Talk to us about ${s.name.toLowerCase()}`, text: 'Share your requirements and get a free consultation with a clear plan, timeline and estimate.' })}
`,
  };
}

// ---------------- Courses hub ----------------
function coursesHub() {
  const crumbs = [HOME, { name: 'Training & Courses', path: 'courses.html' }];
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
${pageHero({ crumbs, eyebrow: 'IT training in Chennai', h1: 'Career-focused IT training & courses', lead: 'Learn programming, full stack development, data science and machine learning from developers who build real software every day.', actions: false, extra: `<div class="hero-actions"><a class="btn btn-primary" href="contact.html?interest=Training">Enquire about batches ${icon('arrow')}</a><a class="btn btn-ghost" href="tel:${SITE.phoneHref}">${icon('phone')} ${SITE.phone}</a></div>` })}
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
  const crumbs = [HOME, { name: 'Training & Courses', path: 'courses.html' }, { name: c.short, path: c.slug }];
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
  const opts = ['Custom Software Development', 'Website & Web App Development', 'Mobile App Development', 'Software Maintenance & Support', 'IT Consulting', 'Cloud & AI Solutions', 'Digital Marketing & SEO', 'IT Staffing', 'Training', ...COURSES.map((c) => c.short), 'Other'];
  return {
    path: 'contact.html',
    pageType: 'ContactPage',
    title: 'Contact Wee4 Tech Solutions | Software Company in Chennai',
    description: `Contact Wee4 Tech Solutions, Chennai. Call ${SITE.phone} or email ${SITE.email} for software, IT consulting, marketing or training.`,
    crumbs,
    body: `
${pageHero({ crumbs, eyebrow: 'Contact', h1: 'Let’s talk about your project', lead: 'Tell us what you want to build, fix or learn. We usually reply within one business day.', actions: false })}
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
        <div><label for="name">Name</label><input type="text" id="name" name="name" required autocomplete="name"></div>
        <div><label for="email">Email</label><input type="email" id="email" name="email" required autocomplete="email"></div>
        <div><label for="phone">Mobile number</label><input type="tel" id="phone" name="phone" required autocomplete="tel" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" title="10-digit mobile number"></div>
        <div><label for="interest">I’m interested in</label><select id="interest" name="interest" required><option value="">Choose one</option>${opts.map((o) => `<option>${esc(o)}</option>`).join('')}</select></div>
        <div class="full"><label for="subject">Subject <span class="opt">(optional)</span></label><input type="text" id="subject" name="subject"></div>
        <div class="full"><label for="message">Message</label><textarea id="message" name="message" required placeholder="A few lines about your project, timeline or the course you want to join"></textarea></div>
      </div>
      <p class="form-note">We respect your privacy. See our <a href="privacy-policy.html">privacy policy</a>.</p>
      <div style="margin-top:20px"><button class="btn btn-brand" type="submit"><span class="spinner" aria-hidden="true"></span> Send message</button></div>
      <div class="form-status" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>
`,
    scripts: `<script>
(function(){var p=new URLSearchParams(location.search).get('interest');if(!p)return;var s=document.getElementById('interest');for(var i=0;i<s.options.length;i++){if(s.options[i].text===p){s.selectedIndex=i;return;}}})();
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
  return [home(), servicesHub(), ...SERVICES.map(servicePage), coursesHub(), ...COURSES.map(coursePage), about(), career(), contact(), privacy(), terms(), notFound()];
}

// Old URLs → new URLs (static redirect stubs)
export const REDIRECTS = {
  ...Object.fromEntries(COURSES.map((c) => [c.old, c.slug])),
  'service-details.html': 'it-staffing.html',
  'privacypolicy.html': 'privacy-policy.html',
  'termsandcondition.html': 'terms-and-conditions.html',
  'testimonials.html': 'about.html',
  'team.html': 'about.html',
  'portfolio.html': 'services.html',
  'portfolio-details.html': 'services.html',
  'pricing.html': 'contact.html',
  'blog.html': 'index.html',
  'blog-details.html': 'index.html',
};
