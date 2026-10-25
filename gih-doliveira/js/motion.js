/* Shared, dependency-free finishing touches for all four sites. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  const play = (element, frames, options) => {
    if (!element || preference.matches || !element.animate) return;
    const animation = element.animate(frames, options);
    running.add(animation);
    animation.finished.catch(() => {}).finally(() => running.delete(animation));
    return animation;
  };

  preference.addEventListener('change', () => {
    if (preference.matches) [...running].forEach(animation => animation.cancel());
  });

  // Introduce the portrait and copy in sequence without hiding content in CSS.
  play(document.querySelector('.hero-image'), [
    { opacity: .65, transform: 'scale(1.035)' },
    { opacity: 1, transform: 'scale(1)' }
  ], { duration: 1250, easing: 'cubic-bezier(.16,1,.3,1)' });
  document.querySelectorAll('.hero-copy > *').forEach((element, index) => {
    play(element, [
      { opacity: 0, transform: 'translateY(24px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 800, delay: 90 + index * 110, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
  });

  // Spread existing reveal groups slightly so cards arrive in a visible rhythm.
  document.querySelectorAll('.course-grid,.benefit-grid,.card-grid,.service-list,.cards,.trust,.trust-list,.about-facts,.courses-list,.quotes,.students').forEach(group => {
    [...group.children].forEach((item, index) => {
      const reveal = item.matches('.reveal') ? item : item.querySelector('.reveal');
      if (reveal) reveal.style.setProperty('--reveal-delay', `${index % 4 * 100}ms`);
    });
  });

  if ('IntersectionObserver' in window) {
    const photos = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        play(entry.target, [
          { opacity: .65, scale: '1.025' },
          { opacity: 1, scale: '1' }
        ], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)' });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('.method-photo img,.metodo-photo img,.sobre-photo img,.about-photo img,.space-photo img,.contact-photo img,.contato-photo img,.hero-figure picture img').forEach(image => photos.observe(image));

    // Each visible gallery photo receives a brief entrance, including on swipes.
    document.querySelectorAll('.gallery-track').forEach(track => {
      const slides = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const image = entry.target.querySelector('img');
          play(image, [{ opacity: .55 }, { opacity: 1 }], { duration: 650, easing: 'ease-out' });
          observer.unobserve(entry.target);
        });
      }, { root: track, threshold: .6 });
      [...track.children].forEach(slide => slides.observe(slide));
    });
  }

  document.addEventListener('pointerdown', event => {
    if (preference.matches || !event.isPrimary || event.button !== 0) return;
    const target = event.target.closest('.btn,.course-card,.service-card,.card,.gallery-btn');
    if (!target || target.disabled) return;
    play(target, [{ scale: '1' }, { scale: '.975', offset: .35 }, { scale: '1' }], { duration: 300, easing: 'ease-out' });
    if (!target.matches('.btn') || !target.animate) return;
    // A single ripple is enough even when someone taps repeatedly.
    target.querySelector('.motion-ripple')?.remove();
    const ripple = document.createElement('span');
    const bounds = target.getBoundingClientRect();
    ripple.className = 'motion-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.left = `${event.clientX - bounds.left}px`;
    ripple.style.top = `${event.clientY - bounds.top}px`;
    target.append(ripple);
    const animation = play(ripple, [{ opacity: .2, scale: '0' }, { opacity: 0, scale: '3' }], { duration: 600, easing: 'ease-out' });
    if (animation) animation.finished.catch(() => {}).finally(() => ripple.remove());
    else ripple.remove();
  }, { passive: true });

  // Opening an answer keeps a soft transition without changing native details.
  document.querySelectorAll('details').forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) play(details.querySelector('p'), [
        { opacity: 0, transform: 'translateY(-6px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 300, easing: 'ease-out' });
    });
  });
})();
