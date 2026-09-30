/* Wee4 Tech Solutions — site behaviour (no dependencies) */
(function () {
  'use strict';

  var API_BASE = 'https://roshanbags.com/EcommerceAPI';

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });
  }
  document.querySelectorAll('.nav-parent').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.closest('.has-sub');
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      li.classList.remove('open');
      li.querySelector('.nav-parent').setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal — content stays visible without JS or with reduced motion
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('main .section-head, main .answer, main .card, main .steps li, main .faq details, main .syllabus details, main .split > div, main .facts, main .clients a, main .cta-band, main .chips li, main .table-wrap, main h2');
    var imgs = document.querySelectorAll('main .rounded-img');
    var ioAlive = false;
    var io = new IntersectionObserver(function (entries) {
      ioAlive = true;
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) {
      if (el.closest('.hero, .page-hero') || el.parentElement.closest('.reveal')) return;
      // Stagger siblings in grids/lists
      var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.tagName === el.tagName; });
      var i = sibs.indexOf(el);
      if (sibs.length > 1 && i > 0) el.style.setProperty('--d', Math.min(i, 6) * 0.07 + 's');
      el.classList.add('reveal');
      io.observe(el);
    });
    imgs.forEach(function (el) { el.classList.add('reveal-img'); io.observe(el); });
    document.documentElement.classList.add('reveal-on');
    // Safety net: if the observer never reports (unusual browsers, bots), show everything
    setTimeout(function () {
      if (!ioAlive) document.documentElement.classList.remove('reveal-on');
    }, 2500);
  }

  // Track WhatsApp and phone clicks as leads
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
    a.addEventListener('click', function () { if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click'); });
  });
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () { if (typeof window.gtag === 'function') window.gtag('event', 'phone_click'); });
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  function status(form, ok, msg) {
    var box = form.querySelector('.form-status');
    box.className = 'form-status ' + (ok ? 'ok' : 'err');
    box.textContent = msg;
  }
  function busy(form, on) {
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = on;
    btn.classList.toggle('loading', on);
  }
  function track(name) { if (typeof window.gtag === 'function') window.gtag('event', name); }

  // Contact / enquiry form
  var contact = document.getElementById('contact-form');
  if (contact) {
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contact.reportValidity()) return;
      var fd = new FormData(contact);
      var topic = fd.get('interest');
      var subject = fd.get('subject');
      var message = (topic ? '[' + topic + '] ' : '') + (subject ? subject + ' — ' : '') + fd.get('message');
      busy(contact, true);
      fetch(API_BASE + '/Registration/InsContactus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Type: 1,
          MobileNo: fd.get('phone'),
          FirstName: fd.get('name'),
          Message: message,
          EmailId: fd.get('email')
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.Status === '0') {
            status(contact, true, 'Thank you! Your message has been sent. We usually reply within one business day.');
            contact.reset();
            if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { service: topic || 'not given' });
          } else {
            status(contact, false, res.message || 'Something went wrong. Please try again or email info@wee4techsolutions.com.');
          }
        })
        .catch(function () { status(contact, false, 'Something went wrong. Please try again or email info@wee4techsolutions.com.'); })
        .finally(function () { busy(contact, false); });
    });
  }

  // Career application form
  var career = document.getElementById('career-form');
  if (career) {
    career.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!career.reportValidity()) return;
      if (window.grecaptcha && window.grecaptcha.getResponse().length === 0) {
        status(career, false, 'Please confirm you are not a robot.');
        return;
      }
      var fd = new FormData(career);
      var body = new FormData();
      body.append('JobId', '0');
      body.append('Skills', fd.get('Skills'));
      body.append('FullName', fd.get('name'));
      body.append('MobileNo', fd.get('phone'));
      body.append('EmailId', fd.get('email'));
      body.append('CurrentLocation', fd.get('CurrentLocation'));
      body.append('PreferredLocation', fd.get('PreferredLocation'));
      body.append('CurrentCompany', fd.get('CurrentCompany'));
      body.append('TotalExp', fd.get('TotalExp'));
      body.append('RelevantExp', fd.get('RelevantExp'));
      body.append('Referredby', fd.get('Referredby'));
      body.append('CTC', fd.get('CTC'));
      body.append('ExpectedCTC', fd.get('ExpectedCTC'));
      body.append('Resume', career.querySelector('#resume').files[0]);
      busy(career, true);
      fetch(API_BASE + '/Careers/InsCareersApply', { method: 'POST', body: body })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.Status === '0') {
            status(career, true, 'Thank you! Your application has been received. Our HR team will contact you if your profile matches an opening.');
            career.reset();
            if (window.grecaptcha) window.grecaptcha.reset();
            track('career_application');
          } else {
            status(career, false, res.message || 'Something went wrong. Please try again or email hr@wee4techsolutions.com.');
          }
        })
        .catch(function () { status(career, false, 'Something went wrong. Please try again or email hr@wee4techsolutions.com.'); })
        .finally(function () { busy(career, false); });
    });
  }
})();
