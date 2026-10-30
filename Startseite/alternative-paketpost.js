(() => {
  'use strict';

  const menuButton = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuButton && mobileNav) {
    const desktop = window.matchMedia('(min-width: 1001px)');

    const closeMenu = (restoreFocus = false) => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Menü öffnen');
      mobileNav.hidden = true;
      if (restoreFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Menü öffnen' : 'Menü schließen');
      mobileNav.hidden = isOpen;
    });

    mobileNav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });

    document.addEventListener('click', (event) => {
      if (menuButton.getAttribute('aria-expanded') !== 'true') return;
      if (event.target instanceof Node && !mobileNav.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });

    desktop.addEventListener('change', () => closeMenu());
    closeMenu();
  }

  const form = document.getElementById('parcel-form');
  const type = document.getElementById('parcel-type');
  const fields = document.getElementById('dimension-fields');
  const result = document.getElementById('parcel-result');
  const size = document.getElementById('parcel-size');
  const price = document.getElementById('parcel-price');
  const measure = document.getElementById('parcel-measure');
  const help = document.getElementById('parcel-help');
  const inputs = ['parcel-length', 'parcel-width', 'parcel-height'].map((id) => document.getElementById(id));

  if (!form || !type || !fields || !result || !size || !price || !measure || !help || inputs.some((input) => !input)) return;

  const money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  const number = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
  const estimateNote = 'Die endgültige Tarifzuordnung erfolgt bei uns vor Ort.';
  const parcelRates = [
    { limit: 35, label: 'XS', amount: 3 },
    { limit: 50, label: 'S', amount: 4 },
    { limit: 80, label: 'M', amount: 5 },
    { limit: 120, label: 'L', amount: 7 },
    { limit: 150, label: 'XL', amount: 10 },
    { limit: 200, label: 'XXL', amount: 15 },
  ];

  result.setAttribute('aria-live', 'polite');
  result.setAttribute('aria-atomic', 'true');

  inputs.forEach((input) => {
    input.min = '0.1';
    input.max = '1000';
    input.step = '0.1';
    input.required = true;
  });

  const show = (label, amount, measured, description, state = 'estimate') => {
    size.textContent = label;
    price.textContent = amount === null ? 'Auf Anfrage' : money.format(amount);
    measure.textContent = measured;
    help.textContent = description + ' ' + estimateNote;
    result.dataset.state = state;
  };

  const showInvalid = () => {
    size.textContent = 'Maße prüfen';
    price.textContent = '–';
    measure.textContent = 'Noch kein Preis berechnet';
    help.textContent = 'Bitte gib für jede Seite ein Maß zwischen 0,1 und 1.000 cm in Schritten von 0,1 cm ein.';
    result.dataset.state = 'invalid';
  };

  const getDimensions = () => {
    const dimensions = inputs.map((input) => input.valueAsNumber);
    const valid = inputs.every((input, index) => (
      input.validity.valid && Number.isFinite(dimensions[index]) && dimensions[index] > 0 && dimensions[index] <= 1000
    ));
    if (!valid) return null;
    return dimensions.sort((a, b) => a - b);
  };

  const updateFields = () => {
    const needsDimensions = type.value === 'parcel' || type.value === 'bulky';
    fields.hidden = !needsDimensions;
    fields.disabled = !needsDimensions;
    inputs.forEach((input) => { input.disabled = !needsDimensions; });
  };

  const calculate = () => {
    switch (type.value) {
      case 'letter':
        show('Brief', 1.5, 'Brieftarif', 'Für einen Brief.');
        return;
      case 'envelope':
        show('Briefumschlag', 3, 'Bis 35 cm · Maße manuell prüfen', 'Der Tarif gilt für Briefumschläge bis 35 cm. Bitte prüfe die Maße.');
        return;
      case 'pallet':
        show('Europalette', 25, 'Bis 120 × 80 cm', 'Der Tarif gilt für eine Europalette bis 120 × 80 cm. Größere Paletten auf Anfrage.');
        return;
      case 'parcel':
      case 'bulky': {
        const dimensions = getDimensions();
        if (!dimensions) {
          showInvalid();
          return;
        }

        const [shortest, middle, longest] = dimensions;
        // Integer tenths keep tariff boundaries exact for decimal centimetres.
        const shortestTenths = Math.round(shortest * 10);
        const middleTenths = Math.round(middle * 10);
        const longestTenths = Math.round(longest * 10);

        if (type.value === 'parcel') {
          const totalTenths = longestTenths + shortestTenths;
          const measured = number.format(totalTenths / 10) + ' cm · längste + kürzeste Seite';
          const rate = parcelRates.find((item) => totalTenths <= item.limit * 10);
          if (rate) {
            show('Paket ' + rate.label, rate.amount, measured, 'Preis nach längster und kürzester Seite.');
          } else {
            show('Paket über 200 cm', null, measured, 'Bitte frag den Tarif für diese Maße bei uns an.', 'inquiry');
          }
          return;
        }

        const girthTenths = longestTenths + 2 * middleTenths + 2 * shortestTenths;
        const measured = number.format(girthTenths / 10) + ' cm Gurtmaß';
        if (girthTenths <= 3500) {
          show('Sperrgut bis 350 cm', 20, measured, 'Gurtmaß: längste Seite + zweimal mittlere Seite + zweimal kürzeste Seite.');
        } else if (girthTenths <= 5000) {
          show('Sperrgut bis 500 cm', 25, measured, 'Gurtmaß: längste Seite + zweimal mittlere Seite + zweimal kürzeste Seite.');
        } else {
          show('Sperrgut über 500 cm', null, measured, 'Bitte frag den Tarif für diese Maße bei uns an.', 'inquiry');
        }
        return;
      }
      default:
        showInvalid();
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    updateFields();
    if (!form.reportValidity()) {
      showInvalid();
      return;
    }
    calculate();
  });

  // Invalid native submissions never reach the submit listener.
  form.addEventListener('invalid', showInvalid, true);
  type.addEventListener('change', () => {
    updateFields();
    calculate();
  });
  inputs.forEach((input) => input.addEventListener('input', calculate));

  updateFields();
  calculate();
})();

