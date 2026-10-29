/* =========================================================
   Cássia Lima — interações do site (JavaScript puro)
   Para mudar o destino do formulário, edite só CONFIG.
   ========================================================= */
const CONFIG = {
  // A Cássia não divulga WhatsApp direto na bio do Instagram (só o link maapp.com.br/cassialimamicro).
  // Preencha "whatsapp" com DDI + DDD + número (só dígitos) assim que ela passar o contato.
  // Enquanto estiver vazio, os botões e o formulário levam para o Instagram.
  whatsappLink: "",
  whatsapp: "", // ex.: "5511999999999"
  instagram: "cassialima.micro",
  // Opcional: URL de um webhook (n8n, Formspree, Google Apps Script...).
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
    a.href = waLink(a.dataset.msg || "Oi, Cássia! Vim pelo site.");
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

/* ---------- Labial: antes, logo após e cicatrizado ---------- */
const STAGES = [
  ["Antes", "O lábio ao natural, antes do procedimento."],
  ["Imediatamente após", "A cor sai mais intensa logo depois da aplicação."],
  ["Cicatrizado, sem retoque", "O tom assenta e fica natural depois da cicatrização."],
];
const viewer = $("#labial-viewer");
const tabs = $$(".lip-tabs [role=tab]");
const stageTitle = $("#lip-stage-title");
const stageText = $("#lip-stage-text");
const caption = $(".lip-caption");
const bar = $(".lip-progress span");
let autoTimer = null;
let autoAnim = null;
let userTookOver = false;
function setStage(i, { focus = false } = {}) {
  viewer.dataset.stage = String(i);
  viewer.setAttribute("aria-labelledby", tabs[i].id);
  tabs.forEach((t, k) => {
    t.setAttribute("aria-selected", String(k === i));
    t.tabIndex = k === i ? 0 : -1;
  });
  if (focus) tabs[i].focus();
  stageTitle.textContent = STAGES[i][0];
  stageText.textContent = STAGES[i][1];
  caption.classList.remove("is-changing");
  void caption.offsetWidth;
  caption.classList.add("is-changing");
}
function stopAuto() {
  userTookOver = true;
  clearTimeout(autoTimer);
  autoAnim?.cancel();
  viewer.classList.remove("is-autoplay");
}
function runAuto(i = 0) {
  // Uma volta automática quando a seção aparece; qualquer toque devolve o controle à pessoa.
  if (calm() || userTookOver) return;
  viewer.classList.add("is-autoplay");
  setStage(i);
  autoAnim = bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 2600, easing: "linear" });
  autoTimer = setTimeout(() => {
    if (i < STAGES.length - 1) return runAuto(i + 1);
    viewer.classList.remove("is-autoplay");
  }, 2600);
}
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => { stopAuto(); setStage(i); });
  tab.addEventListener("keydown", (e) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (e.key === "Home" || e.key === "End") { e.preventDefault(); stopAuto(); setStage(e.key === "Home" ? 0 : tabs.length - 1, { focus: true }); }
    if (!dir) return;
    e.preventDefault();
    stopAuto();
    setStage((i + dir + tabs.length) % tabs.length, { focus: true });
  });
});
viewer.addEventListener("pointerdown", stopAuto);
$(".lip-tabs").addEventListener("focusin", stopAuto);
if ("IntersectionObserver" in window) {
  new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    obs.disconnect();
    setTimeout(() => runAuto(0), 500);
  }), { threshold: 0.55 }).observe(viewer);
}

/* ---------- Alunas: arrastar com o mouse quando a faixa rola ---------- */
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
  stopAuto();
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

/* ---------- Curso tocado já marca o formulário ---------- */
const interesse = $("#momento");
const status = $("#form-status");
$$("[data-interesse]").forEach((link) => link.addEventListener("click", () => {
  interesse.value = link.dataset.interesse;
  clearError(interesse);
  $$(".service.is-picked").forEach((s) => s.classList.remove("is-picked"));
  link.classList.add("is-picked");
  interesse.classList.remove("is-filled");
  void interesse.offsetWidth;
  interesse.classList.add("is-filled");
  status.textContent = `Você escolheu ${link.dataset.interesse}. Complete seus dados para iniciar a conversa.`;
}));

/* ---------- Formulário ---------- */
const form = $("#form-contato");
const fone = $("#whatsapp");
const submitBtn = $("#btn-enviar");
const label = $("span", submitBtn);

function setSubmitLabel() {
  label.textContent = CONFIG.webhook ? "Receber informações" : hasWa() ? "Conversar pelo WhatsApp" : "Conversar pelo Instagram";
  $("use", submitBtn).setAttribute("href", CONFIG.webhook ? "#i-arrow" : hasWa() ? "#i-whats" : "#i-insta");
  $("#nota-privacidade").textContent = CONFIG.webhook
    ? "Ao enviar, seus dados vão para a equipe da Cássia, para retorno sobre a formação."
    : `O site prepara sua mensagem e abre o ${hasWa() ? "WhatsApp" : "Instagram"}. Você revisa e envia no aplicativo. Nada fica salvo aqui.`;
}
setSubmitLabel();

fone.addEventListener("input", () => {
  const d = fone.value.replace(/\D/g, "").slice(0, 11);
  let out = d;
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 6) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  fone.value = out;
});

const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Cássia saber com quem fala."),
  whatsapp: (v) => {
    const d = v.replace(/\D/g, "");
    return d.length >= 10 && d.length <= 11 ? "" : "Digite o WhatsApp com DDD. Ex.: (11) 98765-4321";
  },
  interesse: (v) => (v ? "" : "Escolha uma opção. Se estiver em dúvida, marque “Outro assunto”."),
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
Object.keys(rules).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => input.value && validate(input));
  input.addEventListener("input", () => input.hasAttribute("aria-invalid") && validate(input));
  input.addEventListener("change", () => input.hasAttribute("aria-invalid") && validate(input));
});

function montarMensagem(d) {
  const linhas = [
    "Oi, Cássia! Vim pelo seu site e quero saber mais sobre a Formação em Micropigmentação.",
    "",
    `*Nome:* ${d.nome}`,
    `*WhatsApp:* ${d.whatsapp}`,
    `*Principal interesse:* ${d.interesse}`,
  ];
  if (d.cidade) linhas.push(`*Cidade:* ${d.cidade}`);
  return linhas.join("\n");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "";
  status.style.color = "";
  const invalid = Object.keys(rules).map((n) => form.elements[n]).filter((i) => !validate(i));
  if (invalid.length) {
    invalid[0].focus();
    if (!calm()) form.animate([{ translate: "0 0" }, { translate: "-6px 0" }, { translate: "5px 0" }, { translate: "-3px 0" }, { translate: "0 0" }], { duration: 380, easing: "ease-out" });
    return;
  }
  const f = form.elements;
  const dados = {
    nome: f.nome.value.trim(),
    whatsapp: f.whatsapp.value,
    cidade: f.cidade.value.trim(),
    interesse: f.interesse.value,
    origem: "site-cassia-lima",
  };

  if (CONFIG.webhook) {
    submitBtn.disabled = true;
    label.textContent = "Enviando…";
    try {
      const r = await fetch(CONFIG.webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      status.textContent = "Recebido! A equipe da Cássia vai chamar você em breve.";
    } catch {
      status.style.color = "#9b4a3e";
      status.innerHTML = `Não deu para enviar agora. Tente de novo ou <a href="https://www.instagram.com/${CONFIG.instagram}/" target="_blank" rel="noopener">fale com ela no Instagram</a>.`;
    } finally {
      submitBtn.disabled = false;
      label.textContent = "Receber informações";
    }
    return;
  }

  const msg = montarMensagem(dados);
  $("#message-preview").hidden = false;
  $("#mensagem-pronta").value = msg.replace(/\*/g, "");
  window.open(hasWa() ? waLink(msg) : dmLink, "_blank", "noopener");
  status.textContent = CONFIG.whatsapp
    ? "Conversa aberta. Revise a mensagem e envie no WhatsApp."
    : `Conversa aberta. Copie a mensagem abaixo e cole no ${hasWa() ? "WhatsApp" : "Instagram"}.`;
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
