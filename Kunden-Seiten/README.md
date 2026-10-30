# CHASKI Kunden-Seiten

Statische HTML-Entwürfe auf Basis der bestehenden Relaunch-Seiten und `../DESIGN.md`.

## Ansichten

- `code.html` – Kundenkonto-Übersicht
- `click-collect.html` – eigener Click-&-Collect-Reiter für AGB und Freischaltungsstatus
- `kundenkarte.html` – digitale Kundenkarte und Musterkarten-Download
- `support.html` – Kundensupport
- `registrierung.html` – vollständiges Registrierungsformular
- `login.html` – Login

Die Dateien lassen sich direkt im Browser öffnen. Schrift, Logos, Filialbild, CSS, JavaScript und SVG-Icons liegen lokal unter `assets/`; keine Font-, Icon- oder CSS-CDN-Abhängigkeit. Farben, Plus Jakarta Sans, Rundungen, Header und Buttons stammen aus dem bestehenden Relaunch. Die Fotos und Logos wurden aus den vorhandenen Relaunch-Assets übernommen.

## Umfang und Quellen

Kontoinhalte stammen aus den bereitgestellten Screenshots. Telefonnummer und Supportzeiten wurden entsprechend dem Support-Screenshot übernommen. Die Adresse verwendet die dort angegebene PLZ 78467. Name und CH-123456 sind Beispieldaten aus der Vorlage.

Die Formulare wurden am 16.09.2026 mit https://lieferadresse-konstanz.ch/registrierung/ und https://lieferadresse-konstanz.ch/login/ abgeglichen. Alle 18 sichtbaren Registrierungsfelder und alle drei Login-Felder inklusive Checkbox sind vorhanden. Feldnamen, Pflichtstatus der Registrierung und Auswahloptionen bleiben erhalten. PLZ verwendet ein Texteingabefeld mit numerischer Tastatur, damit führende Nullen erhalten bleiben. Der aktuelle Länderwähler bietet auf der Live-Seite ausschliesslich Schweiz; dies ist auch hier so umgesetzt. Der technische Honeypot bleibt verborgen. Temporäre Nonces, Plugin-IDs und serverseitige Weiterleitungen wurden bewusst nicht übernommen.

Auf ausdrücklichen Wunsch wurden nur belegte Ansichten gestaltet. Lost & Found, Profil bearbeiten, Passwort ändern, Konto löschen und Sendungshistorie sind in der Vorschau deaktiviert. Abmelden führt zur Login-Ansicht. „Passwort vergessen?“ führt zur vorhandenen Live-Seite.

## Verhalten der Vorschau

- Navigation zwischen den sechs Seiten, mobile Menüs, Adresskopie, Passwortanzeige, Pflichtfeldprüfung und Passwortabgleich funktionieren.
- Formulare senden keine Daten und speichern keine Zugangsdaten. Nach gültiger Eingabe erscheint ein ausdrücklicher Vorschauhinweis. Auch ohne JavaScript ist die Übermittlung blockiert.
- Der QR-Code enthält ausschliesslich einen Musterhinweis, keine echte Kundenkennung. Der Download ist eine eigenständige SVG-Musterkarte inklusive Schrift und Logo.
- Die schmale Vorschauleiste und Musterkennzeichnungen gehören zum Entwurf, nicht zur späteren produktiven Kontooberfläche.
- Keine WordPress-, Authentifizierungs- oder Versanddatenanbindung; keine Live-Änderungen.

## Prüfung

Browserprüfung in lokalem Chromium bei 1440, 768, 390 und 320 Pixeln: sechs Ansichten, geladene Bilder und Schrift, genau eine H1, kein horizontaler Überlauf. Desktop- und Mobil-Screenshots liegen unter `review/`. Der maschinelle Feldabgleich ist in `review/formular-abgleich.json` dokumentiert.

`build_pages.py` baut die sechs HTML-Seiten aus den gemeinsamen Vorlagen neu auf. `verify.cjs` führt die lokalen Browserprüfungen aus; die Pfade zur vorhandenen Playwright-Installation und Chromium sind auf diese Arbeitsumgebung abgestimmt.
## Click & Collect · Ergänzung 18.09.2026

Der eigene Reiter `click-collect.html` enthält ein bedienbares Formular mit Dokumentplatzhalter, Name, gezeichneter Unterschrift (Maus/Touch), Tastaturalternative und Pflichtbestätigung. Der Originaltext der C&C-AGB fehlt weiterhin und wird nicht durch erfundene Vertragsbedingungen ersetzt.

Die klar gekennzeichnete Vorschau zeigt drei Zustände: noch nicht freigeschaltet, Prüfung ausstehend, aktiv. Der Kunde kann den Status nicht auswählen. Der Wert kommt in der produktiven Anbindung vom Server; im Entwurf wird er über `data-cc-status` am Panel gesetzt. Einreichen führt in der lokalen Vorschau ausschliesslich zum Prüfstatus. Bei Aktivierung ersetzt eine Statusanzeige das Formular. Es gibt keine Netzwerkanfrage, keine Speicherung und keine tatsächliche Freischaltung. Neuladen setzt die Vorschau zurück.

Spätere Backend-Anbindung: Der Server liefert den Status. Erfolgreiche Übermittlung der unterschriebenen, versionierten Original-AGB setzt den Status auf ausstehend; ausschliesslich eine berechtigte CHASKI-Backend-Aktion setzt ihn auf aktiv. Ein Vorschauwahlschalter entfällt produktiv. Versand, sichere Dokumentablage, Authentifizierung und Backend-Freigabe sind nicht implementiert.

`assets/collect-panel.html` ist die Vorlage für den eigenen Reiter; `build_pages.py` erzeugt daraus `click-collect.html` und bindet den Reiter in die Kontonavigation ein. Die Übersicht bleibt frei von dem geöffneten C&C-Panel. Styles und Interaktionen liegen in `collect-account.css` und `collect-account.js`.

Geprüft: 375/768/1440 Pixel ohne Überlauf; fehlende Unterschrift abgewiesen, Zeichnung und Tastaturalternative akzeptiert, ausstehend statt automatischer Aktivierung, aktiver Status ohne Formular und Rücksetzung nach Neuladen.
