/* =========================================================
   Ingrid Cristina — interações do site (JavaScript puro)
   Para mudar o destino do formulário, edite só CONFIG.
   ========================================================= */
const CONFIG = {
  // A Ingrid não divulga WhatsApp público na bio do Instagram (só o link do canva.site).
  // Preencha "whatsapp" com DDI + DDD + número (só dígitos) assim que ela passar o contato.
  whatsappLink: "",
  whatsapp: "", // ex.: "5562999999999"
  instagram: "lashempresaria",
  // Opcional: URL de um webhook (n8n, Formspree, Google Apps Script...).
  webhook: "",
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const hasWa = () => Boolean(CONFIG.whatsapp || CONFIG.whatsappLink);
const waLink = (msg) =>
  CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}` : CONFIG.whatsappLink;
const dmLink = `https://ig.me/m/${CONFIG.instagram}`;

$$(".js-whatsapp").forEach((a) => {
  if (hasWa()) {
    a.hidden = false;
    a.href = waLink(a.dataset.msg || "Oi! Vim pelo site.");
  } else {
    a.hidden = false;
    a.href = dmLink;
    a.textContent = a.textContent.replace("WhatsApp", "Instagram");
  }
  a.target = "_blank";
  a.rel = "noopener";
});

function dropIfBroken(img) {
  const holder = img.closest("li") || img.closest("[data-optional-block]");
  if (holder) holder.remove();
  else img.remove();
}
$$("img[data-optional]").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) dropIfBroken(img);
  else img.addEventListener("error", () => dropIfBroken(img), { once: true });
});

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

const dock = $("#dock");
if ("IntersectionObserver" in window) {
  const navLinks = $$('#menu ul a[href^="#"]');
  const spy = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
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

  const revealEls = $$(".section > h2, .section-lead, .service, .timeline li, .faq, .metodo-steps li, .facts li, .pilares li, .works-track li");
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 6) * 70}ms`;
  });
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

const interesse = $("#interesse");
$$("[data-interesse]").forEach((link) =>
  link.addEventListener("click", () => {
    interesse.value = link.dataset.interesse;
    clearError(interesse);
    setTimeout(() => $("#nome").focus({ preventScroll: true }), 700);
  })
);

const form = $("#form-contato");
const fone = $("#whatsapp");
const status = $("#form-status");
const submitBtn = $("#btn-enviar");
const label = $("span", submitBtn);

function setSubmitLabel() {
  if (CONFIG.webhook) {
    label.textContent = "Receber informações";
    $("#nota-privacidade").textContent = "Seus dados vão só para a Ingrid e não são compartilhados.";
  } else if (hasWa()) {
    label.textContent = "Enviar pelo WhatsApp";
  } else {
    label.textContent = "Enviar pelo Instagram";
  }
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
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Ingrid saber com quem fala."),
  whatsapp: (v) => {
    const d = v.replace(/\D/g, "");
    return d.length >= 10 && d.length <= 11 ? "" : "Digite o WhatsApp com DDD. Ex.: (62) 98765-4321";
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
    "Oi, Ingrid! Vim pelo seu site e quero saber mais sobre o Método Lash Empresária.",
    "",
    `*Nome:* ${d.nome}`,
    `*WhatsApp:* ${d.whatsapp}`,
    `*Momento profissional:* ${d.interesse}`,
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
    return;
  }

  const f = form.elements;
  const dados = {
    nome: f.nome.value.trim(),
    whatsapp: f.whatsapp.value,
    cidade: f.cidade.value.trim(),
    interesse: f.interesse.value,
    origem: "site-ingrid-cristina",
  };

  if (CONFIG.webhook) {
    submitBtn.disabled = true;
    label.textContent = "Enviando…";
    try {
      const r = await fetch(CONFIG.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      status.textContent = "Recebido! A Ingrid vai chamar você em breve.";
    } catch {
      status.style.color = "#f3a0b8";
      status.innerHTML = `Não deu para enviar agora. Tente de novo ou <a href="https://www.instagram.com/${CONFIG.instagram}/" target="_blank" rel="noopener">fale com ela no Instagram</a>.`;
    } finally {
      submitBtn.disabled = false;
      label.textContent = "Receber informações";
    }
    return;
  }

  const msg = montarMensagem(dados);

  if (hasWa()) {
    window.open(waLink(msg), "_blank", "noopener");
    if (!CONFIG.whatsapp) {
      try {
        await navigator.clipboard.writeText(msg.replace(/\*/g, ""));
        status.textContent = "Mensagem copiada! Cole na conversa com a Ingrid no WhatsApp.";
      } catch {
        status.textContent = "Na conversa do WhatsApp, escreva seu nome e o seu momento profissional.";
      }
    }
    return;
  }

  window.open(dmLink, "_blank", "noopener");
  try {
    await navigator.clipboard.writeText(msg.replace(/\*/g, ""));
    status.textContent = "Mensagem copiada! Cole na conversa com a Ingrid no Instagram.";
  } catch {
    status.textContent = "Na conversa do Instagram, escreva seu nome, WhatsApp e o seu momento profissional.";
  }
});

$("#ano").textContent = new Date().getFullYear();
