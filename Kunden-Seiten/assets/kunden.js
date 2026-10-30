(() => {
  const toast = document.querySelector('.toast');
  let timer;
  function announce(message) {
    toast.textContent = message; toast.hidden = false;
    clearTimeout(timer); timer = setTimeout(() => { toast.hidden = true; }, 5000);
  }
  document.querySelectorAll('.reveal').forEach(button => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.getAttribute('aria-controls'));
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.setAttribute('aria-pressed', String(show));
      button.setAttribute('aria-label', show ? 'Passwort verbergen' : 'Passwort anzeigen');
    });
  });
  const copy = document.querySelector('[data-copy]');
  copy?.addEventListener('click', async () => {
    const text = document.querySelector('#lieferadresse').innerText;
    try {
      if (navigator.clipboard && window.isSecureContext && location.protocol !== 'file:') await navigator.clipboard.writeText(text);
      else {
        const field = document.createElement('textarea');
        field.value = text; field.style.position = 'fixed'; field.style.opacity = '0';
        document.body.append(field); field.select();
        const success = document.execCommand('copy'); field.remove();
        if (!success) throw new Error('Copy unavailable');
      }
      announce('Lieferadresse kopiert.');
    } catch { announce('Bitte die Lieferadresse markieren und manuell kopieren.'); }
  });
  const password = document.getElementById('user_pass');
  const confirmation = document.getElementById('user_confirm_password');
  function validatePasswords() {
    if (!confirmation) return;
    const mismatch = confirmation.value !== '' && confirmation.value !== password.value;
    confirmation.setCustomValidity(mismatch ? 'Die Passwörter stimmen nicht überein.' : '');
    confirmation.setAttribute('aria-invalid', String(mismatch));
    document.getElementById('password-error').hidden = !mismatch;
  }
  password?.addEventListener('input', validatePasswords);
  confirmation?.addEventListener('input', validatePasswords);
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      feedback.hidden = false;
      feedback.textContent = form.dataset.demo === 'registration'
        ? 'Die Eingaben sind vollständig. Dies ist eine Layout-Vorschau: Es wurde kein Kundenkonto eröffnet und nichts übermittelt.'
        : 'Dies ist eine Layout-Vorschau: Deine Zugangsdaten wurden nicht übermittelt. Über „Kontoübersicht“ in der Vorschauleiste öffnest du das Beispielkonto.';
      feedback.focus();
    });
  });
})();
