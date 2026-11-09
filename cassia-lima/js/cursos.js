/* Catálogo independente: menu, filtros e materiais, sem dependências de rede. */
(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = $('.site-header'), toggle = $('.nav-toggle'), nav = $('#menu');
  const backdrop = document.createElement('button');
  backdrop.className = 'nav-backdrop'; backdrop.type = 'button'; backdrop.hidden = true;
  backdrop.tabIndex = -1; backdrop.setAttribute('aria-label', 'Fechar menu'); document.body.append(backdrop);
  function menu(open) {
    header.style.setProperty('--menu-space', `${Math.max(120, innerHeight - header.getBoundingClientRect().bottom)}px`);
    toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open); backdrop.hidden = !open;
  }
  toggle.addEventListener('click', () => menu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('#menu a').forEach(a => a.addEventListener('click', () => menu(false)));
  backdrop.addEventListener('click', () => { menu(false); toggle.focus({preventScroll:true}); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !backdrop.hidden) { menu(false); toggle.focus(); } });
  document.addEventListener('focusin', e => { if (!header.contains(e.target) && e.target !== backdrop) menu(false); });
  matchMedia('(min-width:1100px)').addEventListener('change', () => menu(false));
  let frame = false;
  function update() {
    frame = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    $('.scroll-progress span').style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY/max) : 0})`;
    header.classList.toggle('is-scrolled', scrollY > 12);
    $('#dock').classList.toggle('is-hidden', $('#catalogo').getBoundingClientRect().top > innerHeight || $('#orientacao').getBoundingClientRect().top < innerHeight);
  }
  addEventListener('scroll', () => { if (!frame) { frame = true; requestAnimationFrame(update); } }, {passive:true});
  addEventListener('resize', update); update();
  const cards = $$('.course-card');
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    cards.forEach(card => {
      card.hidden = category !== 'todos' && card.dataset.category !== category;
      card.classList.remove('catalog-enter');
      if (!card.hidden && !reduced.matches) requestAnimationFrame(() => card.classList.add('catalog-enter'));
    });
    $$('[data-group]').forEach(group => group.hidden = !group.querySelector('.course-card:not([hidden])'));
    const count = cards.filter(c => !c.hidden).length;
    $('.filter-status').textContent = `${count} ${count === 1 ? 'modalidade disponível' : 'modalidades disponíveis'} · ${button.textContent.replace(' · 13','')}`;
    update();
  }));
  $$('[data-area]').forEach(link => link.addEventListener('click', () => {
    document.querySelector(`[data-filter="${link.dataset.area}"]`)?.click();
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reduced.matches) entry.target.classList.add('catalog-enter');
      observer.unobserve(entry.target);
    }), {threshold:.08});
    cards.forEach(card => observer.observe(card));
  }
  const dialog = $('#photo-dialog'); let trigger;
  $$('[data-image]').forEach(button => button.addEventListener('click', () => {
    trigger = button; $('#photo-expanded').src = button.dataset.image;
    $('#photo-expanded').alt = button.dataset.caption; $('#photo-caption').textContent = button.dataset.caption;
    dialog.showModal();
  }));
  $('.photo-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    const b = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => trigger?.focus({preventScroll:true}));
  $('#ano').textContent = new Date().getFullYear();
})();
