/* =========================================================
   Amanda Marins — interações do site (JavaScript puro)
   Para mudar o destino do formulário, edite só CONFIG.
   ========================================================= */
const CONFIG = {
  // WhatsApp de "Agendamentos" do perfil (@amanda.marinscf). DDI + DDD + número, só dígitos.
  whatsapp: "5522997442750",
  // Opcional: URL de um webhook (n8n, Formspree, Google Apps Script...).
  // Se preenchido, o formulário envia os dados para lá em vez de abrir o WhatsApp.
  webhook: "",
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* ---------- Links de WhatsApp com mensagem pronta ---------- */
$$(".js-whatsapp").forEach((a) => {
  a.href = waLink(a.dataset.msg || "Oi, Amanda! Vim pelo site.");
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
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("is-open", open);
};
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
$$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});

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

  const revealEls = $$(".section-head, .card, .metodo-copy, .steps li, .metodo-photo, .sobre-photo, .sobre-copy, .resultados-head, .gallery, .contato-photo, .contato-card");
  revealEls.forEach((el) => el.classList.add("reveal"));
  const reveal = new IntersectionObserver(
    (entries, obs) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => reveal.observe(el));
}

/* ---------- Galeria: setas ---------- */
const track = $("#galeria");
const prev = $(".gallery-btn.prev");
const next = $(".gallery-btn.next");
const updateArrows = () => {
  prev.disabled = track.scrollLeft < 8;
  next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
};
const step = () => Math.max(track.clientWidth * 0.6, 240);
prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
next.addEventListener("click", () => track.scrollBy({ left: step() }));
track.addEventListener("scroll", updateArrows, { passive: true });
window.addEventListener("resize", updateArrows);
window.addEventListener("load", updateArrows);
updateArrows();

/* ---------- Cards e botões que já marcam o interesse no formulário ---------- */
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
    '<svg aria-hidden="true"><use href="#i-lock"/></svg> Seus dados vão só para a Amanda e não são compartilhados.';
}
const submitLabel = submitBtn.innerHTML;

/* Máscara: (22) 99999-9999 */
fone.addEventListener("input", () => {
  const d = fone.value.replace(/\D/g, "").slice(0, 11);
  let out = d;
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 6) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  fone.value = out;
});

const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Amanda saber com quem fala."),
  whatsapp: (v) => {
    const d = v.replace(/\D/g, "");
    return d.length >= 10 && d.length <= 11 ? "" : "Digite o WhatsApp com DDD. Ex.: (22) 99999-9999";
  },
  interesse: (v) => (v ? "" : "Escolha o que você procura. Se estiver em dúvida, marque “Outro assunto”."),
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
    interesse: f.interesse.value,
    quimica: f.quimica.value,
    mensagem: f.mensagem.value.trim(),
    origem: "site-amanda-marins",
  };

  /* Caminho 1: webhook (lista de interessadas) */
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
      status.style.color = "";
      status.textContent = "Recebido! A Amanda vai chamar você no WhatsApp em breve.";
    } catch {
      status.style.color = "#b3261e";
      status.innerHTML = `Não deu para enviar agora. Tente de novo ou <a href="${waLink(
        "Oi, Amanda! Vim pelo site e quero agendar uma avaliação."
      )}" target="_blank" rel="noopener">fale direto no WhatsApp</a>.`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitLabel;
    }
    return;
  }

  /* Caminho 2 (padrão): monta a mensagem e abre o WhatsApp */
  const linhas = [
    "Oi, Amanda! Vim pelo site e quero agendar uma avaliação.",
    "",
    `*Nome:* ${dados.nome}`,
    `*WhatsApp:* ${dados.whatsapp}`,
    `*Procuro:* ${dados.interesse}`,
  ];
  if (dados.quimica) linhas.push(`*Química no cabelo:* ${dados.quimica}`);
  if (dados.mensagem) linhas.push("", dados.mensagem);
  window.open(waLink(linhas.join("\n")), "_blank", "noopener");
});

/* ---------- Ano automático no rodapé ---------- */
$("#ano").textContent = new Date().getFullYear();
