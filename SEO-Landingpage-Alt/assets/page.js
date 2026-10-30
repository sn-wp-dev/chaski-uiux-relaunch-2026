const menu = document.querySelector('.mobile-menu');
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.open = false; }));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
});
const gross = document.getElementById('gross');
const rate = document.getElementById('rate');
const format = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
// Keep all generated numbers in the same monospace as static page copy.
function numericText(element, text) {
  const parts = String(text).split(/(\d+(?:[.,]\d+)*)/g);
  element.replaceChildren(...parts.map(part => {
    if (!/^\d/.test(part)) return document.createTextNode(part);
    const span = document.createElement('span');
    span.className = 'font-mono';
    span.textContent = part;
    return span;
  }));
}
function calculate() {
  const raw = gross.value.trim().replace(/[’'\s]/g, '');
  const valid = /^(?:\d+(?:[.,]\d{1,2})?)$/.test(raw);
  const value = Number(raw.replace(',', '.'));
  const ok = valid && Number.isFinite(value) && value >= 0 && value <= 999999999;
  gross.setAttribute('aria-invalid', String(!ok));
  numericText(document.getElementById('calc-error'), ok ? '' : 'Bitte einen gültigen Kaufpreis eingeben, zum Beispiel 119,00 (max. 999999999 €).');
  const net = value / (1 + Number(rate.value) / 100);
  numericText(document.getElementById('tax'), ok ? format.format(value - net) : '–');
  numericText(document.getElementById('net'), ok ? format.format(net) : '–');
  numericText(document.getElementById('share'), ok ? (Number(rate.value) / (100 + Number(rate.value)) * 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' % des Bruttopreises' : 'Kaufpreis prüfen');
}
gross.addEventListener('input', calculate);
rate.addEventListener('change', calculate);
calculate();
const borderChecks = [...document.querySelectorAll('input[name="border-check"]')];
function updateBorderCheck() {
  const count = borderChecks.filter(input => input.checked).length;
  numericText(document.getElementById('check-count'), count === borderChecks.length ? '3 von 3 bereit · Alles dabei!' : `${count} von ${borderChecks.length} bereit`);
  document.getElementById('check-progress').value = count;
}
borderChecks.forEach(input => input.addEventListener('change', updateBorderCheck));
updateBorderCheck();
