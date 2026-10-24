/* =========================================================
   Gih D'Oliveira — interações do site (JavaScript puro)
   Para mudar o destino do formulário, edite só CONFIG.
   ========================================================= */
const CONFIG = {
  // Número do link da bio (keepo.bio). DDI + DDD + número, só dígitos.
  whatsapp: "5521980404676",
  // Opcional: URL de um webhook (n8n, Formspree, Google Apps Script...).
  // Se preenchido, o formulário envia os dados para lá em vez de abrir o WhatsApp.
  webhook: "",
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* ---------- Links de WhatsApp com mensagem pronta ---------- */
$$(".js-whatsapp").forEach((a) => {
  a.href = waLink(a.dataset.msg || "Oi, Gih! Vim pelo site.");
  a.target = "_blank";
  a.rel = "noopener";
});

/* ---------- Cabeçalho: borda ao rolar ---------- */
const header = $(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Menu mobile ---------- */
const toggle = $(".nav-toggle");
const nav = $("#menu");
const backdrop = document.createElement("button");
backdrop.type = "button";
backdrop.className = "nav-backdrop";
backdrop.setAttribute("aria-label", "Fechar menu");
backdrop.tabIndex = -1;
backdrop.hidden = true;
document.body.append(backdrop);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const updateMenuSpace = () => header.style.setProperty("--menu-space", `${Math.max(120, window.innerHeight - header.getBoundingClientRect().bottom)}px`);
window.addEventListener("resize", updateMenuSpace);
window.addEventListener("scroll", updateMenuSpace, { passive: true });
const setMenu = (open) => {
  if (open) updateMenuSpace();
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("is-open", open);
  backdrop.hidden = !open;
};

backdrop.addEventListener("click", () => {
  setMenu(false);
  toggle.focus({ preventScroll: true });
});

toggle.addEventListener("click", () =>
  setMenu(toggle.getAttribute("aria-expanded") !== "true")
);
$$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
});
document.addEventListener("focusin", (event) => {
  if (event.target !== backdrop && !header.contains(event.target)) setMenu(false);
});
window.matchMedia("(min-width:1100px)").addEventListener("change", () => setMenu(false));

/* ---------- Menu destaca a seção visível + animação de entrada ---------- */
if ("IntersectionObserver" in window) {
  const navLinks = $$('#menu ul a[href^="#"]');
  const spy = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) =>
          l.setAttribute("aria-current", String(l.getAttribute("href") === `#${entry.target.id}`))
        );
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => spy.observe(s));

  const revealEls = $$(".section-head, .course-card, .method-copy, .method-photo, .method-audience, .benefit-grid figure, .gallery, .contact-photo, .contact-content, .faq");
  $$(".course-grid, .benefit-grid").forEach((grid) => {
    [...grid.children].forEach((el, index) => el.style.setProperty("--reveal-delay", `${index * 70}ms`));
  });
  revealEls.forEach((el) => el.classList.add("reveal"));
  const reveal = new IntersectionObserver(
    (entries, obs) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!reducedMotion.matches) entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }),
    { threshold: 0.08 }
  );
  revealEls.forEach((el) => reveal.observe(el));
}

/* ---------- Galeria: setas ---------- */
const track = $("#galeria");
const prev = $(".gallery-btn.prev");
const next = $(".gallery-btn.next");
const galleryPosition = $("#gallery-position");
const updateArrows = () => {
  prev.disabled = track.scrollLeft < 8;
  next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  const cards = [...track.children];
  const left = track.getBoundingClientRect().left;
  const current = cards.reduce((best, card, index) =>
    Math.abs(card.getBoundingClientRect().left - left) < Math.abs(cards[best].getBoundingClientRect().left - left) ? index : best, 0);
  if (galleryPosition) galleryPosition.textContent = `${current + 1} / ${cards.length}`;
};
const step = () => track.children[1].getBoundingClientRect().left - track.children[0].getBoundingClientRect().left;
prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: reducedMotion.matches ? "instant" : "smooth" }));
next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: reducedMotion.matches ? "instant" : "smooth" }));
track.addEventListener("scroll", updateArrows, { passive: true });
window.addEventListener("resize", updateArrows);
window.addEventListener("load", updateArrows);
updateArrows();

/* ---------- Links de curso já marcam o interesse no formulário ---------- */
const interesse = $("#interesse");
$$("[data-interesse]").forEach((link) =>
  link.addEventListener("click", () => {
    interesse.value = link.dataset.interesse;
    clearError(interesse);
    setTimeout(() => $("#nome").focus({ preventScroll: true }), 600);
  })
);

/* ---------- Formulário ---------- */
const form = $("#form-contato");
const fone = $("#whatsapp");
const status = $("#form-status");
const submitBtn = form.querySelector('button[type="submit"]');

// Com webhook configurado, o botão não abre o WhatsApp: ajusta o texto.
if (CONFIG.webhook) {
  submitBtn.innerHTML = 'Enviar meus dados <svg aria-hidden="true"><use href="#i-arrow"/></svg>';
  $(".form-note").innerHTML =
    '<svg aria-hidden="true"><use href="#i-lock"/></svg> Seus dados vão só para a Gih e não são compartilhados.';
}

/* Máscara: (21) 98765-4321 */
fone.addEventListener("input", () => {
  const d = fone.value.replace(/\D/g, "").slice(0, 11);
  let out = d;
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 6) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  fone.value = out;
});

const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Gih saber com quem fala."),
  whatsapp: (v) => {
    const d = v.replace(/\D/g, "");
    return d.length >= 10 && d.length <= 11 ? "" : "Digite o WhatsApp com DDD. Ex.: (21) 98765-4321";
  },
  perfil: (v) => (v ? "" : "Escolha se você é dono, barbeiro ou outro profissional."),
  interesse: (v) => (v ? "" : "Escolha um curso. Se estiver em dúvida, marque “Ainda não sei”."),
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

/* Valida ao sair do campo; o erro some assim que a pessoa corrige */
Object.keys(rules).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => input.value && validate(input));
  input.addEventListener("input", () => input.hasAttribute("aria-invalid") && validate(input));
  input.addEventListener("change", () => input.hasAttribute("aria-invalid") && validate(input));
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "";
  const invalid = Object.keys(rules).map((n) => form.elements[n]).filter((i) => !validate(i));
  if (invalid.length) {
    invalid[0].focus();
    return;
  }

  const f = form.elements;
  const dados = {
    nome: f.nome.value.trim(),
    whatsapp: f.whatsapp.value,
    perfil: f.perfil.value,
    interesse: f.interesse.value,
    mensagem: f.mensagem.value.trim(),
    origem: "site-gih-doliveira",
  };

  /* Caminho 1: webhook (lista de interessados) */
  if (CONFIG.webhook) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";
    try {
      const r = await fetch(CONFIG.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      status.textContent = "Recebido! A Gih vai chamar você no WhatsApp em breve.";
    } catch {
      status.style.color = "#b3261e";
      status.innerHTML = `Não deu para enviar agora. Tente de novo ou <a href="${waLink(
        "Oi, Gih! Vim pelo site e quero saber mais sobre o MPE 360°."
      )}" target="_blank" rel="noopener">fale direto no WhatsApp</a>.`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar meus dados <svg aria-hidden="true"><use href="#i-arrow"/></svg>';
    }
    return;
  }

  /* Caminho 2 (padrão): monta a mensagem e abre o WhatsApp */
  const linhas = [
    "Oi, Gih! Vim pelo site e quero saber mais.",
    "",
    `*Nome:* ${dados.nome}`,
    `*WhatsApp:* ${dados.whatsapp}`,
    `*Sou:* ${dados.perfil}`,
    `*Interesse:* ${dados.interesse}`,
  ];
  if (dados.mensagem) linhas.push("", dados.mensagem);
  window.open(waLink(linhas.join("\n")), "_blank", "noopener");
});

/* ---------- Ano automático no rodapé ---------- */
$("#ano").textContent = new Date().getFullYear();
