# Lieferadresse Deutschland · Relaunch 2026

`code.html` direkt im Browser öffnen. CSS, JavaScript, Schrift, Logo und das CHASKI-Abholbild liegen lokal in `assets`. Es gibt keinen Build-Schritt.

## Gestaltung

Die Seite richtet sich an Schweizer Kundinnen und Kunden, die eine deutsche Lieferadresse suchen. Die Hierarchie führt vom Suchintent über Nutzen und Bedingungen zum Ablauf, den FAQ und den Kontaktangaben. Tokens und wiederverwendbare Komponenten werden aus [`../design-system.css`](../design-system.css) geladen; die Regeln sind in [`../DESIGN-SYSTEM.md`](../DESIGN-SYSTEM.md) dokumentiert.

Die Texte und Fakten stammen aus der Live-Seite [Deutsche Lieferadresse für Schweizer in Konstanz](https://lieferadresse-konstanz.ch/lieferadresse-deutschland/). Sichtbare Inhalte wurden für Abschnitte neu angeordnet, nicht um zusätzliche Angebote oder Fakten ergänzt.

## Dateien

- `code.html` – vollständiger statischer Seitenentwurf
- `assets/page.css` – Layout und responsive Darstellung
- `assets/page.js` – mobiles Menü schliesst nach Sprungnavigation
- `assets/fonts.css`, `assets/jakarta-*.woff2` – lokal eingebundene CHASKI-Schrift
- `assets/logo.png`, `assets/paketabholung.jpg`, `assets/filiale-innen.jpg`, `assets/filiale-13.jpg`, `assets/filiale-16.jpg` – lokale CHASKI-Bilddateien für Hero, Ablauf, Bento-Grid und Abschluss-CTA

Vorteilsleiste, Inhaltsnavigation und Footer folgen den SEO-Landingpage-Referenzen. Der Kontaktbereich verwendet den Footer-Kontakt aus `SEO-Landingpage/code-alternative.html`.
