(() => {
  'use strict';
  const toggle = document.querySelector('[data-ui="menu-toggle"]');
  const navigation = document.querySelector('#main-navigation');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Navigation schließen' : 'Navigation öffnen');
    navigation.toggleAttribute('data-open', open);
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.hasAttribute('data-open')) { setMenu(false); toggle.focus(); }
  });

  // The prototype uses the exact limits and fees from the source tariff table.
  const length = document.getElementById('inp-l');
  const width = document.getElementById('inp-b');
  const height = document.getElementById('inp-h');
  const standard = document.getElementById('calc-mode-std');
  const bulky = document.getElementById('calc-mode-sp');
  let mode = 'standard';
  height.disabled = true;
  function updatePrice() {
    const values = [length, width, height].map(input => Number(input.value));
    const valid = (mode === 'standard' ? values.slice(0,2) : values).every(value => Number.isFinite(value) && value > 0);
    const price = document.getElementById('calc-result-price');
    const category = document.getElementById('calc-result-cat');
    if (!valid) {
      price.textContent = '–';
      category.textContent = 'Bitte gültige Maße eingeben';
      document.getElementById('calc-sum-val').textContent = '–';
      return;
    }
    const [l,b,h] = values;
    const size = mode === 'standard' ? l + b : l + 2*b + 2*h;
    document.getElementById('calc-sum-type').textContent = mode === 'standard' ? 'Gurtmaß: L + Kürzeste' : 'Gurtmaß: L + 2×B + 2×H';
    document.getElementById('calc-sum-val').textContent = new Intl.NumberFormat('de-DE',{maximumFractionDigits:1}).format(size) + ' cm';
    const tiers = mode === 'standard' ? [
      [35,'Paket XS (bis 35 cm)','3,00 €'],[50,'Paket S (36 – 50 cm)','4,00 €'],
      [80,'Paket M (51 – 80 cm)','5,00 €'],[120,'Paket L (81 – 120 cm)','7,00 €'],
      [150,'Paket XL (121 – 150 cm)','10,00 €'],[200,'Paket XXL (151 – 200 cm)','15,00 €']
    ] : [[350,'Sperrgut S (bis 350 cm)','20,00 €'],[500,'Sperrgut M (bis 500 cm)','25,00 €']];
    const tier = tiers.find(([limit]) => size <= limit);
    category.textContent = tier ? tier[1] : 'Spezial-Anfrage';
    price.textContent = tier ? tier[2] : 'auf Anfrage';
    const storage = document.querySelector('[data-ui="calc-benefits"] > span:first-child');
    if (storage) {
      const text = [...storage.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (text) text.textContent = mode === 'standard' ? ' 30 Tage freie Lagerzeit' : ' 14 Tage freie Lagerzeit';
    }
  }
  [length,width,height].forEach(input => input.addEventListener('input', updatePrice));
  [[standard,'standard'],[bulky,'bulky']].forEach(([button,newMode]) => {
    button.addEventListener('click', () => {
      mode = newMode;
      height.disabled = mode === 'standard';
      standard.setAttribute('aria-pressed',String(mode === 'standard'));
      bulky.setAttribute('aria-pressed',String(mode === 'bulky'));
      updatePrice();
    });
  });
  // Preserve the displayed source default. Recalculate only after interaction.

  const track = document.querySelector('[data-ui="reviews-track"]');
  const controls = [...document.querySelectorAll('[data-review-direction]')];
  function updateControls() {
    if (controls.length < 2) return;
    controls[0].disabled = track.scrollLeft <= 2;
    controls[1].disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  controls.forEach(button => button.addEventListener('click', () => {
    const card = track.firstElementChild;
    track.scrollBy({ left: Number(button.dataset.reviewDirection) * (card.getBoundingClientRect().width + 20),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));
  track.addEventListener('scroll', updateControls, { passive:true });
  window.addEventListener('resize', updateControls);
  updateControls();
})();
