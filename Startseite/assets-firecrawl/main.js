/* Local-only interactions. No registration, parcel or customer data is submitted. */
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  nav.classList.toggle('mobile-open', open);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('mobile-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Menü öffnen');
    document.querySelector('.nav-dropdown').open = false;
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const mobileWasOpen = nav.classList.contains('mobile-open');
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownWasOpen = dropdown.open;
    nav.classList.remove('mobile-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Menü öffnen');
    dropdown.open = false;
    if (mobileWasOpen) menu.focus();
    else if (dropdownWasOpen) dropdown.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-dropdown')) document.querySelector('.nav-dropdown').open = false;
});
const sampleAddress = 'CHASKI [Kundennummer]\nc/o [Vorname Nachname]\nAugust-Borsig-Straße 2A\n78467 Konstanz\nDeutschland';
document.querySelectorAll('[data-address]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-address]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  const output = document.querySelector('#address-output');
  output.replaceChildren();
  const lines = button.dataset.address === 'lines' ? sampleAddress.split('\n') : ['Firma: CHASKI [Kundennummer]', 'Name: c/o [Vorname Nachname]', 'Straße: August-Borsig-Straße 2A', 'PLZ / Ort: 78467 Konstanz', 'Land: Deutschland'];
  lines.forEach((line, index) => { if (index) output.append(document.createElement('br')); output.append(document.createTextNode(line)); });
}));
document.querySelector('.copy-button').addEventListener('click', async () => {
  const label = document.querySelector('.copy-button span');
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(sampleAddress);
    label.textContent = 'Muster kopiert';
    status.textContent = 'Das Adressmuster wurde kopiert. Ersetze die Platzhalter durch deine persönlichen Angaben.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#address-output'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    label.textContent = 'Text markiert';
    status.textContent = 'Bitte kopiere die markierte Adresse mit der Kopierfunktion deines Geräts.';
  }
});
const days = document.querySelector('.calendar-days');
for (let day = 1; day <= 35; day++) {
  const cell = document.createElement('i');
  cell.textContent = day <= 30 ? String(day).padStart(2, '0') : '·';
  days.append(cell);
}

const announcement = document.querySelector('.announcement');
try { announcement.hidden = sessionStorage.getItem('chaski-hide-collect-note') === '1'; } catch {}
document.querySelector('.announcement-close').addEventListener('click', () => {
  announcement.hidden = true;
  try { sessionStorage.setItem('chaski-hide-collect-note', '1'); } catch {}
});

const priceForm = document.querySelector('#price-form');
let priceMode = 'parcel';
function calculatePrice() {
  const result = document.querySelector('#price-result');
  const dimensions = ['length', 'width', 'height'].map(key => Number(document.querySelector('#measure-' + key).value));
  const count = Number(document.querySelector('#parcel-count').value);
  document.querySelectorAll('[data-tariff]').forEach(row => row.classList.remove('active'));
  if (dimensions.some(value => !Number.isFinite(value) || value <= 0 || value > 10000) || !Number.isInteger(count) || count < 1 || count > 100) {
    result.innerHTML = '<small>Bitte gib gültige Maße über 0 cm und eine ganze Anzahl von 1 bis 100 ein.</small>';
    return;
  }
  const sorted = [...dimensions].sort((a,b) => a-b);
  const measure = priceMode === 'parcel' ? sorted[0] + sorted[2] : sorted[2] + 2 * sorted[1] + 2 * sorted[0];
  const limits = priceMode === 'parcel' ? [35,50,80,120,150,200] : [350,500];
  const prices = priceMode === 'parcel' ? [3,4,5,7,10,15] : [20,25];
  const names = priceMode === 'parcel' ? ['XS','S','M','L','XL','XXL'] : ['S','M'];
  // Avoid floating point noise at exact tariff boundaries.
  const value = Math.round(measure * 1e8) / 1e8;
  const index = limits.findIndex(limit => value <= limit);
  const fmt = number => new Intl.NumberFormat('de-DE',{maximumFractionDigits:2}).format(number);
  if (index < 0) {
    result.innerHTML = '<small>' + (priceMode === 'parcel' ? 'Längste + kürzeste Seite' : 'Gurtmaß') + ': ' + fmt(value) + ' cm</small><strong style="font-size:28px;letter-spacing:-.5px">' + (priceMode === 'parcel' ? 'Sperrgut prüfen' : 'Preis auf Anfrage') + '</strong><span>' + (priceMode === 'parcel' ? 'Über 200 cm: Bitte wechsle oben zum Sperrgut-Rechner.' : 'Über 500 cm Gurtmaß: Bitte kläre die Annahme und den Preis vorab mit uns.') + '</span>';
    return;
  }
  const category = (priceMode === 'parcel' ? 'Paket ' : 'Sperrgut ') + names[index];
  const money = number => new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(number);
  result.innerHTML = '<small>' + category + ' · ' + (priceMode === 'parcel' ? fmt(sorted[2]) + ' + ' + fmt(sorted[0]) : 'Gurtmaß') + ' = ' + fmt(value) + ' cm</small><strong>' + money(prices[index] * count) + '</strong><span>' + money(prices[index]) + ' je Sendung × ' + count + ' · Annahmegebühr</span>';
  if (priceMode === 'parcel') document.querySelector('[data-tariff="' + names[index] + '"]').classList.add('active');
}
priceForm.addEventListener('submit', event => { event.preventDefault(); calculatePrice(); });
priceForm.addEventListener('input', calculatePrice);
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
  priceMode = button.dataset.mode;
  document.querySelectorAll('[data-mode]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelector('#measure-hint').textContent = priceMode === 'parcel' ? 'Gib alle drei Seiten ein. Wir ermitteln die längste und kürzeste automatisch.' : 'Gurtmaß = längste Seite + 2 × die zweite Seite + 2 × die dritte Seite. Wir ordnen deine Maße automatisch zu.';
  calculatePrice();
}));
calculatePrice();
