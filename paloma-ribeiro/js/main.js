/* =========================================================
   Paloma Ribeiro · Academy Class — interações do site (JavaScript puro)
   Para mudar contatos ou destino do formulário, edite só CONFIG.
   ========================================================= */
const CONFIG = {
  whatsapp: "556299477740", // o mesmo número dos cards do site atual dela (academyclassestetica.com.br/bioinsta)
  instagram: "palomaribeiroacademy",
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
  $$(".section > *, .course, .stage-grid li, .work-grid li, .faq").forEach((el, i) => {
    el.classList.add("reveal");
    if (el.matches(".course, .stage-grid li, .work-grid li, .faq")) el.style.setProperty("--d", `${(i % 4) * 80}ms`);
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

/* Catálogo: filtro por área e busca por nome */
const cards = $$(".course"), filtros = $$("[data-filter]"), busca = $("#busca"), conta = $("#conta"), vazio = $("#vazio");
const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
let area = "todos";
function filtrar() {
  const q = norm(busca.value.trim());
  let n = 0;
  cards.forEach((c) => {
    const ok = (area === "todos" || c.dataset.cat === area) && (!q || norm(c.dataset.nome).includes(q));
    c.hidden = !ok;
    if (ok) { n++; c.classList.add("is-in"); }
  });
  conta.textContent = n === 1 ? "1 curso" : `${n} cursos`;
  vazio.hidden = n > 0;
}
filtros.forEach((b) => b.addEventListener("click", () => {
  area = b.dataset.filter;
  filtros.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  filtrar();
}));
busca.addEventListener("input", filtrar);
$$("[data-go-filter]").forEach((a) => a.addEventListener("click", () => {
  const b = filtros.find((x) => x.dataset.filter === a.dataset.goFilter);
  if (b) { busca.value = ""; b.click(); }
}));
filtrar();

/* Curso tocado já marca o formulário */
const form = $("#form-contato"), interesse = $("#interesse"), status = $("#form-status");
$$("[data-interesse]").forEach((a) => a.addEventListener("click", () => {
  interesse.value = a.dataset.interesse;
  clearError(interesse);
  interesse.classList.remove("is-filled"); void interesse.offsetWidth; interesse.classList.add("is-filled");
  status.textContent = `Você escolheu “${a.dataset.interesse}”. Complete seus dados para a Paloma te responder.`;
}));

/* Formulário */
const fone = $("#whatsapp"), btn = $("#btn-enviar"), label = $("span", btn);
const digits = (v) => { let d = (v || "").replace(/\D/g, ""); if (d.startsWith("55") && d.length > 11) d = d.slice(2); if (d.startsWith("0") && d.length > 10) d = d.slice(1); return d.slice(0, 11); };
const mask = (v) => { const d = digits(v); if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`; if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`; return d; };
fone.addEventListener("input", () => { fone.value = mask(fone.value); });
const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Paloma saber com quem fala."),
  whatsapp: (v) => (digits(v).length >= 10 ? "" : "Digite o WhatsApp com DDD. Ex.: (62) 98765-4321"),
  interesse: (v) => (v ? "" : "Escolha uma opção. Na dúvida, marque “Ainda não sei”."),
};
function showError(i, m) { i.setAttribute("aria-invalid", "true"); $(`#${i.id}-erro`).textContent = m; }
function clearError(i) { i.removeAttribute("aria-invalid"); $(`#${i.id}-erro`).textContent = ""; }
function validate(i) { const m = rules[i.name](i.value); m ? showError(i, m) : clearError(i); return !m; }
Object.keys(rules).forEach((n) => { const i = form.elements[n]; ["input", "change"].forEach((t) => i.addEventListener(t, () => i.hasAttribute("aria-invalid") && validate(i))); });

const destino = () => (CONFIG.webhook ? "webhook" : hasWa() ? "WhatsApp" : "Instagram");
label.textContent = CONFIG.webhook ? "Quero receber informações" : `Conversar pelo ${destino()}`;
$("#nota").textContent = CONFIG.webhook
  ? "Ao enviar, seus dados vão para a equipe da Paloma, para retorno sobre os cursos."
  : `O site prepara sua mensagem e abre o ${destino()}. Você revisa e envia por lá. Nada fica salvo aqui.`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "";
  const bad = Object.keys(rules).map((n) => form.elements[n]).filter((i) => !validate(i));
  if (bad.length) { bad[0].focus(); return; }
  const f = form.elements;
  const d = { nome: f.nome.value.trim(), whatsapp: mask(f.whatsapp.value), cidade: f.cidade.value.trim(), interesse: f.interesse.value, origem: "site-paloma-ribeiro" };
  if (CONFIG.webhook) {
    btn.disabled = true;
    try {
      const r = await fetch(CONFIG.webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      status.textContent = "Recebido! A equipe da Paloma vai chamar você em breve.";
    } catch {
      status.innerHTML = `Não deu para enviar agora. Tente de novo ou <a href="${dmLink}" target="_blank" rel="noopener">fale com ela no Instagram</a>.`;
    } finally { btn.disabled = false; }
    return;
  }
  const linhas = ["Olá, Paloma! Vim pelo seu site e quero saber mais sobre os cursos.", "", `*Nome:* ${d.nome}`, `*WhatsApp:* ${d.whatsapp}`, `*Interesse:* ${d.interesse}`];
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
    status.innerHTML = `${copiou ? "Mensagem copiada." : "Copie a mensagem abaixo."} Cole no <a href="${dmLink}" target="_blank" rel="noopener">direct da Paloma</a> e envie.`;
  }
});
$("#ano").textContent = new Date().getFullYear();
