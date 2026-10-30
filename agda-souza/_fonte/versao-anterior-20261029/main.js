/* =========================================================
   Agda Souza — interações do site (JavaScript puro)
   Para mudar o destino do formulário, edite só CONFIG.
   ========================================================= */
const CONFIG = {
  // Número encontrado no link da bio do Instagram (wa.me/5511980674404).
  whatsappLink: "",
  whatsapp: "5511980674404",
  instagram: "agdaesmalteria",
  // Opcional: URL de um webhook (n8n, Formspree, Google Apps Script...).
  webhook: "",
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const scrollBehavior = () => motionPreference.matches ? "instant" : "smooth";
const hasWa = () => Boolean(CONFIG.whatsapp || CONFIG.whatsappLink);
const waLink = (msg) =>
  CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}` : CONFIG.whatsappLink;
const dmLink = `https://ig.me/m/${CONFIG.instagram}`;

/* ---------- WhatsApp: aparece se houver link ou número configurado; senão vira Instagram ---------- */
$$(".js-whatsapp").forEach(a => {
  a.hidden = false;
  a.href = hasWa() ? waLink(a.dataset.msg || "Oi, Agda! Vim pelo site e quero conhecer a formação em Nails.") : dmLink;
  a.target = "_blank"; a.rel = "noopener";
  const label = a.querySelector(".contact-label");
  if (label && hasWa()) label.textContent = "Falar no WhatsApp";
  a.querySelector("use")?.setAttribute("href", hasWa() ? "#i-whats" : "#i-insta");
});

/* ---------- Galeria: setas e arrastar com o mouse (no celular o dedo já desliza) ---------- */
const track = $("#galeria");
const wPrev = $("#works-prev");
const wNext = $("#works-next");
const cardStep = () => {
  const li = $("li", track);
  return track.children[1] ? track.children[1].getBoundingClientRect().left - track.children[0].getBoundingClientRect().left : track.clientWidth * 0.8;
};
const updateWorksArrows = () => {
  wPrev.disabled = track.scrollLeft < 8;
  wNext.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  const cards = [...track.children];
  const left = track.getBoundingClientRect().left;
  const index = cards.reduce((best, card, i) => Math.abs(card.getBoundingClientRect().left - left) < Math.abs(cards[best].getBoundingClientRect().left - left) ? i : best, 0);
  $("#works-position").textContent = `${index + 1} / ${cards.length}`;
};
wPrev.addEventListener("click", () => track.scrollBy({ left: -cardStep(), behavior: scrollBehavior() }));
wNext.addEventListener("click", () => track.scrollBy({ left: cardStep(), behavior: scrollBehavior() }));
track.addEventListener("scroll", updateWorksArrows, { passive: true });
window.addEventListener("resize", updateWorksArrows);
window.addEventListener("load", updateWorksArrows);
updateWorksArrows();
track.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") e.preventDefault();
  if (e.key === "ArrowRight") track.scrollBy({ left: cardStep(), behavior: scrollBehavior() });
  if (e.key === "ArrowLeft") track.scrollBy({ left: -cardStep(), behavior: scrollBehavior() });
});

let drag = null;
let suppressPhotoClick = false;
track.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse" || e.button !== 0) return;
  drag = { x: e.clientX, left: track.scrollLeft, id: e.pointerId, moved: false };
});
track.addEventListener("pointermove", (e) => {
  if (!drag) return;
  if (Math.abs(e.clientX - drag.x) > 8 && track.scrollWidth > track.clientWidth + 1) {
    drag.moved = true;
    track.classList.add("is-dragging");
    track.setPointerCapture(e.pointerId);
    track.scrollLeft = drag.left - (e.clientX - drag.x);
  }
});
const endDrag = () => {
  if (!drag) return;
  const moved = drag.moved;
  if (track.hasPointerCapture(drag.id)) track.releasePointerCapture(drag.id);
  drag = null;
  track.classList.remove("is-dragging");
  if (moved) {
    suppressPhotoClick = true;
    setTimeout(() => { suppressPhotoClick = false; }, 300);
    const s = cardStep();
    track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: scrollBehavior() });
  }
};
track.addEventListener("pointerup", endDrag);
track.addEventListener("pointercancel", endDrag);
track.addEventListener("lostpointercapture", endDrag);
document.addEventListener("pointerup", endDrag);
track.addEventListener("click", e => {
  if (suppressPhotoClick) { e.preventDefault(); e.stopImmediatePropagation(); suppressPhotoClick = false; }
}, true);

/* ---------- Menu com área de toque e fechamento ao tocar fora ---------- */
const header = $(".site-header");
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
$$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
backdrop.addEventListener("click", () => { setMenu(false); toggle.focus({ preventScroll: true }); });
document.addEventListener("click", e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false); });
document.addEventListener("focusin", e => { if (e.target !== backdrop && !header.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });
window.addEventListener("resize", updateMenuSpace);
window.addEventListener("scroll", updateMenuSpace, { passive: true });
matchMedia("(min-width:1100px)").addEventListener("change", () => setMenu(false));

/* ---------- Menu destaca a seção visível, barra fixa e animações ---------- */
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

  // A barra fixa some quando o início ou o formulário estão na tela
  const hideDock = new Set();
  const dockWatch = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? hideDock.add(e.target.id) : hideDock.delete(e.target.id)));
    dock.classList.toggle("is-hidden", hideDock.size > 0);
  });
  ["inicio", "interesse"].forEach((id) => dockWatch.observe(document.getElementById(id)));

  const revealEls = $$(".section-head, .formacao-banner, .service, .metodo-copy, .metodo-photo, .faq, .facts li, .pilares li, .agenda-info, .metodo-steps li, .community-grid li, .event-copy");
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--delay", `${(i % 3) * 110}ms`);
  });
  const reveal = new IntersectionObserver(
    (entries, obs) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!motionPreference.matches) entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }),
    { threshold: 0.08 }
  );
  revealEls.forEach((el) => reveal.observe(el));
}

/* ---------- Formação tocada já marca o formulário ---------- */
const interesse = $("#momento");
$$("[data-interesse]").forEach((link) =>
  link.addEventListener("click", () => {
    interesse.value = link.dataset.interesse;
    clearError(interesse);
    // Keep focus on the selected link; moving focus later can interrupt scrolling.
    status.textContent = "Tema selecionado. Complete seus dados para iniciar a conversa.";
  })
);

/* ---------- Formulário ---------- */
const form = $("#form-contato");
const fone = $("#whatsapp");
const status = $("#form-status");
const submitBtn = $("#btn-enviar");
const label = $("span", submitBtn);

function setSubmitLabel() {
  label.textContent = CONFIG.webhook ? "Receber informações" : hasWa() ? "Conversar pelo WhatsApp" : "Conversar pelo Instagram";
  submitBtn.querySelector("use").setAttribute("href", CONFIG.webhook ? "#i-arrow" : hasWa() ? "#i-whats" : "#i-insta");
  $("#nota-privacidade").textContent = CONFIG.webhook ? "Ao enviar, seus dados serão encaminhados à equipe da Agda para retorno sobre a formação." : `O site prepara sua mensagem e abre o ${hasWa() ? "WhatsApp" : "Instagram"}. Você revisa e envia na conversa. Os dados não ficam salvos aqui.`;
}
setSubmitLabel();

/* Máscara: (11) 98765-4321 */
fone.addEventListener("input", () => {
  const d = fone.value.replace(/\D/g, "").slice(0, 11);
  let out = d;
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 6) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  fone.value = out;
});

const rules = {
  nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome para a Agda saber com quem fala."),
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

/* Valida ao sair do campo; o erro some assim que a pessoa corrige */
Object.keys(rules).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => input.value && validate(input));
  input.addEventListener("input", () => input.hasAttribute("aria-invalid") && validate(input));
  input.addEventListener("change", () => input.hasAttribute("aria-invalid") && validate(input));
});

function montarMensagem(d) {
  const linhas = [
    "Oi, Agda! Vim pelo seu site e quero saber mais sobre a formação em Nails.",
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
    return;
  }

  const f = form.elements;
  const dados = {
    nome: f.nome.value.trim(),
    whatsapp: f.whatsapp.value,
    cidade: f.cidade.value.trim(),
    interesse: f.interesse.value,
    origem: "site-agda-souza",
  };

  /* Caminho 1: webhook (lista de interessados) */
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
      status.textContent = "Recebido! A Agda vai chamar você em breve.";
    } catch {
      status.style.color = "var(--error)";
      status.innerHTML = `Não deu para enviar agora. Tente de novo ou <a href="https://www.instagram.com/${CONFIG.instagram}/" target="_blank" rel="noopener">fale com ela no Instagram</a>.`;
    } finally {
      submitBtn.disabled = false;
      label.textContent = "Receber informações";
    }
    return;
  }

  const msg = montarMensagem(dados).replace(/\*/g, "");
  const destination = hasWa() ? waLink(msg) : dmLink;
  $("#message-preview").hidden = false;
  $("#mensagem-pronta").value = msg;
  // Open synchronously from the submit gesture; sending remains with the visitor.
  window.open(destination, "_blank", "noopener");
  status.textContent = hasWa() && CONFIG.whatsapp ? "Conversa aberta. Revise a mensagem e envie no WhatsApp." : "Conversa aberta. Copie a mensagem abaixo e cole no Instagram.";
  if (hasWa() && !CONFIG.whatsapp) status.textContent = "Conversa aberta. Copie a mensagem abaixo e cole no WhatsApp.";
});

/* ---------- Ano automático no rodapé ---------- */
$("#ano").textContent = new Date().getFullYear();

/* ---------- Fotos ampliadas: diálogo nativo com teclado e fechamento fora ---------- */
const photoDialog = $("#photo-dialog");
let photoTrigger = null;
$$(".photo-open").forEach(button => button.addEventListener("click", () => {
  photoTrigger = button;
  $("#photo-expanded").src = button.dataset.photo;
  $("#photo-expanded").alt = button.querySelector("img").alt;
  $("#photo-caption").textContent = button.dataset.caption;
  photoDialog.showModal();
}));
$(".photo-close").addEventListener("click", () => photoDialog.close());
photoDialog.addEventListener("click", event => {
  if (event.target === photoDialog) {
    const bounds = photoDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close();
  }
});
photoDialog.addEventListener("close", () => photoTrigger?.focus({ preventScroll: true }));

/* ---------- Entradas suaves, sem parallax que corte o retrato ---------- */
(() => {
  const running = new Set();
  const play = (element, frames, options) => {
    if (!element || motionPreference.matches || !element.animate) return;
    const animation = element.animate(frames, options);
    running.add(animation);
    animation.finished.catch(() => {}).finally(() => running.delete(animation));
    return animation;
  };
  motionPreference.addEventListener("change", () => { if (motionPreference.matches) [...running].forEach(a => a.cancel()); });
  document.querySelectorAll(".hero-copy > *").forEach((element, i) => play(element,
    [{ opacity: 0, transform: "translateY(34px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 1050, delay: i * 120, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
  play($(".hero-photo-frame"), [{ opacity: .15, translate: "0 24px" }, { opacity: 1, translate: "0 0" }], { duration: 1350, easing: "cubic-bezier(.16,1,.3,1)" });
  // Feedback on completed taps, so scrolling a card never triggers a ripple.
  const tapAnimations = new WeakMap();
  document.addEventListener("click", event => {
    if (motionPreference.matches) return;
    const target = event.target.closest(".btn,.service,.photo-open,.works-btn");
    if (!target || target.disabled) return;
    tapAnimations.get(target)?.cancel();
    const animation = play(target, [{ scale: "1" }, { scale: ".95", offset: .35 }, { scale: "1" }], { duration: 420, easing: "ease-out" });
    if (animation) tapAnimations.set(target, animation);
    if (!target.matches(".btn")) return;
    target.querySelector(".motion-ripple")?.remove();
    const ripple = document.createElement("span");
    const bounds = target.getBoundingClientRect();
    ripple.className = "motion-ripple";
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.left = `${event.detail ? event.clientX - bounds.left : bounds.width / 2}px`;
    ripple.style.top = `${event.detail ? event.clientY - bounds.top : bounds.height / 2}px`;
    target.append(ripple);
    const effect = play(ripple, [{ opacity: .27, scale: "0" }, { opacity: 0, scale: "3" }], { duration: 650, easing: "ease-out" });
    if (effect) effect.finished.catch(() => {}).finally(() => ripple.remove());
    else ripple.remove();
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    const photos = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in-view");
        play(entry.target.querySelector("img"), [{ opacity: .45 }, { opacity: 1 }], { duration: 1150, easing: "ease-out" });
        observer.unobserve(entry.target);
      });
    }, { threshold: .25 });
    document.querySelectorAll(".works-track li, .community-grid li").forEach(element => photos.observe(element));
  }

  document.querySelectorAll(".faq").forEach(details => details.addEventListener("toggle", () => {
    if (details.open) play(details.querySelector("p"), [{ opacity: 0, translate: "0 -8px" }, { opacity: 1, translate: "0 0" }], { duration: 350, easing: "ease-out" });
  }));

})();


/* Progresso de leitura, atualizado no máximo uma vez por quadro. */
(() => {
  const bar = document.createElement('div');
  bar.className = 'motion-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  let frame = 0;
  const update = () => {
    frame = 0;
    const available = document.documentElement.scrollHeight - innerHeight;
    const progress = available > 0 ? Math.max(0, Math.min(1, scrollY / available)) : 0;
    bar.style.transform = `scaleX(${progress})`;
  };
  const queue = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(update); };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else queue();
  });
  queue();
})();
