/* =========================================================
   Silvana Kosinski — interações do site (JavaScript puro)
   Para mudar contatos ou destino do formulário, edite só CONFIG.
   ========================================================= */
const CONFIG = {
  // O WhatsApp pessoal dela não é público (a bio leva a um linkr.bio). Preencha com DDI + DDD + número (só dígitos) quando ela passar;
  // enquanto estiver vazio, o formulário abre o direct do Instagram com a mensagem pronta para colar.
  whatsapp: "",
  instagram: "drasilvanakosinski",
  // Opcional: URL de um webhook (n8n, por exemplo) para receber os interessados direto.
  webhook: "",
};
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasWa = () => Boolean(CONFIG.whatsapp);
const dmLink = `https://ig.me/m/${CONFIG.instagram}`;
document.documentElement.classList.add("has-js");

/* Cabeçalho e menu */
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

/* Entradas e barra fixa */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); o.unobserve(e.target); } }), { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
  $$(".section > *, .course, .pillar, .stage, .feed li, .faq").forEach((el, i) => {
    el.classList.add("reveal");
    if (el.matches(".course, .pillar, .stage, .feed li, .faq")) el.style.setProperty("--d", `${(i % 4) * 80}ms`);
    io.observe(el);
  });
  const dock = $("#dock"), hide = new Set();
  const dw = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? hide.add(e.target) : hide.delete(e.target))); dock.classList.toggle("is-hidden", hide.size > 0); });
  [$("#inicio"), $("#contato")].forEach((el) => dw.observe(el));
}

/* Fotos ampliadas */
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

/* Curso tocado já marca o formulário */
const form = $("#form-contato"), interesse = $("#interesse"), status = $("#form-status");
$$("[data-interesse]").forEach((a) => a.addEventListener("click", () => {
  interesse.value = a.dataset.interesse;
  clearError(interesse);
  interesse.classList.remove("is-filled"); void interesse.offsetWidth; interesse.classList.add("is-filled");
  status.textContent = `Você escolheu “${a.dataset.interesse}”. Complete seus dados para a Dra. Silvana te responder.`;
}));

/* Formulário */
const fone = $("#whatsapp"), btn = $("#btn-enviar"), label = $("span", btn);
const digits = (v) => { let d = (v || "").replace(/\D/g, ""); if (d.startsWith("55") && d.length > 11) d = d.slice(2); if (d.startsWith("0") && d.length > 10) d = d.slice(1); return d.slice(0, 11); };
const mask = (v) => { const d = digits(v); if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`; if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`; return d; };
fone.addEventListener("input", () => { fone.value = mask(fone.value); });
const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Dra. Silvana saber com quem fala."),
  whatsapp: (v) => (digits(v).length >= 10 ? "" : "Digite o WhatsApp com DDD. Ex.: (98) 98765-4321"),
  interesse: (v) => (v ? "" : "Escolha uma opção. Na dúvida, marque “Ainda não sei”."),
};
function showError(i, m) { i.setAttribute("aria-invalid", "true"); $(`#${i.id}-erro`).textContent = m; }
function clearError(i) { i.removeAttribute("aria-invalid"); $(`#${i.id}-erro`).textContent = ""; }
function validate(i) { const m = rules[i.name](i.value); m ? showError(i, m) : clearError(i); return !m; }
Object.keys(rules).forEach((n) => { const i = form.elements[n]; ["input", "change"].forEach((t) => i.addEventListener(t, () => i.hasAttribute("aria-invalid") && validate(i))); });

const destino = () => (CONFIG.webhook ? "webhook" : hasWa() ? "WhatsApp" : "Instagram");
label.textContent = CONFIG.webhook ? "Quero receber informações" : `Conversar pelo ${destino()}`;
$("#nota").textContent = CONFIG.webhook
  ? "Ao enviar, seus dados vão para a equipe da Dra. Silvana, para retorno sobre as imersões e mentorias."
  : `O site prepara sua mensagem e abre o ${destino()}. Você revisa e envia por lá. Nada fica salvo aqui.`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "";
  const bad = Object.keys(rules).map((n) => form.elements[n]).filter((i) => !validate(i));
  if (bad.length) { bad[0].focus(); return; }
  const f = form.elements;
  const d = { nome: f.nome.value.trim(), whatsapp: mask(f.whatsapp.value), cidade: f.cidade.value.trim(), interesse: f.interesse.value, origem: "site-silvana-kosinski" };
  if (CONFIG.webhook) {
    btn.disabled = true;
    try {
      const r = await fetch(CONFIG.webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      status.textContent = "Recebido! A equipe da Dra. Silvana vai chamar você em breve.";
    } catch {
      status.innerHTML = `Não deu para enviar agora. Tente de novo ou <a href="${dmLink}" target="_blank" rel="noopener">fale com ela no Instagram</a>.`;
    } finally { btn.disabled = false; }
    return;
  }
  const linhas = ["Olá, Dra. Silvana! Vim pelo seu site e quero saber mais sobre as imersões e mentorias.", "", `*Nome:* ${d.nome}`, `*WhatsApp:* ${d.whatsapp}`, `*Interesse:* ${d.interesse}`];
  if (d.cidade) linhas.push(`*Cidade:* ${d.cidade}`);
  const msg = linhas.join("\n");
  const limpa = msg.replace(/\*/g, "");
  $("#preview").hidden = false;
  $("#mensagem").value = limpa;
  if (hasWa()) {
    const link = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(link, "_blank", "noopener");
    status.innerHTML = `Conversa aberta. Se não abriu, <a href="${link}" target="_blank" rel="noopener">clique aqui para abrir o WhatsApp</a>.`;
  } else {
    let copiou = false;
    try { await navigator.clipboard.writeText(limpa); copiou = true; } catch {}
    window.open(dmLink, "_blank", "noopener");
    status.innerHTML = `${copiou ? "Mensagem copiada." : "Copie a mensagem abaixo."} Cole no <a href="${dmLink}" target="_blank" rel="noopener">direct da Dra. Silvana</a> e envie.`;
  }
});
$("#ano").textContent = new Date().getFullYear();
