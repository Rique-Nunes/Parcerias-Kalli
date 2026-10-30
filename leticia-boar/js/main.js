/* Letícia Boaroli — base de interações do projeto Cássia Lima, com dados próprios. */
const CONFIG = {
  // Canais públicos observados nos links do perfil @leticiaboar em 30/10/2026.
  whatsappBooking: "https://wa.me/message/NNXYGKA5TB4UF1",
  whatsappCourses: "https://wa.me/message/UDWPFGALAUJTM1",
  instagram: "leticiaboar",
};
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const calm = () => motion.matches;
const scrollBehavior = () => calm() ? "instant" : "smooth";
const dmLink = `https://ig.me/m/${CONFIG.instagram}`;
document.documentElement.classList.add("has-js");
/* ---------- Cabeçalho e barra de progresso ---------- */
const header = $(".site-header");
const progress = $(".scroll-progress span");
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    header.classList.toggle("is-scrolled", scrollY > 12);
    ticking = false;
  });
};
addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", onScroll);
onScroll();

/* ---------- Menu com área de toque e fechamento ao tocar fora ---------- */
const toggle = $(".nav-toggle");
const nav = $("#menu");
const backdrop = document.createElement("button");
backdrop.type = "button";
backdrop.className = "nav-backdrop";
backdrop.setAttribute("aria-label", "Fechar menu");
backdrop.tabIndex = -1;
backdrop.hidden = true;
document.body.append(backdrop);
const updateMenuSpace = () => header.style.setProperty("--menu-space", `${Math.max(120, innerHeight - header.getBoundingClientRect().bottom)}px`);
const setMenu = (open) => {
  if (open) updateMenuSpace();
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("is-open", open);
  backdrop.hidden = !open;
};
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
$$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
backdrop.addEventListener("click", () => { setMenu(false); toggle.focus({ preventScroll: true }); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });
document.addEventListener("focusin", (e) => { if (e.target !== backdrop && !header.contains(e.target)) setMenu(false); });
matchMedia("(min-width:1100px)").addEventListener("change", () => setMenu(false));

/* ---------- Números que contam ao aparecer ---------- */
const fmt = (n, decimals) => n.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const prefix = el.dataset.prefix || "";
  const final = prefix + fmt(target, decimals);
  if (calm()) { el.textContent = final; return; }
  const start = performance.now();
  const dur = target > 100 ? 1600 : 1100;
  const step = (now) => {
    if (calm()) { el.textContent = final; return; }
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = prefix + fmt(target * eased, decimals);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = final;
  };
  requestAnimationFrame(step);
}

/* ---------- Seções: destaque no menu, barra fixa e entradas ---------- */
const dock = $("#dock");
if ("IntersectionObserver" in window) {
  const navLinks = $$('#menu ul a[href^="#"]');
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((l) => l.setAttribute("aria-current", String(l.getAttribute("href") === `#${entry.target.id}`)));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => spy.observe(s));

  const hideDock = new Set();
  const dockWatch = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? hideDock.add(e.target.id) : hideDock.delete(e.target.id)));
    dock.classList.toggle("is-hidden", hideDock.size > 0);
  });
  ["inicio", "interesse"].forEach((id) => dockWatch.observe(document.getElementById(id)));

  const counters = new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    countUp(entry.target);
    obs.unobserve(entry.target);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counters.observe(el));

  const inks = new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-inked");
    obs.unobserve(entry.target);
  }), { threshold: 0.6 });
  $$(".section h2").forEach((h) => inks.observe(h));

  if (!calm()) {
    const groups = [
      [".formacao-banner, .section-head, .faq-head, .evolution > .eyebrow, .evolution > h2", 0],
      [".service-list li .service", 90],
      [".facts li", 80],
      [".mentor-copy > *", 70],
      [".mentor-steps li", 90],
      [".pilares li", 90],
      [".timeline li", 110],
      [".students-grid li", 100],
      [".agenda-info > *", 70],
      [".faq", 60],
      [".look-card, .brow-card, .education-card, .bridal-copy, .bridal-media", 120],
    ];
    const revealEls = [];
    groups.forEach(([sel, gap]) => $$(sel).forEach((el, i) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      el.style.setProperty("--delay", `${(i % 4) * gap}ms`);
      revealEls.push(el);
    }));
    $$(".mentor-photo img, .studio-photo").forEach((el) => { el.classList.add("img-reveal"); revealEls.push(el); });
    const reveal = new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    }), { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach((el) => reveal.observe(el));
    // Se a pessoa ativar "reduzir movimento" no meio da visita, tudo aparece na hora.
    motion.addEventListener("change", () => { if (calm()) revealEls.forEach((el) => el.classList.add("is-visible")); });
  }
}


addEventListener("resize", updateMenuSpace);
document.addEventListener("click", e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false); });
/* ---------- Bastidores: arrastar com o mouse quando a faixa rola ---------- */
const students = $(".students-grid");
let drag = null;
let suppressClick = false;
students.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse" || e.button !== 0 || students.scrollWidth <= students.clientWidth + 1) return;
  drag = { x: e.clientX, left: students.scrollLeft, id: e.pointerId, moved: false };
});
students.addEventListener("pointermove", (e) => {
  if (!drag) return;
  if (Math.abs(e.clientX - drag.x) > 8) {
    drag.moved = true;
    students.setPointerCapture(drag.id);
    students.style.scrollSnapType = "none";
    students.scrollLeft = drag.left - (e.clientX - drag.x);
  }
});
const endDrag = () => {
  if (!drag) return;
  if (drag.moved) { suppressClick = true; setTimeout(() => (suppressClick = false), 250); }
  if (students.hasPointerCapture(drag.id)) students.releasePointerCapture(drag.id);
  students.style.scrollSnapType = "";
  drag = null;
};
["pointerup", "pointercancel", "lostpointercapture"].forEach((t) => students.addEventListener(t, endDrag));
students.addEventListener("click", (e) => { if (suppressClick) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
students.addEventListener("keydown", (e) => {
  const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (!dir || students.scrollWidth <= students.clientWidth + 1) return;
  e.preventDefault();
  students.scrollBy({ left: dir * (students.firstElementChild.offsetWidth + 16), behavior: scrollBehavior() });
});

/* ---------- Fotos ampliadas: diálogo nativo ---------- */
const photoDialog = $("#photo-dialog");
let photoTrigger = null;
$$(".photo-open").forEach((button) => button.addEventListener("click", () => {
  photoTrigger = button;
  $("#photo-expanded").src = button.dataset.photo;
  $("#photo-expanded").alt = button.querySelector("img").alt;
  $("#photo-caption").textContent = button.dataset.caption;
  photoDialog.showModal();
}));
$(".photo-close").addEventListener("click", () => photoDialog.close());
photoDialog.addEventListener("click", (e) => {
  if (e.target !== photoDialog) return;
  const b = photoDialog.getBoundingClientRect();
  if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) photoDialog.close();
});
photoDialog.addEventListener("close", () => photoTrigger?.focus({ preventScroll: true }));

/* Portfólio: produções distintas, sem comparação de antes e depois. */
const LOOKS = [
  { src: 'assets/img/portfolio-pele-luminosa.webp', width: 1080, height: 1440, alt: 'Mulher com maquiagem em tons neutros e pele luminosa; imagem de portfólio', title: 'Luz e suavidade', text: 'Uma produção em tons neutros, com atenção à pele e ao acabamento.' },
  { src: 'assets/img/portfolio-expressao.webp', width: 1080, height: 720, alt: 'Retrato de mulher com maquiagem de olhos marcada e lábios em tom nude; portfólio', title: 'Expressão em foco', text: 'Contrastes, tons e um olhar que participa da identidade da produção.' },
  { src: 'assets/img/portfolio-acabamento.webp', width: 1000, height: 1333, alt: 'Cliente ou modelo recebendo os detalhes finais de uma maquiagem; portfólio', title: 'O cuidado no acabamento', text: 'Detalhes de uma maquiagem em andamento. Cada produção tem seu próprio contexto.' },
];
const lookViewer = $('#look-viewer');
const lookTabs = $$('.look-tabs [role=tab]');
function setLook(index, focus = false) {
  const look = LOOKS[index];
  const button = $('.photo-open', lookViewer);
  const img = $('img', button);
  img.src = look.src; img.alt = look.alt; img.width = look.width; img.height = look.height;
  button.dataset.photo = look.src;
  button.dataset.caption = look.title + ' · Portfólio de maquiagem';
  button.setAttribute('aria-label', 'Ampliar foto: ' + look.title);
  $('#look-title').textContent = look.title;
  $('#look-text').textContent = look.text;
  lookViewer.setAttribute('aria-labelledby', lookTabs[index].id);
  lookTabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  if (focus) lookTabs[index].focus();
  const caption = $('.look-caption');
  caption.classList.remove('is-changing');
  void caption.offsetWidth;
  caption.classList.add('is-changing');
}
lookTabs.forEach((tab, i) => {
  tab.addEventListener('click', () => setLook(i));
  tab.addEventListener('keydown', e => {
    let target = null;
    if (e.key === 'ArrowRight') target = (i + 1) % lookTabs.length;
    if (e.key === 'ArrowLeft') target = (i - 1 + lookTabs.length) % lookTabs.length;
    if (e.key === 'Home') target = 0;
    if (e.key === 'End') target = lookTabs.length - 1;
    if (target !== null) { e.preventDefault(); setLook(target, true); }
  });
});

/* Faixa decorativa com controle explícito. */
const ribbon = $('.ribbon');
$('.ribbon-toggle').addEventListener('click', e => {
  const paused = ribbon.classList.toggle('is-paused');
  const button = e.currentTarget;
  button.setAttribute('aria-pressed', String(paused));
  button.setAttribute('aria-label', paused ? 'Retomar animação da faixa' : 'Pausar animação da faixa');
  $('use', button).setAttribute('href', paused ? '#i-play' : '#i-pause');
});

/* Contato: os links públicos distinguem atendimento e cursos. Não há número inventado. */
const form = $('#form-contato');
const interesse = $('#momento');
const status = $('#form-status');
const courseInterests = new Set(['Formação profissional', 'Automake sem Mistério']);
const destinationFor = interest => (courseInterests.has(interest) ? CONFIG.whatsappCourses : CONFIG.whatsappBooking) || dmLink;
$$('.js-contact').forEach(a => {
  a.href = (a.dataset.contact === 'courses' ? CONFIG.whatsappCourses : CONFIG.whatsappBooking) || dmLink;
});
const errors = {
  nome: value => value.trim().length >= 2 ? '' : 'Digite seu nome para começar a conversa.',
  whatsapp: value => { const digits = value.replace(/\D/g, ''); return !digits || digits.length >= 10 && digits.length <= 11 ? '' : 'Confira o número com DDD ou deixe o campo vazio.'; },
  interesse: value => value ? '' : 'Escolha o que você procura.',
};
function clearError(input) { input.removeAttribute('aria-invalid'); const node = $(`#${input.id}-erro`); if (node) node.textContent = ''; }
function validate(input) { const error = errors[input.name]?.(input.value) || ''; if (error) { input.setAttribute('aria-invalid', 'true'); $(`#${input.id}-erro`).textContent = error; } else clearError(input); return !error; }
Object.keys(errors).forEach(name => {
  const input = form.elements[name];
  input.addEventListener('blur', () => input.value && validate(input));
  ['input', 'change'].forEach(type => input.addEventListener(type, () => input.hasAttribute('aria-invalid') && validate(input)));
});
$('#whatsapp').addEventListener('input', e => {
  const digits = e.target.value.replace(/\D/g, '').slice(0,11);
  e.target.value = digits.length > 6 ? `(${digits.slice(0,2)}) ${digits.slice(2,-4)}-${digits.slice(-4)}` : digits.length > 2 ? `(${digits.slice(0,2)}) ${digits.slice(2)}` : digits;
});
$$('[data-interesse]').forEach(link => link.addEventListener('click', () => {
  interesse.value = link.dataset.interesse;
  clearError(interesse);
  $$('.service.is-picked').forEach(el => el.classList.remove('is-picked'));
  if (link.matches('.service')) link.classList.add('is-picked');
  interesse.classList.remove('is-filled'); void interesse.offsetWidth; interesse.classList.add('is-filled');
  status.textContent = 'Interesse selecionado: ' + link.dataset.interesse + '. Complete seu nome para continuar.';
}));
form.addEventListener('submit', e => {
  e.preventDefault(); status.textContent = '';
  const invalid = Object.keys(errors).map(name => form.elements[name]).filter(input => !validate(input));
  if (invalid.length) { invalid[0].focus(); return; }
  const fields = form.elements;
  const lines = ['Oi, Letícia! Vim pelo seu site.', '', 'Nome: ' + fields.nome.value.trim(), 'Interesse: ' + fields.interesse.value];
  if (fields.whatsapp.value) lines.push('WhatsApp: ' + fields.whatsapp.value);
  if (fields.cidade.value.trim()) lines.push('Cidade: ' + fields.cidade.value.trim());
  if (fields.detalhes.value.trim()) lines.push('Sobre meu momento: ' + fields.detalhes.value.trim());
  $('#mensagem-pronta').value = lines.join('\n');
  $('#message-preview').hidden = false;
  if (!$('#copiar-mensagem')) {
    const copy = document.createElement('button'); copy.type = 'button'; copy.id = 'copiar-mensagem'; copy.className = 'btn btn-copy'; copy.textContent = 'Copiar mensagem';
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText($('#mensagem-pronta').value); status.textContent = 'Mensagem copiada. Cole e envie na conversa.'; }
      catch { $('#mensagem-pronta').focus(); $('#mensagem-pronta').select(); status.textContent = 'Mensagem selecionada. Copie e cole na conversa.'; }
    });
    $('#message-preview').append(copy);
  }
  window.open(destinationFor(fields.interesse.value), '_blank', 'noopener');
  status.textContent = 'Contato de ' + (courseInterests.has(fields.interesse.value) ? 'cursos' : 'agendamentos') + ' aberto. Copie a mensagem abaixo, revise e envie no WhatsApp.';
});
$('#ano').textContent = new Date().getFullYear();

/* ---------- Movimentos da abertura e respostas ao toque ---------- */
(() => {
  const running = new Set();
  const play = (el, frames, opts) => {
    if (!el || calm() || !el.animate) return null;
    const a = el.animate(frames, opts);
    running.add(a);
    a.finished.catch(() => {}).finally(() => running.delete(a));
    return a;
  };
  motion.addEventListener("change", () => { if (calm()) [...running].forEach((a) => a.cancel()); });

  $$(".hero-copy > *").forEach((el, i) => play(el,
    [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "none" }],
    { duration: 900, delay: 150 + i * 90, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
  play($(".hero-photo"), [{ opacity: 0, scale: "1.025" }, { opacity: 1, scale: "1" }], { duration: 1800, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
  play($(".hero-photo-frame .signature"), [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 1500, delay: 900, easing: "ease-in-out", fill: "backwards" });
  play($(".hero-badge"), [{ opacity: 0, translate: "0 14px" }, { opacity: 1, translate: "0 0" }], { duration: 900, delay: 700, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });

  // Foto do estúdio acompanha a rolagem de leve (só no computador, sem cortar a imagem).
  const studio = $(".studio-photo");
  const wide = matchMedia("(min-width:900px)");
  let raf = false;
  const drift = () => {
    raf = false;
    if (calm() || !wide.matches) { studio.style.translate = ""; return; }
    const r = studio.getBoundingClientRect();
    const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    studio.style.translate = `0 ${Math.max(-1, Math.min(1, p)) * -22}px`;
  };
  addEventListener("scroll", () => { if (!raf) { raf = true; requestAnimationFrame(drift); } }, { passive: true });
  drift();
  motion.addEventListener("change", drift);
  wide.addEventListener("change", drift);

  // Retorno visual em toques concluídos (rolar a página não dispara o efeito).
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".btn,.service,.photo-open,.look-tabs button");
    if (!target || target.disabled || calm()) return;
    play(target, [{ scale: "1" }, { scale: ".975", offset: 0.35 }, { scale: "1" }], { duration: 320, easing: "ease-out" });
    if (!target.matches(".btn")) return;
    target.querySelector(".motion-ripple")?.remove();
    const ripple = document.createElement("span");
    const b = target.getBoundingClientRect();
    ripple.className = "motion-ripple";
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.left = `${e.detail ? e.clientX - b.left : b.width / 2}px`;
    ripple.style.top = `${e.detail ? e.clientY - b.top : b.height / 2}px`;
    target.append(ripple);
    const fx = play(ripple, [{ opacity: 0.2, scale: "0" }, { opacity: 0, scale: "3" }], { duration: 650, easing: "ease-out" });
    if (fx) fx.finished.catch(() => {}).finally(() => ripple.remove());
    else ripple.remove();
  }, { passive: true });

  $$(".faq").forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) play(d.querySelector("p"), [{ opacity: 0, translate: "0 -8px" }, { opacity: 1, translate: "0 0" }], { duration: 380, easing: "ease-out" });
  }));
})();
