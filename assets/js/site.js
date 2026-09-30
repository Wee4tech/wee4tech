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

  // ---------- Form validation (inline messages) ----------
  var RX = {
    name: /^[A-Za-z][A-Za-z .'-]{1,59}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    mobile: /^[6-9][0-9]{9}$/,
    number: /^\d+(\.\d{1,2})?$/
  };
  var val = function (form, id) { var el = form.querySelector('#' + id); return el ? el.value.trim() : ''; };

  // Each rule returns an error message, or '' when the value is fine.
  var CONTACT_RULES = {
    name: function (v) { return !v ? 'Please enter your name.' : !RX.name.test(v) ? 'Use letters only (2–60 characters).' : ''; },
    email: function (v) { return !v ? 'Please enter your email address.' : !RX.email.test(v) ? 'Enter a valid email, e.g. name@company.com.' : ''; },
    phone: function (v) { return !v ? 'Please enter your mobile number.' : !RX.mobile.test(v) ? 'Enter a valid 10-digit mobile number.' : ''; },
    interest: function (v) { return !v ? 'Please choose what you need.' : ''; },
    subject: function (v) { return v.length > 100 ? 'Keep the subject under 100 characters.' : ''; },
    message: function (v) { return !v ? 'Please tell us a little about what you need.' : v.length < 10 ? 'Please add a bit more detail (at least 10 characters).' : v.length > 1000 ? 'Keep the message under 1000 characters.' : ''; }
  };

  var years = function (label) {
    return function (v) {
      if (!v) return 'Please enter your ' + label + ' in years (0 if none).';
      if (!RX.number.test(v) || Number(v) > 50) return 'Enter a number of years between 0 and 50, e.g. 2 or 3.5.';
      return '';
    };
  };
  var amount = function (label) {
    return function (v) {
      if (!v) return 'Please enter your ' + label + '.';
      if (!RX.number.test(v)) return 'Enter numbers only, e.g. 450000.';
      return '';
    };
  };
  var CAREER_RULES = {
    name: CONTACT_RULES.name,
    email: CONTACT_RULES.email,
    phone: CONTACT_RULES.phone,
    Skills: function (v) { return !v ? 'Please list your key skills.' : v.length > 200 ? 'Keep skills under 200 characters.' : ''; },
    CurrentLocation: function (v) { return !v ? 'Please enter your current location.' : ''; },
    PreferredLocation: function (v) { return !v ? 'Please choose a preferred location.' : ''; },
    TotalExp: years('total experience'),
    RelevantExp: function (v, form) {
      var e = years('relevant experience')(v);
      if (e) return e;
      var total = val(form, 'TotalExp');
      return RX.number.test(total) && Number(v) > Number(total) ? 'Relevant experience can’t be more than total experience.' : '';
    },
    CTC: amount('current CTC'),
    ExpectedCTC: amount('expected CTC'),
    resume: function (v, form) {
      var f = form.querySelector('#resume').files[0];
      if (!f) return 'Please upload your resume.';
      if (!/\.(pdf|docx?)$/i.test(f.name)) return 'Upload a PDF or Word document (.pdf, .doc, .docx).';
      if (f.size > 5 * 1024 * 1024) return 'The file is too large. Please upload a resume under 5 MB.';
      return '';
    }
  };

  function showError(el, msg) {
    var id = el.id + '-error';
    var box = document.getElementById(id);
    if (!box) {
      box = document.createElement('p');
      box.id = id;
      box.className = 'field-error';
      el.insertAdjacentElement('afterend', box);
    }
    box.textContent = msg;
    box.hidden = !msg;
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) el.setAttribute('aria-describedby', id); else el.removeAttribute('aria-describedby');
  }

  function checkField(form, rules, id) {
    var el = form.querySelector('#' + id);
    if (!el || !rules[id]) return true;
    var msg = rules[id](val(form, id), form);
    showError(el, msg);
    return !msg;
  }

  function validate(form, rules) {
    var first = null;
    Object.keys(rules).forEach(function (id) {
      if (!checkField(form, rules, id) && !first) first = form.querySelector('#' + id);
    });
    if (first) { first.focus(); return false; }
    return true;
  }

  function attachValidation(form, rules) {
    Object.keys(rules).forEach(function (id) {
      var el = form.querySelector('#' + id);
      if (!el) return;
      // Validate when leaving a field; re-check while typing once an error is shown.
      el.addEventListener('blur', function () { if (el.value.trim() || el.getAttribute('aria-invalid') === 'true') checkField(form, rules, id); });
      el.addEventListener(el.tagName === 'SELECT' || el.type === 'file' ? 'change' : 'input', function () {
        if (el.getAttribute('aria-invalid') === 'true') checkField(form, rules, id);
      });
    });
    // Mobile: digits only, max 10
    var phone = form.querySelector('#phone');
    if (phone) phone.addEventListener('input', function () { phone.value = phone.value.replace(/\D/g, '').slice(0, 10); });
    // Experience and CTC: numbers and one decimal point only
    ['TotalExp', 'RelevantExp', 'CTC', 'ExpectedCTC'].forEach(function (id) {
      var el = form.querySelector('#' + id);
      if (el) el.addEventListener('input', function () { el.value = el.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); });
    });
  }

  // Contact / enquiry form
  var contact = document.getElementById('contact-form');
  if (contact) {
    attachValidation(contact, CONTACT_RULES);
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(contact, CONTACT_RULES)) return;
      var topic = val(contact, 'interest');
      var subject = val(contact, 'subject');
      var message = (topic ? '[' + topic + '] ' : '') + (subject ? subject + ' — ' : '') + val(contact, 'message');
      busy(contact, true);
      fetch(API_BASE + '/Registration/InsContactus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Type: 1,
          MobileNo: val(contact, 'phone'),
          FirstName: val(contact, 'name'),
          Message: message,
          EmailId: val(contact, 'email')
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
    attachValidation(career, CAREER_RULES);
    career.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(career, CAREER_RULES)) return;
      if (window.grecaptcha && window.grecaptcha.getResponse().length === 0) {
        status(career, false, 'Please confirm you are not a robot.');
        return;
      }
      var body = new FormData();
      body.append('JobId', '0');
      body.append('Skills', val(career, 'Skills'));
      body.append('FullName', val(career, 'name'));
      body.append('MobileNo', val(career, 'phone'));
      body.append('EmailId', val(career, 'email'));
      body.append('CurrentLocation', val(career, 'CurrentLocation'));
      body.append('PreferredLocation', val(career, 'PreferredLocation'));
      body.append('CurrentCompany', val(career, 'CurrentCompany'));
      body.append('TotalExp', val(career, 'TotalExp'));
      body.append('RelevantExp', val(career, 'RelevantExp'));
      body.append('Referredby', val(career, 'Referredby'));
      body.append('CTC', val(career, 'CTC'));
      body.append('ExpectedCTC', val(career, 'ExpectedCTC'));
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
