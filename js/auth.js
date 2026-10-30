// ponytail: client-side access prompt only; use server-side access control for real protection.
if (sessionStorage.getItem("chaski-preview-auth") !== "ok") {
  if (window.prompt("Bitte gib das Passwort für die Vorschau ein:") === "Kunde2026!") {
    sessionStorage.setItem("chaski-preview-auth", "ok");
  } else {
    document.open();
    document.write("<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><title>Zugriff verweigert</title></head><body><p>Zugriff verweigert. Bitte lade die Seite erneut und gib das richtige Passwort ein.</p></body></html>");
    document.close();
    window.stop();
  }
}
