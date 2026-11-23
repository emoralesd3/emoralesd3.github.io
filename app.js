/* ==========================================================================
   Lógica del sitio: temas, servicios, proyectos, vista de detalle, galería
   y formularios de contacto. Los datos viven en data.js
   ========================================================================== */
(function () {
  'use strict';

  var S = window.SITE, PROJECTS = window.PROJECTS || [], SERVICES = window.SERVICES || [], AREAS = window.AREAS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var safeUrl = function (u) { return /^https?:\/\//i.test(u || '') ? u : ''; };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var waLink = function (msg) { return 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(msg); };
  var mailLink = function (subject, body) { return 'mailto:' + S.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); };
  var HOME_TITLE = document.title;

  var home = $('#home'), detail = $('#detail'), ctaBar = $('#ctaBar');

  /* ---------------- Tema claro / oscuro ---------------- */
  $('#themeBtn').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------------- Menú móvil ---------------- */
  var links = $('#links'), menuBtn = $('#menuBtn');
  function setMenu(open) {
    links.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------------- Barra de progreso y nav ---------------- */
  var bar = $('#progress'), nav = $('#nav'), ticking = false;
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    nav.classList.toggle('scrolled', scrollY > 10);
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------------- Aparición al hacer scroll ---------------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 }) : null;
  function watchReveals(root) {
    $$('.reveal', root).forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });
  }

  /* ---------------- Enlace activo (scrollspy) ---------------- */
  var navLinks = $$('#links a:not(.btn)');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !home.hidden) navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) spy.observe(s); });
  }

  /* ---------------- Hero: texto rotativo y contadores ---------------- */
  var rot = $('#rot');
  var words = ['Desarrollador Backend', 'Desarrollador Frontend', 'Desarrollador Móvil', 'Analista de Sistemas'];
  if (reduce) { rot.textContent = words[0]; }
  else {
    var w = 0, c = 0, del = false;
    (function type() {
      var word = words[w], t = del ? 35 : 75;
      c += del ? -1 : 1;
      rot.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; t = 1600; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; t = 350; }
      setTimeout(type, t);
    })();
  }
  $$('[data-count]').forEach(function (el) {
    var m = el.textContent.trim().match(/^(\+?)(\d+)(\+?)$/);
    if (!m || reduce) return;
    var pre = m[1], target = +m[2], suf = m[3];
    el.textContent = pre + '0' + suf;
    setTimeout(function () {
      var t0 = performance.now(), dur = 1500;
      (function tick(now) {
        var p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(target * e) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, 600);
  });

  /* ---------------- Servicios (filtrables) ---------------- */
  var area = 'todos', filtersEl = $('#filters'), svcGrid = $('#svcGrid');
  var areaLabel = {}; AREAS.forEach(function (a) { areaLabel[a.id] = a.label; });
  var projBySlug = {}; PROJECTS.forEach(function (p) { projBySlug[p.slug] = p; });

  function renderFilters() {
    filtersEl.innerHTML = AREAS.map(function (a) {
      return '<button type="button" data-a="' + a.id + '" aria-pressed="' + (a.id === area) + '">' + esc(a.label) + '</button>';
    }).join('');
  }
  function renderServices() {
    var list = SERVICES.filter(function (s) { return area === 'todos' || s.areas.indexOf(area) > -1; });
    svcGrid.innerHTML = list.map(function (s, i) {
      var pr = s.project && projBySlug[s.project];
      return '<article class="svc" style="--i:' + i + '">' +
        '<span class="tag">' + esc(s.areas.map(function (a) { return areaLabel[a]; }).join(' · ')) + '</span>' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<dl><div><dt>El problema</dt><dd class="p">' + esc(s.problem) + '</dd></div>' +
        '<div><dt>Lo que construyo</dt><dd>' + esc(s.solution) + '</dd></div></dl>' +
        (pr ? '<a class="more" href="#/proyecto/' + esc(pr.slug) + '">Ver proyecto relacionado</a>' : '') +
        '</article>';
    }).join('');
  }
  filtersEl.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-a]');
    if (!b) return;
    area = b.dataset.a; renderFilters(); renderServices();
  });
  renderFilters(); renderServices();

  /* ---------------- Tarjetas de proyecto ---------------- */
  function coverHTML(p, cls) {
    var img = p.images && p.images[0];
    return '<div class="' + cls + '" style="--hue:' + (+p.hue || 160) + '">' +
      (img ? '<img loading="lazy" src="' + esc(img.src) + '" alt="">' : '<span class="mono" aria-hidden="true">' + esc(p.mono) + '</span>') +
      (cls === 'cover' ? '<span class="chip">' + esc(p.year) + ' · ' + esc(p.area) + '</span>' : '') +
      '</div>';
  }
  $('#projGrid').innerHTML = PROJECTS.map(function (p) {
    return '<article class="proj reveal">' + coverHTML(p, 'cover') +
      '<div class="proj-body"><h3>' + esc(p.title) + '</h3><p>' + esc(p.subtitle) + '</p>' +
      '<div class="tags">' + p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<a class="proj-link" href="#/proyecto/' + esc(p.slug) + '" aria-label="Ver detalles de ' + esc(p.title) + '"><span>Ver detalles</span><i aria-hidden="true">→</i></a>' +
      '</div></article>';
  }).join('');

  /* ---------------- Formularios de contacto ---------------- */
  function bindForm(form, build) {
    form.addEventListener('input', function (e) { e.target.classList.remove('invalid'); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = $$('[required]', form).filter(function (el) { var v = !el.value.trim(); el.classList.toggle('invalid', v); return v; });
      if (bad.length) { bad[0].focus(); return; }
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = String(v).trim(); });
      var out = build(data);
      var via = (e.submitter && e.submitter.dataset.via) || 'wa';
      if (via === 'mail') location.href = mailLink(out.subject, out.text);
      else window.open(waLink(out.text), '_blank', 'noopener');
    });
  }
  $('#tipoSel').innerHTML = (window.PROJECT_TYPES || []).map(function (t) { return '<option>' + esc(t) + '</option>'; }).join('');
  bindForm($('#contactForm'), function (d) {
    return { subject: 'Consulta de proyecto: ' + d.tipo, text: 'Hola Elvin, soy ' + d.nombre + '.\nMe interesa: ' + d.tipo + '.\n\n' + d.mensaje };
  });
  $('[data-wa]').href = waLink('Hola Elvin, vi tu portafolio y me gustaría contactarte.');
  $('[data-mail]').href = mailLink('Contacto desde tu portafolio', 'Hola Elvin,');
  $('#year').textContent = new Date().getFullYear();

  /* ---------------- Galería y lightbox ---------------- */
  var lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbList = [], lbIdx = 0, lbOpener = null;
  function lbShow(i) {
    lbIdx = (i + lbList.length) % lbList.length;
    lbImg.src = lbList[lbIdx].src; lbImg.alt = lbList[lbIdx].caption || '';
    lbCap.textContent = (lbList[lbIdx].caption ? lbList[lbIdx].caption + ' · ' : '') + (lbIdx + 1) + '/' + lbList.length;
  }
  function lbOpen(list, i, opener) {
    lbList = list; lbOpener = opener; lbShow(i);
    lb.hidden = false; document.body.style.overflow = 'hidden'; $('.x', lb).focus();
  }
  function lbClose() {
    lb.hidden = true; document.body.style.overflow = '';
    if (lbOpener) lbOpener.focus();
  }
  $('.x', lb).addEventListener('click', lbClose);
  $('.prev', lb).addEventListener('click', function () { lbShow(lbIdx - 1); });
  $('.next', lb).addEventListener('click', function () { lbShow(lbIdx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lbClose(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbShow(lbIdx - 1);
    if (e.key === 'ArrowRight') lbShow(lbIdx + 1);
    if (e.key === 'Tab') {
      var f = $$('button', lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------- Vista de detalle (estilo perfil) ---------------- */
  function detailHTML(p, idx) {
    var n = PROJECTS.length, prev = PROJECTS[(idx - 1 + n) % n], next = PROJECTS[(idx + 1) % n];
    var live = safeUrl(p.links && p.links.live), repo = safeUrl(p.links && p.links.repo);
    var imgs = p.images || [];
    var waMsg = 'Hola Elvin, vi el proyecto «' + p.title + '» en tu portafolio y me interesa un desarrollo similar para mi empresa.';
    var mailBody = waMsg + '\n\nMi nombre: \nMi empresa: \nQué necesito: ';
    var tabs = [
      ['resumen', 'Resumen'], ['modulos', 'Módulos'], ['galeria', 'Galería' + (imgs.length ? ' (' + imgs.length + ')' : '')], ['contacto', 'Contacto']
    ];

    var ticks = function (arr) { return '<ul class="ticks">' + arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; };

    var resumen =
      '<div class="card"><h2>Acerca del proyecto</h2>' + p.about.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
      '<div class="card"><h2>Qué resuelve</h2>' + ticks(p.solves) + '</div>' +
      (p.stack && p.stack.length ? '<div class="card"><h2>Tecnologías</h2><div class="chips">' + p.stack.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div></div>' : '');

    var modulos = '<div class="card"><h2>Módulos implementados</h2><div class="mod-grid">' +
      p.modules.map(function (m) { return '<div class="mod"><h3>' + esc(m.group) + '</h3>' + ticks(m.items) + '</div>'; }).join('') + '</div></div>';

    var galeria = '<div class="card"><h2>Galería</h2><div class="gal">' + (imgs.length
      ? imgs.map(function (im, i) { return '<button type="button" data-i="' + i + '" aria-label="Ampliar imagen: ' + esc(im.caption || ('imagen ' + (i + 1))) + '"><img loading="lazy" src="' + esc(im.src) + '" alt="' + esc(im.caption || '') + '"></button>'; }).join('')
      : '<div class="empty"><b>Capturas próximamente</b><span>Puedo mostrarte una demostración del sistema bajo solicitud.</span></div>') + '</div></div>';

    var contacto = '<div class="card"><h2>¿Necesitas algo similar?</h2><p>Cuéntame sobre tu empresa y lo que quieres lograr. Te respondo con una propuesta de cómo abordarlo.</p>' +
      '<form class="form" id="projForm" novalidate style="margin-top:18px">' +
      '<label>Tu nombre<input name="nombre" required autocomplete="name" placeholder="Nombre y apellido"></label>' +
      '<label>Cuéntame más<textarea name="mensaje" rows="4" required placeholder="¿Qué proceso quieres digitalizar o mejorar?"></textarea></label>' +
      '<div class="form-actions"><button class="btn" type="submit" data-via="wa">Enviar por WhatsApp</button><button class="btn btn-ghost" type="submit" data-via="mail">Enviar por correo</button></div>' +
      '<p class="form-note">Se abrirá tu app de WhatsApp o correo con el mensaje listo.</p></form></div>';

    var panels = { resumen: resumen, modulos: modulos, galeria: galeria, contacto: contacto };

    return '<button class="back" type="button" id="backBtn">← Volver al portafolio</button>' +
      '<div style="--hue:' + (+p.hue || 160) + '">' +
      '<div class="fp-cover">' + (imgs[0] ? '<img src="' + esc(imgs[0].src) + '" alt="">' : '<span class="mono" aria-hidden="true">' + esc(p.mono) + '</span>') + '</div>' +
      '<div class="fp-head"><div class="fp-avatar" aria-hidden="true">' + esc(p.mono) + '</div>' +
      '<div class="fp-title"><h1 id="detailTitle" tabindex="-1">' + esc(p.title) + '</h1><p class="sub">' + esc(p.subtitle) + '</p>' +
      '<div class="meta"><span><b>' + esc(p.year) + '</b></span><span>' + esc(p.company) + '</span><span>' + esc(p.role) + '</span></div></div>' +
      '<div class="fp-actions">' +
      (live ? '<a class="btn" href="' + esc(live) + '" target="_blank" rel="noopener noreferrer">Ver sitio en vivo ↗</a>' : '') +
      (repo ? '<a class="btn btn-ghost" href="' + esc(repo) + '" target="_blank" rel="noopener noreferrer">Código ↗</a>' : '') +
      '<a class="btn' + (live ? ' btn-ghost' : '') + '" href="' + esc(waLink(waMsg)) + '" target="_blank" rel="noopener">Solicitar algo similar</a>' +
      '</div></div></div>' +
      '<div class="fp-tabs" role="tablist" aria-label="Secciones del proyecto">' + tabs.map(function (t, i) {
        return '<button type="button" role="tab" id="tab-' + t[0] + '" aria-controls="pn-' + t[0] + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(t[1]) + '</button>';
      }).join('') + '</div>' +
      '<div class="fp-grid"><div>' + tabs.map(function (t, i) {
        return '<div class="panel' + (i === 0 ? ' on' : '') + '" role="tabpanel" id="pn-' + t[0] + '" aria-labelledby="tab-' + t[0] + '">' + panels[t[0]] + '</div>';
      }).join('') + '</div>' +
      '<aside class="fp-side" aria-label="Información del proyecto">' +
      '<div class="card"><h2>Información</h2><dl class="info">' +
      '<div><dt>Tipo</dt><dd>' + esc(p.type) + '</dd></div><div><dt>Área</dt><dd>' + esc(p.area) + '</dd></div>' +
      '<div><dt>Año</dt><dd>' + esc(p.year) + '</dd></div><div><dt>Empresa</dt><dd>' + esc(p.company) + '</dd></div><div><dt>Rol</dt><dd>' + esc(p.role) + '</dd></div></dl>' +
      '<div class="tags" style="margin-top:16px">' + p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div></div>' +
      '<div class="card cta-card"><h2>¿Quieres algo así?</h2><p>Desarrollo sistemas a la medida para Guatemala y LATAM. Hablemos de tu proyecto.</p>' +
      '<a class="btn" href="' + esc(waLink(waMsg)) + '" target="_blank" rel="noopener">Escribir por WhatsApp</a>' +
      '<a class="btn" href="' + esc(mailLink('Proyecto similar a ' + p.title, mailBody)) + '">Enviar correo</a></div>' +
      '</aside></div>' +
      '<nav class="fp-nav" aria-label="Otros proyectos">' +
      '<a href="#/proyecto/' + esc(prev.slug) + '"><small>← Anterior</small><b>' + esc(prev.title) + '</b></a>' +
      '<a href="#/proyecto/' + esc(next.slug) + '"><small>Siguiente →</small><b>' + esc(next.title) + '</b></a></nav>';
  }

  function bindDetail(p) {
    $('#backBtn').addEventListener('click', function () {
      if (cameFromApp && enteredFromHome) history.back(); else location.hash = '#proyectos';
    });
    /* pestañas con teclado */
    var tabEls = $$('.fp-tabs [role=tab]', detail);
    function selectTab(t, focus) {
      tabEls.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
        $('#' + x.getAttribute('aria-controls')).classList.toggle('on', on);
      });
      if (focus) t.focus();
    }
    tabEls.forEach(function (t, i) {
      t.addEventListener('click', function () { selectTab(t); });
      t.addEventListener('keydown', function (e) {
        var k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabEls.length - 1 }[e.key];
        if (k === undefined) return;
        e.preventDefault(); selectTab(tabEls[(k + tabEls.length) % tabEls.length], true);
      });
    });
    $$('.gal button', detail).forEach(function (b) {
      b.addEventListener('click', function () { lbOpen(p.images, +b.dataset.i, b); });
    });
    var f = $('#projForm', detail);
    bindForm(f, function (d) {
      return { subject: 'Proyecto similar a ' + p.title, text: 'Hola Elvin, soy ' + d.nombre + '. Vi el proyecto «' + p.title + '» en tu portafolio y me interesa algo similar.\n\n' + d.mensaje };
    });
  }

  /* ---------------- Enrutador por hash ---------------- */
  var lastScroll = 0, inDetail = false, cameFromApp = false, booted = false, enteredFromHome = false;
  function slugFromHash() { var m = location.hash.match(/^#\/proyecto\/([\w-]+)\/?$/); return m ? m[1] : null; }
  function jump(top) { window.scrollTo({ top: top, left: 0, behavior: 'instant' }); }

  function showDetail(p, idx) {
    if (!inDetail) { lastScroll = scrollY; enteredFromHome = booted; }
    else enteredFromHome = false;
    inDetail = true;
    home.hidden = true; detail.hidden = false;
    detail.innerHTML = detailHTML(p, idx);
    bindDetail(p);
    document.title = p.title + ' | Elvin Morales';
    navLinks.forEach(function (a) { a.classList.remove('active'); });
    $('#ctaWa').href = waLink('Hola Elvin, vi el proyecto «' + p.title + '» en tu portafolio y me interesa un desarrollo similar para mi empresa.');
    ctaBar.hidden = false; document.body.classList.add('has-cta');
    jump(0);
    $('#detailTitle').focus({ preventScroll: true });
  }
  function showHome(hash) {
    var wasDetail = inDetail;
    inDetail = false;
    detail.hidden = true; detail.innerHTML = ''; home.hidden = false;
    ctaBar.hidden = true; document.body.classList.remove('has-cta');
    document.title = HOME_TITLE;
    var target = hash && hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    if (wasDetail && (!target || hash === '#proyectos')) jump(lastScroll);
    else if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    else if (wasDetail) jump(0);
  }
  function swap(fn) {
    if (document.startViewTransition && !reduce && booted) document.startViewTransition(fn);
    else {
      fn();
      var el = inDetail ? detail : home;
      if (booted && !reduce) { el.classList.remove('enter'); void el.offsetWidth; el.classList.add('enter'); }
    }
  }
  function route() {
    var slug = slugFromHash();
    var idx = PROJECTS.findIndex(function (p) { return p.slug === slug; });
    if (slug && idx < 0) { location.replace('#proyectos'); return; }
    if (idx >= 0) swap(function () { showDetail(PROJECTS[idx], idx); watchReveals(detail); });
    else if (inDetail) swap(function () { showHome(location.hash); });
    else if (booted && location.hash && location.hash.length > 1) { /* ancla normal dentro del inicio: el navegador desplaza */ }
  }
  addEventListener('hashchange', function () { cameFromApp = true; route(); });

  watchReveals(home);
  if (slugFromHash()) route();
  booted = true;
})();
