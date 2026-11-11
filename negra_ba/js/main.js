/* =========================================================
   Negra Ba — interações do site (JavaScript puro)
   Para mudar contatos ou o destino do formulário, edite só CONFIG.
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
const hasWa = () => Boolean(CONFIG.whatsapp || CONFIG.whatsappLink);
const waLink = (msg) => (CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}` : CONFIG.whatsappLink);
document.documentElement.classList.add("has-js");

/* ---------- Cabeçalho e menu ---------- */
const topbar = $(".top"), toggle = $(".menu-btn"), nav = $("#menu");
addEventListener("scroll", () => topbar.classList.toggle("is-scrolled", scrollY > 8), { passive: true });
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("is-open", open);
};
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
$$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });
document.addEventListener("click", (e) => { if (nav.classList.contains("is-open") && !topbar.contains(e.target)) setMenu(false); });

/* ---------- Números, entradas e barra fixa ---------- */
function countUp(el) {
  const target = parseFloat(el.dataset.count), dec = Number(el.dataset.decimals || 0), pre = el.dataset.prefix || "";
  const fmt = (n) => pre + n.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  if (calm()) { el.textContent = fmt(target); return; }
  const t0 = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - t0) / 1200);
    el.textContent = fmt(target * (1 - Math.pow(1 - t, 4)));
    if (t < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
  };
  requestAnimationFrame(step);
}
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((es, o) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-in");
    if (e.target.dataset.count) countUp(e.target);
    o.unobserve(e.target);
  }), { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
  $$(".section > *, .service, .claws li, .talks li, .steps li, .faq").forEach((el, i) => {
    el.classList.add("reveal");
    if (el.matches(".service, .claws li, .talks li, .steps li, .faq")) el.style.setProperty("--d", `${(i % 5) * 70}ms`);
    io.observe(el);
  });
  $$("[data-count]").forEach((el) => io.observe(el));
  const dock = $("#dock"), hide = new Set();
  const dw = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? hide.add(e.target) : hide.delete(e.target))); dock.classList.toggle("is-hidden", hide.size > 0); });
  [$("#inicio"), $("#interesse")].forEach((el) => dw.observe(el));
}

/* ---------- Fotos ampliadas ---------- */
const dialog = $("#photo-dialog");
let trigger = null;
$$(".zoom").forEach((b) => b.addEventListener("click", () => {
  trigger = b;
  $("#photo-big").src = b.dataset.photo;
  $("#photo-big").alt = $("img", b).alt;
  $("#photo-cap").textContent = b.dataset.caption || "";
  dialog.showModal();
}));
$(".photo-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => trigger?.focus({ preventScroll: true }));

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
