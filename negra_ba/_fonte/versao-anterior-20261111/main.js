/* =========================================================
   Negra Ba — interações do site (JavaScript puro)
   Mesma base do site da Cássia Lima. Para mudar contatos ou o
   destino do formulário, edite só CONFIG.
   ========================================================= */
const CONFIG = {
  whatsappLink: "",
  whatsapp: "5511939098999", // DDI + DDD + número (só dígitos) — o mesmo da bio do Instagram
  instagram: "negra_ba",
  // O formulário do site grava direto no Google Forms da Negra Ba ("Inscreva-se", o link da bio).
  // Os códigos entry.* são os campos daquele formulário. Se ela editar as perguntas ou as opções
  // lá, é preciso atualizar aqui e os "value" das caixinhas no index.html (texto idêntico ao do Forms).
  googleForm: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLScBexre2wFpIAMJ0OteoUFXuuRehL9UfdiaWVVlQB9U1pPt0A/formResponse",
    original: "https://docs.google.com/forms/d/e/1FAIpQLScBexre2wFpIAMJ0OteoUFXuuRehL9UfdiaWVVlQB9U1pPt0A/viewform",
    campos: {
      nome: "entry.2005620554",
      email: "entry.1045781291",
      whatsapp: "entry.497653831",
      profissao: "entry.1354812307",
      domina: "entry.864069778",
      interesse: "entry.1773987104",
    },
  },
  // Opcional: URL de um webhook (n8n, por exemplo) para a Kalli receber uma cópia de cada inscrição.
  webhook: "",
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const calm = () => motion.matches;
const scrollBehavior = () => (calm() ? "instant" : "smooth");
const hasWa = () => Boolean(CONFIG.whatsapp || CONFIG.whatsappLink);
const waLink = (msg) =>
  CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}` : CONFIG.whatsappLink;
const dmLink = `https://ig.me/m/${CONFIG.instagram}`;
document.documentElement.classList.add("has-js");

/* ---------- WhatsApp: aparece se houver número; senão vira Instagram ---------- */
$$(".js-whatsapp").forEach((a) => {
  // O link do rodapé só aparece quando existe WhatsApp (o Instagram já tem link próprio ali).
  if (a.hasAttribute("data-only-whatsapp") && !hasWa()) return;
  a.hidden = false;
  if (hasWa()) {
    a.href = waLink(a.dataset.msg || "Oi, Negra Ba! Vim pelo seu site.");
  } else {
    a.href = dmLink;
    const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) walker.currentNode.textContent = walker.currentNode.textContent.replace("WhatsApp", "Instagram");
    a.querySelector('use[href="#i-whats"]')?.setAttribute("href", "#i-insta");
  }
  a.target = "_blank";
  a.rel = "noopener";
});

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
      [".talks-grid li", 110],
      [".agenda-info > *", 70],
      [".faq", 60],
      [".lip-card, .brow-card", 120],
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

/* ---------- Faixas de fotos: arrastar com o mouse quando a faixa rola ---------- */
$$(".students-grid").forEach((students) => {
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

/* ---------- Técnica tocada já marca o interesse no formulário ---------- */
const form = $("#form-contato");
const status = $("#form-status");
const grupos = { domina: $("#grupo-domina"), interesse: $("#grupo-interesse") };
const marcados = (name) => $$(`input[name="${name}"]:checked`, form).map((c) => c.value);
$$("[data-interesse]").forEach((link) => link.addEventListener("click", () => {
  const alvos = link.dataset.interesse.split("|");
  $$('input[name="interesse"]', form).forEach((c) => { if (alvos.includes(c.value)) c.checked = true; });
  validarGrupo("interesse");
  link.classList.add("is-picked");
  grupos.interesse.classList.remove("is-filled");
  void grupos.interesse.offsetWidth;
  grupos.interesse.classList.add("is-filled");
  status.style.color = "";
  status.textContent = `Marcamos ${link.dataset.label} nos seus interesses. Complete seus dados para entrar na lista.`;
}));

/* ---------- Formulário (lista de espera no Google Forms da Negra Ba) ---------- */
const fone = $("#whatsapp");
const submitBtn = $("#btn-enviar");
const label = $("span", submitBtn);
const LABEL_ENVIAR = label.textContent;

function limparTelefone(valor) {
  let raw = (valor || "").trim();
  if (raw.startsWith("+55") || raw.startsWith("+ 55")) raw = raw.replace(/^\+\s*55\s*/, "");
  else if (raw.startsWith("+")) raw = raw.slice(1);
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("0") && d.length > 10) d = d.slice(1);
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  return d.slice(0, 11);
}
function formatarTelefone(valor) {
  const d = limparTelefone(valor);
  let out = d;
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 6) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  return out;
}
const aplicarMascaraFone = () => { fone.value = formatarTelefone(fone.value); };
fone.addEventListener("input", aplicarMascaraFone);
fone.addEventListener("change", aplicarMascaraFone);
if (fone.value) aplicarMascaraFone();

const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Negra Ba saber com quem fala."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Digite um e-mail válido. Ex.: nome@email.com"),
  whatsapp: (v) => {
    const d = limparTelefone(v);
    return d.length >= 10 && d.length <= 11 ? "" : "Digite o WhatsApp com DDD. Ex.: (11) 98765-4321";
  },
  profissao: (v) => (v.trim().length >= 2 ? "" : "Conte sua profissão atual, mesmo que não seja na beleza."),
};
const groupRules = {
  domina: "Marque o que você já faz. Se está começando, marque “Nenhuma ainda”.",
  interesse: "Marque pelo menos uma técnica que você quer aprender.",
};
function showError(input, msg) {
  input.setAttribute("aria-invalid", "true");
  $(`#${input.id}-erro`).textContent = msg;
}
function clearError(input) {
  input.removeAttribute("aria-invalid");
  const el = $(`#${input.id}-erro`);
  if (el) el.textContent = "";
}
function validate(input) {
  const msg = rules[input.name]?.(input.value) ?? "";
  msg ? showError(input, msg) : clearError(input);
  return !msg;
}
function validarGrupo(name) {
  const ok = marcados(name).length > 0;
  ok ? clearError(grupos[name]) : showError(grupos[name], groupRules[name]);
  return ok;
}
Object.keys(rules).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => input.value && validate(input));
  input.addEventListener("input", () => input.hasAttribute("aria-invalid") && validate(input));
});
Object.keys(grupos).forEach((name) => grupos[name].addEventListener("change", (e) => {
  // "Nenhuma ainda" não combina com as outras: marcar uma desmarca a outra.
  if (name === "domina" && e.target.checked) {
    const nenhuma = e.target.hasAttribute("data-nenhuma");
    $$('input[name="domina"]', form).forEach((c) => { if (c !== e.target && c.hasAttribute("data-nenhuma") !== nenhuma) c.checked = false; });
  }
  if (grupos[name].hasAttribute("aria-invalid")) validarGrupo(name);
}));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "";
  status.style.color = "";
  const invalid = Object.keys(rules).map((n) => form.elements[n]).filter((i) => !validate(i));
  const gruposRuins = Object.keys(grupos).filter((n) => !validarGrupo(n));
  if (invalid.length || gruposRuins.length) {
    (invalid[0] || $("input", grupos[gruposRuins[0]])).focus();
    if (!calm()) form.animate([{ translate: "0 0" }, { translate: "-6px 0" }, { translate: "5px 0" }, { translate: "-3px 0" }, { translate: "0 0" }], { duration: 380, easing: "ease-out" });
    return;
  }
  const f = form.elements;
  const dados = {
    nome: f.nome.value.trim(),
    email: f.email.value.trim(),
    whatsapp: formatarTelefone(f.whatsapp.value),
    profissao: f.profissao.value.trim(),
    domina: marcados("domina"),
    interesse: marcados("interesse"),
    origem: "site-negra-ba",
  };
  const G = CONFIG.googleForm;
  const body = new URLSearchParams();
  ["nome", "email", "whatsapp", "profissao"].forEach((k) => body.append(G.campos[k], dados[k]));
  ["domina", "interesse"].forEach((k) => dados[k].forEach((v) => body.append(G.campos[k], v)));

  submitBtn.disabled = true;
  label.textContent = "Enviando…";
  try {
    // O Google Forms não devolve resposta legível para outro site ("no-cors"): só dá para saber se a rede falhou.
    await fetch(G.action, { method: "POST", mode: "no-cors", body });
    if (CONFIG.webhook) fetch(CONFIG.webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) }).catch(() => {});
    form.reset();
    $$(".service.is-picked").forEach((s) => s.classList.remove("is-picked"));
    const msg = `Oi, Negra Ba! Acabei de entrar na lista de espera pelo seu site. Meu nome é ${dados.nome}.`;
    status.innerHTML = `Pronto, ${dados.nome.split(" ")[0].replace(/[<>&"]/g, "")}! Seu nome está na lista de espera.` +
      (hasWa() ? ` Quer adiantar a conversa? <a href="${waLink(msg)}" target="_blank" rel="noopener">Chamar no WhatsApp</a>.` : "");
  } catch {
    status.style.color = "#b3361f";
    status.innerHTML = `Não deu para enviar agora. Tente de novo ou <a href="${G.original}" target="_blank" rel="noopener">preencha o formulário original</a>.`;
  } finally {
    submitBtn.disabled = false;
    label.textContent = LABEL_ENVIAR;
  }
});

$("#ano").textContent = new Date().getFullYear();

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
  play($(".hero-photo"), [{ opacity: 0, scale: "1.08" }, { opacity: 1, scale: "1" }], { duration: 1800, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
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

  // Retorno visual em toques concluídos (rolar a página não dispara o efeito).
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".btn,.service,.photo-open,.lip-tabs button");
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
