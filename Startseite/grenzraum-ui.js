/* CHASKI Grenzraum: navigation, service journey and transparent tariff estimate. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  const euros = (cents) => money.format(cents / 100);
  const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));
  const animateResult = (element) => {
    if (!element || reducedMotion.matches || !window.gsap) return;
    element.style.opacity = '0.72';
    window.gsap.to(element, { opacity: 1, duration: 0.18, ease: 'power2.out', overwrite: true });
  };

  const dialog = $('#nav-dialog');
  const navOpen = $('#nav-open');
  const navClose = $('#nav-close');
  if (dialog && navOpen && typeof dialog.showModal === 'function') {
    const setNavState = (open) => {
      navOpen.setAttribute('aria-expanded', String(open));
      navOpen.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    };
    navOpen.addEventListener('click', () => {
      if (dialog.open) dialog.close();
      else dialog.showModal();
      setNavState(dialog.open);
    });
    navClose?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => setNavState(false));
    dialog.addEventListener('cancel', () => setNavState(false));
    dialog.addEventListener('click', (event) => {
      if (event.target.closest('a[href]')) dialog.close();
      else if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
      }
    });
    setNavState(false);
  }

  const workbench = $('#preise');
  const tabs = $$('[data-workbench-mode]');
  const panels = { journey: $('#journey-panel'), price: $('#price-panel') };
  const journeyButtons = $$('[data-journey-step]');
  const stepTitle = $('#step-title');
  const stepText = $('#step-text');
  const stepNote = $('#step-note');
  const stepLink = $('#step-link');
  const linkArrow = stepLink?.querySelector('svg')?.cloneNode(true) || (() => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#i-up');
    svg.append(use);
    return svg;
  })();
  if (stepText) {
    stepText.setAttribute('aria-live', 'polite');
    stepText.setAttribute('aria-atomic', 'true');
  }
  const signupUrl = document.body.dataset.signupUrl || stepLink?.dataset.signupUrl || stepLink?.getAttribute('href');
  let activeStep = 0;
  let activeMode = 'journey';
  const steps = [
    {
      title: 'Du bestellst online.',
      text: 'Du wohnst in der Schweiz? Registriere dich kostenlos und bestätige deine E-Mail-Adresse. Danach nutzt du deine CHASKI-Lieferadresse mit deiner Kundennummer beim Einkauf.',
      note: 'Die Lieferadresse ist keine Rechnungsadresse.',
      link: 'Kostenlos registrieren',
      href: signupUrl,
    },
    {
      title: 'Wir nehmen deine Sendung an.',
      text: 'Wir nehmen deinen Einkauf in Konstanz entgegen. Sobald du unsere Eingangsbestätigung erhältst, ist deine Sendung bei uns zur Abholung bereit.',
      note: 'Warte auf unsere Bestätigung. Die Zustellmeldung des Paketdienstes genügt noch nicht. Normale Pakete lagern wir 30 Kalendertage ab Erhalt unserer Eingangsbestätigung ohne Lagerzuschlag.',
      link: 'Fragen zur Paketannahme',
      href: 'https://lieferadresse-konstanz.ch/faq-deutsche-lieferadresse/',
    },
    {
      title: 'Du holst deinen Einkauf ab.',
      text: 'Komm während unserer Ladenzeiten vorbei: Montag bis Freitag von 16 bis 19 Uhr, Samstag von 10 bis 13 Uhr. Click & Collect nutzt du nach einer separaten Freischaltung.',
      note: 'Alle Details zur Abholung findest du weiter unten.',
      link: 'Abholung planen',
      href: '#abholung',
    },
  ];
  const selectStep = (index, announce = true) => {
    if (!Number.isInteger(index) || !steps[index]) return;
    activeStep = index;
    const step = steps[index];
    journeyButtons.forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.journeyStep) === index)));
    if (stepTitle) stepTitle.textContent = step.title;
    if (stepText) stepText.textContent = step.text;
    if (stepNote) stepNote.textContent = step.note;
    if (stepLink) {
      stepLink.replaceChildren(document.createTextNode(step.link), linkArrow.cloneNode(true));
      if (step.href) stepLink.setAttribute('href', step.href);
    }
    if (workbench) workbench.dataset.step = String(index);
    if (announce) emit('chaski:journey', { step: index });
  };
  journeyButtons.forEach((button) => button.addEventListener('click', () => selectStep(Number(button.dataset.journeyStep))));
  const selectMode = (mode, { focus = false, scroll = false } = {}) => {
    if (!panels[mode]) return;
    const changed = activeMode !== mode;
    activeMode = mode;
    tabs.forEach((button) => {
      const selected = button.dataset.workbenchMode === mode;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', String(selected));
      button.setAttribute('tabindex', selected ? '0' : '-1');
      button.setAttribute('aria-controls', `${button.dataset.workbenchMode}-panel`);
      if (selected && focus) button.focus();
    });
    Object.entries(panels).forEach(([name, panel]) => { if (panel) panel.hidden = name !== mode; });
    if (workbench) workbench.dataset.mode = mode;
    emit('chaski:journey', { step: mode === 'price' ? 1 : activeStep });
    emit('chaski:mode', { mode });
    if (changed) animateResult(panels[mode]);
    if (scroll) workbench?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  };
  tabs.forEach((button, index) => {
    button.addEventListener('click', () => selectMode(button.dataset.workbenchMode));
    button.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectMode(tabs[next].dataset.workbenchMode, { focus: true });
    });
  });
  $$('[data-open-price]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    selectMode('price', { scroll: true });
  }));
  selectStep(0, false);
  selectMode(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true')?.dataset.workbenchMode || 'journey');

  const form = $('#gr-price-form');
  if (!form) return;
  const fields = {
    type: $('#gr-type'), length: $('#gr-length'), width: $('#gr-width'), height: $('#gr-height'),
    count: $('#gr-count'), days: $('#gr-days'),
  };
  const dimensions = $('#gr-dimensions');
  const priceCaption = $('.scene-caption .price-only');
  const dimensionalCaption = priceCaption?.textContent || 'Deine Maße verändern das Paket';
  const result = $('#gr-result');
  const outputs = {
    size: $('#gr-size'), unit: $('#gr-unit'), storage: $('#gr-storage'), total: $('#gr-total'), explanation: $('#gr-explanation'),
  };
  const setOutput = (key, value) => { if (outputs[key]) outputs[key].textContent = value; };
  const clearValidity = () => Object.values(fields).forEach((field) => field?.setCustomValidity(''));
  const dimensionFields = [fields.length, fields.width, fields.height];

  // Tenths of a centimetre and integer cents avoid floating-point tariff boundaries.
  const readDimension = (field) => {
    const value = field?.value.trim().replace(',', '.');
    if (!value || !/^\d+(?:\.\d)?$/.test(value)) {
      field?.setCustomValidity('Bitte gib ein Maß zwischen 0,1 und 1000 cm mit höchstens einer Nachkommastelle ein.');
      return null;
    }
    const [whole, decimal = '0'] = value.split('.');
    const tenths = Number(whole) * 10 + Number(decimal);
    if (tenths < 1 || tenths > 10000) {
      field.setCustomValidity('Bitte gib ein Maß zwischen 0,1 und 1000 cm ein.');
      return null;
    }
    return tenths;
  };
  const readInteger = (field, min, max, fallback, label) => {
    if (!field) return fallback;
    const value = field.value.trim();
    const number = Number(value);
    if (!/^\d+$/.test(value) || !Number.isInteger(number) || number < min || number > max) {
      field.setCustomValidity(`Bitte gib ${label} zwischen ${min} und ${max} ein.`);
      return null;
    }
    return number;
  };
  const tariff = (type, measures, count, days) => {
    let size;
    let unit;
    let freeDays;
    let dailyStorage;
    let description;
    if (type === 'letter') {
      size = 'Brief'; unit = 150; freeDays = 30;
      description = 'Briefannahme: 1,50 € je Brief. Ab dem 31. Kalendertag klären wir die Lagerkosten mit dir.';
      if (days > freeDays) return { size, unit, storage: null, total: null, description, inquiry: true };
      dailyStorage = 0;
    } else if (type === 'pallet') {
      size = 'Palette'; unit = 2500; freeDays = 14; dailyStorage = 500;
      description = 'Palette mit Grundfläche 120 × 80 cm: Annahme nur nach vorheriger Absprache. 14 Kalendertage ohne Lagerzuschlag, danach 5,00 € je Palette und Tag.';
    } else {
      const sorted = [...measures].sort((a, b) => b - a);
      if (type === 'parcel') {
        const sum = sorted[0] + sorted[2];
        const bands = [
          [350, 'XS', 300, 50], [500, 'S', 400, 50], [800, 'M', 500, 50],
          [1200, 'L', 700, 100], [1500, 'XL', 1000, 100], [2000, 'XXL', 1500, 100],
        ];
        const band = bands.find(([limit]) => sum <= limit);
        if (!band) return { size: 'Maße außerhalb der Pakettarife', unit: null, storage: null, total: null, inquiry: true, description: 'Längste plus kürzeste Seite sind größer als 200 cm. Bitte kläre Annahme und Preis vor deiner Bestellung mit uns. Für Sperrgut kannst du die passende Sendungsart auswählen.' };
        [, size, unit, dailyStorage] = band;
        freeDays = 30;
        description = `Größe ${size}: Längste plus kürzeste Seite ergeben ${(sum / 10).toLocaleString('de-DE')} cm. 30 Kalendertage ab Erhalt unserer Eingangsbestätigung ohne Lagerzuschlag. Danach ${euros(dailyStorage)} je Sendung und Tag.`;
      } else if (type === 'bulky') {
        const girth = sorted[0] + 2 * sorted[1] + 2 * sorted[2];
        if (girth > 5000) return { size: 'Sperrgut auf Anfrage', unit: null, storage: null, total: null, inquiry: true, description: 'Das Gurtmaß ist größer als 500 cm. Bitte kläre Annahme und Preis vor deiner Bestellung mit uns.' };
        size = girth <= 3500 ? 'Sperrgut bis 350 cm' : 'Sperrgut bis 500 cm';
        unit = girth <= 3500 ? 2000 : 2500;
        freeDays = 14; dailyStorage = 500;
        description = `Gurtmaß: ${(girth / 10).toLocaleString('de-DE')} cm (längste Seite plus zweimal die beiden anderen Seiten). 14 Kalendertage ohne Lagerzuschlag. Danach 5,00 € je Sendung und Tag.`;
      } else return null;
    }
    const storageDays = Math.max(0, days - freeDays);
    const storage = storageDays * dailyStorage;
    const noun = type === 'pallet' ? 'Paletten' : type === 'letter' ? 'Briefe' : 'gleich große Sendungen';
    const quantity = count > 1 ? ` Berechnet für ${count} ${noun}. Annahme und Lagerzuschlag werden jeweils je Sendung berechnet.` : ' Berechnet für eine Sendung.';
    return { size, unit, storage, total: (unit + storage) * count, inquiry: false, description: description + quantity };
  };
  const invalidResult = () => {
    setOutput('size', 'Eingaben prüfen');
    setOutput('unit', '—');
    setOutput('storage', '—');
    setOutput('total', '—');
    setOutput('explanation', 'Bitte prüfe die markierten Eingaben. Danach berechnen wir deine Kosten.');
    if (result) result.dataset.state = 'invalid';
  };
  const calculate = ({ report = false, animate = false } = {}) => {
    clearValidity();
    const type = fields.type?.value || 'parcel';
    const hasMeasures = type === 'parcel' || type === 'bulky';
    if (dimensions) dimensions.hidden = !hasMeasures;
    if (priceCaption) priceCaption.textContent = type === 'letter' ? 'Briefannahme bei CHASKI' : type === 'pallet' ? 'Europalette · nur nach vorheriger Absprache' : dimensionalCaption;
    dimensionFields.forEach((field) => {
      if (!field) return;
      field.disabled = !hasMeasures;
      field.required = hasMeasures;
    });
    const count = readInteger(fields.count, 1, 20, 1, 'eine Anzahl');
    const days = readInteger(fields.days, 1, 45, 10, 'eine Lagerdauer');
    const dayLabel = $('#gr-days-label');
    if (dayLabel && days !== null) dayLabel.textContent = `${days} ${days === 1 ? 'Tag' : 'Tage'}`;
    const measures = hasMeasures ? dimensionFields.map(readDimension) : [];
    const invalid = count === null || days === null || measures.includes(null) || !['parcel', 'bulky', 'letter', 'pallet'].includes(type);
    Object.values(fields).forEach((field) => { if (field) field.setAttribute('aria-invalid', String(!field.validity.valid)); });
    if (invalid) {
      invalidResult();
      if (report) {
        const invalidField = Object.values(fields).find((field) => field && !field.disabled && !field.validity.valid);
        const collapsedGroup = invalidField?.closest('details');
        if (collapsedGroup) collapsedGroup.open = true;
        form.reportValidity();
      }
      return;
    }
    const quote = tariff(type, measures, count, days);
    if (!quote) { invalidResult(); return; }
    setOutput('size', quote.size);
    setOutput('unit', quote.unit === null ? 'Auf Anfrage' : euros(quote.unit));
    setOutput('storage', quote.storage === null ? 'Auf Anfrage' : euros(quote.storage * count));
    setOutput('total', quote.total === null ? 'Auf Anfrage' : euros(quote.total));
    setOutput('explanation', quote.description);
    if (result) result.dataset.state = quote.inquiry ? 'inquiry' : 'ready';
    if (hasMeasures) emit('chaski:dimensions', { length: measures[0] / 10, width: measures[1] / 10, height: measures[2] / 10 });
    if (animate) animateResult(result);
  };
  form.addEventListener('input', () => calculate());
  form.addEventListener('change', () => calculate({ animate: true }));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculate({ report: true, animate: true });
  });
  form.noValidate = true;
  calculate();
})();