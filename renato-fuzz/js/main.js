/* Renato Fuzz / interações derivadas dos projetos anteriores, com conteúdo próprio. */
const $ = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const calm=()=>motion.matches;
const scrollBehavior=()=>calm()?'instant':'smooth';
document.documentElement.classList.add('has-js');
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
matchMedia("(min-width:1000px)").addEventListener("change", () => setMenu(false));

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
    if (calm()) { el.textContent = final; return; }
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
  ["inicio", "experiencias"].forEach((id) => dockWatch.observe(document.getElementById(id)));

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
      ['.section-head,.method-visual,.method-content,.look-card,.practice-story,.mentor-photo,.universe-heading,.feature-photo,.feature-copy,.community-copy,.community-collage,.youtube-heading,.video-main,.video-secondary,.channel-invite,.expert-strip', 90],
      ['.universe-path,.facts li,.students-grid li,.faq', 100],
      ['.mentor-copy > *,.final-cta > :not(.cta-word)',70],
    ];
    const revealEls = [];
    groups.forEach(([sel, gap]) => $$(sel).forEach((el, i) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      el.style.setProperty("--delay", `${(i % 4) * gap}ms`);
      revealEls.push(el);
    }));
    $$(".mentor-photo img").forEach((el) => { el.classList.add("img-reveal"); revealEls.push(el); });
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


addEventListener("resize", updateMenuSpace);
document.addEventListener("click", e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false); });
/* ---------- Bastidores: arrastar com o mouse quando a faixa rola ---------- */
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


/* Fundamentos: ilustrações esquemáticas, selecionadas pela pessoa. */
const METHODS=[
 {name:'Linha',kicker:'A base do desenho',title:'Onde a forma começa.',text:'O perímetro organiza o contorno e o peso. É a primeira decisão na construção do desenho.'},
 {name:'Graduação',kicker:'A construção do volume',title:'O peso encontra direção.',text:'A relação entre comprimentos constrói uma progressão. O volume passa a fazer parte da intenção do corte.'},
 {name:'Camadas',kicker:'A expressão do movimento',title:'Leveza que ganha forma.',text:'A sobreposição de comprimentos cria outras relações de peso, textura e movimento.'}
];
const methodTabs=$$('[data-method]');
function setMethod(index,focus=false){
 const item=METHODS[index];
 methodTabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1});
 $('#method-panel').setAttribute('aria-labelledby',methodTabs[index].id);
 $('#method-kicker').textContent=item.kicker;$('#method-title').textContent=item.title;$('#method-text').textContent=item.text;
 $('#diagram-name').textContent=item.name;$('.diagram-index').textContent=String(index+1).padStart(2,'0');
 $$('[data-diagram]').forEach((g,i)=>{g.toggleAttribute('hidden',i!==index);g.style.display=i===index?'':'none';g.classList.remove('is-drawing');if(i===index){void g.getBoundingClientRect();g.classList.add('is-drawing')}});
 const panel=$('#method-panel');panel.classList.remove('is-changing');void panel.offsetWidth;panel.classList.add('is-changing');
 if(focus)methodTabs[index].focus();
}
function wireTabs(tabs,set){tabs.forEach((t,i)=>{t.addEventListener('click',()=>set(i));t.addEventListener('keydown',e=>{let n=null;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==null){e.preventDefault();set(n,true)}})})}
wireTabs(methodTabs,setMethod);
const LOOKS=[
 {src:'assets/img/corte-textura.webp',width:1000,height:1279,alt:'Mulher com cabelo longo, ondas e mechas; imagem de portfólio',title:'Textura e contorno.',text:'Ondas e diferentes comprimentos revelam o desenho do cabelo.'},
 {src:'assets/img/corte-movimento.webp',width:1000,height:1333,alt:'Mulher de cabelo longo e castanho com movimento; imagem de portfólio',title:'Movimento e expressão.',text:'Uma outra produção, com comprimentos que acompanham a expressão do rosto.'}
];
const lookTabs=$$('[data-look]');
function setLook(index,focus=false){const l=LOOKS[index];const panel=$('#look-viewer');const btn=$('.photo-open',panel);const image=$('img',btn);image.src=l.src;image.alt=l.alt;image.width=l.width;image.height=l.height;btn.dataset.photo=l.src;btn.dataset.caption=l.title+' · Portfólio';btn.setAttribute('aria-label','Ampliar: '+l.title);$('#look-title').textContent=l.title;$('#look-text').textContent=l.text;$('.eyebrow',panel).textContent='PORTFÓLIO / 0'+(index+1);panel.setAttribute('aria-labelledby',lookTabs[index].id);lookTabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1});if(focus)lookTabs[index].focus()}
wireTabs(lookTabs,setLook);
$('.ribbon-toggle').addEventListener('click',e=>{const paused=$('.ribbon').classList.toggle('is-paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.setAttribute('aria-label',paused?'Retomar animação da faixa':'Pausar animação da faixa');$('use',e.currentTarget).setAttribute('href',paused?'#i-play':'#i-pause')});
$('#ano').textContent=new Date().getFullYear();
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
  play($(".hero-photo"), [{ opacity: 0, scale: "1.025" }, { opacity: 1, scale: "1" }], { duration: 1800, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
  play($(".hero-portrait figcaption"), [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 1500, delay: 900, easing: "ease-in-out", fill: "backwards" });
  play($(".hero-proof"), [{ opacity: 0, translate: "0 14px" }, { opacity: 1, translate: "0 0" }], { duration: 900, delay: 700, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });

  // Retorno visual em toques concluídos (rolar a página não dispara o efeito).
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".btn,.experience-card,.photo-open,.look-tabs button,.method-tabs button");
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
