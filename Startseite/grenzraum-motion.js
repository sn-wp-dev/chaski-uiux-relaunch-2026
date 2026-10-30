/* Purposeful motion: brief entrance, two physical cards, readable word emphasis. */
(() => {
  'use strict';
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const wordsHost = document.querySelector('[data-scrub-text]');
  if (wordsHost) {
    const text = wordsHost.textContent.trim();
    const fragment = document.createDocumentFragment();
    text.split(/\s+/).forEach((word, index) => {
      if (index) fragment.append(' ');
      const span = document.createElement('span');
      span.className = 'scrub-word';
      span.textContent = word;
      fragment.append(span);
    });
    wordsHost.replaceChildren(fragment);
  }
  const media = gsap.matchMedia();
  media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 851px)' }, context => {
    if (!context.conditions.motion) return;
    const entrance = gsap.timeline({defaults:{ease:'power3.out'}});
    entrance.from('.hero-context', {y:10, opacity:0, duration:.55})
      .from('.hero-line', {y:20, opacity:0, duration:.85, stagger:.09}, .08)
      .from('.hero-copy,.hero-actions', {y:12, opacity:0, duration:.65, stagger:.08}, .24)
      .from('.workbench', {y:22, opacity:0, duration:.9}, .35);
    if (context.conditions.desktop) {
      const first = document.querySelector('.service-card-one');
      const second = document.querySelector('.service-card-two');
      if (first && second) gsap.to(first, {
        scale:.955, filter:'brightness(.90)', ease:'none',
        scrollTrigger:{trigger:second,start:'top 75%',end:'top 128px',scrub:.35}
      });
    }
    if (wordsHost) gsap.to(wordsHost.querySelectorAll('.scrub-word'), {
      color:'#174bf2', stagger:.035, ease:'none',
      scrollTrigger:{trigger:'.room-section',start:'top 75%',end:'bottom 65%',scrub:.45}
    });
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), {once:true});
  window.addEventListener('pagehide', () => media.revert(), {once:true});
})();
