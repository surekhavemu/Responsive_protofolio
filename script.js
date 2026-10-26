(function () {
  'use strict';
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Persistent light/dark theme. Falls back gracefully if storage is unavailable. */
  var root = document.documentElement;
  var themeToggle = document.querySelector('.theme-toggle');
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('portfolio-theme'); } catch (e) { /* storage may be blocked */ }
  var preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(theme) {
    var dark = theme === 'dark';
    if (dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(dark));
      themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggle.innerHTML = dark ? '☀ <span>Light mode</span>' : '☾ <span>Dark mode</span>';
    }
  }
  applyTheme(savedTheme || (preferredDark ? 'dark' : 'light'));
  if (themeToggle) themeToggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch (e) { /* theme still works for this page */ }
  });

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* Contact form */
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.noValidate = true; // JS shows accessible messages; without JS, native validation still works

  var summary = document.getElementById('error-summary');
  var summaryTitle = document.getElementById('error-summary-title');
  var summaryList = summary.querySelector('ul');
  var status = document.getElementById('form-status');
  var fields = ['name', 'email', 'subject', 'topic', 'message'];

  function check(field) {
    var v = form.elements[field].value || '';
    var t = v.trim();
    switch (field) {
      case 'name': return t ? '' : 'Enter your full name.';
      case 'email':
        if (!t) return 'Enter your email address.';
        return EMAIL.test(t) ? '' : 'Enter an email address in the format name@example.com.';
      case 'subject': return t ? '' : 'Enter a subject for your message.';
      case 'topic': return v ? '' : 'Select what your message is about.';
      case 'message':
        if (!t) return 'Enter your message.';
        return t.length >= 10 ? '' : 'Your message must be at least 10 characters. You have entered ' + t.length + '.';
    }
  }

  function show(field, msg) {
    var err = document.getElementById(field + '-error');
    var controls = field === 'topic' ? form.querySelectorAll('input[name="topic"]') : [form.elements[field]];
    err.textContent = msg;
    err.hidden = !msg;
    Array.prototype.forEach.call(controls, function (c) {
      if (msg) { c.setAttribute('aria-invalid', 'true'); c.classList.add('is-invalid'); }
      else { c.removeAttribute('aria-invalid'); c.classList.remove('is-invalid'); }
    });
  }

  fields.forEach(function (f) {
    var els = f === 'topic' ? form.querySelectorAll('input[name="topic"]') : [form.elements[f]];
    Array.prototype.forEach.call(els, function (el) {
      el.addEventListener('blur', function () { if (f !== 'topic') show(f, check(f)); });
      el.addEventListener('input', function () {
        if (el.getAttribute('aria-invalid') === 'true') show(f, check(f)); // clear errors as soon as fixed
      });
      el.addEventListener('change', function () { if (f === 'topic') show(f, check(f)); });
    });
  });

  summaryList.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    document.getElementById(a.getAttribute('href').slice(1)).focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    var errors = [];
    fields.forEach(function (f) {
      var msg = check(f);
      show(f, msg);
      if (msg) errors.push({ id: f === 'topic' ? 'topic-internship' : f, msg: msg });
    });

    if (errors.length) {
      summaryTitle.textContent = errors.length === 1 ? 'There is 1 problem with your message' : 'There are ' + errors.length + ' problems with your message';
      summaryList.textContent = '';
      errors.forEach(function (er) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + er.id;
        a.textContent = er.msg;
        li.appendChild(a);
        summaryList.appendChild(li);
      });
      summary.hidden = false;
      summary.focus();
      return;
    }

    summary.hidden = true;
    var d = new FormData(form);
    var body = 'Name: ' + d.get('name') + '\nEmail: ' + d.get('email') + '\nTopic: ' + d.get('topic') + '\n\n' + d.get('message');
    var href = 'mailto:' + form.dataset.recipient + '?subject=' + encodeURIComponent(d.get('subject')) + '&body=' + encodeURIComponent(body);
    var p = document.createElement('p');
    p.textContent = 'Thank you, ' + d.get('name') + '. Your message is valid. This site has no server, so nothing has been sent yet. ';
    var a = document.createElement('a');
    a.href = href;
    a.textContent = 'Open the message in your email app to send it';
    p.appendChild(a);
    p.appendChild(document.createTextNode('.'));
    status.appendChild(p);
  });
})();
