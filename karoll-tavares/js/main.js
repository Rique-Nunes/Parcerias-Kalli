/* =========================================================
   Karoll Tavares — interações do site (JavaScript puro)
   Para trocar o número do WhatsApp, edite só CONFIG abaixo.
   ========================================================= */
const CONFIG = {
  whatsapp: "5521987312196", // DDI + DDD + número, só dígitos
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const waLink = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* ---------- Links de WhatsApp com mensagem pronta ---------- */
$$(".js-whatsapp").forEach((a) => {
  a.href = waLink(a.dataset.msg || "Oi, Karoll! Vim pelo site.");
  a.target = "_blank";
  a.rel = "noopener";
});

/* ---------- Cabeçalho: sombra ao rolar ---------- */
const header = $(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Menu mobile ---------- */
const toggle = $(".nav-toggle");
const nav = $("#menu");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const updateMenuSpace = () => header.style.setProperty("--menu-space", `${Math.max(120, window.innerHeight - header.getBoundingClientRect().bottom)}px`);
window.addEventListener("resize", updateMenuSpace);
window.addEventListener("scroll", updateMenuSpace, { passive: true });
const setMenu = (open) => {
  if (open) updateMenuSpace();
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("is-open", open);
};

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

document.addEventListener("click", (event) => { if (!header.contains(event.target)) setMenu(false); });
window.matchMedia("(min-width:1100px)").addEventListener("change", () => setMenu(false));

/* ---------- Destaca o item do menu da seção visível ---------- */
const sections = $$("main section[id]");
const navLinks = $$('#menu ul a[href^="#"]');
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) =>
          l.setAttribute("aria-current", String(l.getAttribute("href") === `#${entry.target.id}`))
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* Animação de entrada suave */
  const revealEls = $$(".card, .section-head, .about-copy, .space-copy, .space-photo, .students-main, .students > img, .quotes blockquote, .signup-copy, .form, .faq details");
  revealEls.forEach((el) => el.classList.add("reveal"));
  $$(".card-grid, .service-list, .cards").forEach(grid => {
    [...grid.children].forEach((el, index) => {
      const target = el.matches(".reveal") ? el : el.querySelector(".reveal");
      target?.style.setProperty("--reveal-delay", `${index % 4 * 60}ms`);
    });
  });
  const reveal = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!reducedMotion.matches) entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  revealEls.forEach((el) => reveal.observe(el));
}

/* ---------- "Quero esse curso" já seleciona o curso no formulário ---------- */
const cursoSelect = $("#curso");
$$(".js-curso").forEach((link) =>
  link.addEventListener("click", () => {
    cursoSelect.value = link.dataset.curso;
    clearError(cursoSelect);
    setTimeout(() => $("#nome").focus({ preventScroll: true }), 600);
  })
);

/* ---------- Formulário → WhatsApp ---------- */
const form = $("#form-inscricao");
const fone = $("#whatsapp");

/* Máscara simples: (21) 98765-4321 */
fone.addEventListener("input", () => {
  const d = fone.value.replace(/\D/g, "").slice(0, 11);
  let out = d;
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  fone.value = out;
});

const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Karoll saber com quem fala."),
  whatsapp: (v) => {
    const d = v.replace(/\D/g, "");
    return d.length >= 10 && d.length <= 11 ? "" : "Digite o WhatsApp com DDD. Ex.: (21) 98765-4321";
  },
  curso: (v) => (v ? "" : "Escolha um curso. Se estiver em dúvida, marque “Ainda não sei”."),
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

/* Valida ao sair do campo; limpa o erro assim que a pessoa corrige */
Object.keys(rules).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => input.value && validate(input));
  input.addEventListener("input", () => input.hasAttribute("aria-invalid") && validate(input));
  input.addEventListener("change", () => input.hasAttribute("aria-invalid") && validate(input));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const invalid = Object.keys(rules)
    .map((name) => form.elements[name])
    .filter((input) => !validate(input));

  if (invalid.length) {
    invalid[0].focus();
    return;
  }

  const f = form.elements;
  const linhas = [
    "Oi, Karoll! Vim pelo site e quero me inscrever.",
    "",
    `*Nome:* ${f.nome.value.trim()}`,
    `*WhatsApp:* ${f.whatsapp.value}`,
    `*Curso:* ${f.curso.value}`,
    `*Momento:* ${f.experiencia.value}`,
  ];
  if (f.periodo.value) linhas.push(`*Melhor período:* ${f.periodo.value}`);
  if (f.mensagem.value.trim()) linhas.push("", f.mensagem.value.trim());

  window.open(waLink(linhas.join("\n")), "_blank", "noopener");
});

/* ---------- Ano automático no rodapé ---------- */
$("#ano").textContent = new Date().getFullYear();
