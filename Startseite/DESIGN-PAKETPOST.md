# CHASKI – Paketpost

Eigenständige lokale Startseiten-Alternative, erstellt am 9. Oktober 2026.

Einstieg: `code-alternative-paketpost.html`. Eigene CSS- und JavaScript-Dateien, eigene lokale Assets. Die Botanical-Datei wurde nicht geändert.

## Idee und Aufbau

Die echte Paketübergabe ist das zentrale Motiv. Große ruhige Typografie erklärt den Service, die gelbe Registrierungsfläche gibt eine klare Handlung vor. Danach folgen Bestellung, Abholung, Tarife, Services, Standort, FAQ und Registrierung. Die Seite wurde als neues HTML und CSS geschrieben, ohne den bestehenden Aufbau oder dessen Komponenten zu übernehmen.

Der erste Konzeptcheck hat die übliche Text-Bild-Hero aufgelöst: Die Überschrift und Orientierung stehen über einer eigenen Kombination aus dokumentarischem Foto und Registrierungsfläche. Bilder und funktionale Flächen haben unterschiedliche Aufgaben. Der Tarifrechner stellt eine konkrete Entscheidung in den Mittelpunkt. Echte Shopfotos ersetzen erfundene Bewertungen und Marketingzahlen.

## Gestaltung

| Rolle | Wert |
|---|---|
| Paketgelb | `#FFD84D` |
| Graphit | `#242622` |
| Weiß | `#FFFFFF` |
| Papier | `#F1F3F2` |
| Abholbereich | `#DCEAE9` |
| Sekundärer Text | `#58625D` |

Überschriften: Bricolage Grotesque, lokale variable WOFF2, 400–800. Fließtext: DM Sans, lokale variable WOFF2, 400–700. Herkunft: Google Fonts. Lizenzdateien liegen bei den Assets. Links ausgerichtet, maximal 1320px Inhaltsbreite, große Abstände zwischen Themen. Fotoecken 14px, Buttons 8px, ohne Schatten oder dekorative Verläufe. Keine Scroll-Animationen. Reduced Motion deaktiviert weiches Scrollen und Übergänge.

## Tatsächlich betrachtete Referenzen

Der beauftragte Mobbin-MCP wurde zuerst verwendet. Alle drei Suchaufrufe wurden mit „Mobbin MCP requires a paid plan“ abgelehnt. Daraufhin hat der Nutzer öffentlich zugängliche Mobbin-Referenzen und ergänzende Originalseiten ausdrücklich freigegeben.

Auf der [öffentlichen Mobbin-Startseite](https://mobbin.com/) wurden drei Sites-Vorschauvideos und fünf Weboberflächen visuell geprüft. Die freie Sites-Sammlung leitete zur Anmeldung um, deshalb ist die Recherche keine Sichtung der vollständigen Mobbin-Bibliothek.

| Öffentliche Mobbin-Vorschau | Beobachtung | Entscheidung für CHASKI |
|---|---|---|
| [Shopify Editions](https://www.shopify.com/editions) | Bilder als eigene Erzählung, ruhige Navigation, klare Hauptaktion | Authentische Fotos als Servicebeleg, schlanke Navigation |
| [Luma](https://luma.com/) | Konzentrierte Botschaft, Beispiele rund um den Inhalt | Knappes Hauptversprechen und eine eindeutige Registrierungsaktion |
| [Aside](https://aside.com/) | Zusammenhängende Hero-Fläche, großer Produktbeleg | Hero mit eigenem Rhythmus und echter Paketübergabe |
| Visitors Web-UI | Eine zentrale Aufgabe, ruhige Umgebung | Preisermittlung als klar begrenzter Bereich |
| Stripe Web-UI | Beschriftete Felder und nachvollziehbare Schritte | Sichtbare Maße, eindeutiger Berechnungsbutton |
| Shopify Payments Web-UI | Verwandte Felder in einer Gruppe | Maße im gemeinsamen Fieldset |
| Midday Web-UI | Fotografische Fläche und konzentrierte Eingabe | Bilder mit tatsächlicher Servicefunktion |
| Perplexity Academic Web-UI | Dominante Eingabe und übersichtliche Folgeinhalte | Rechner und Preistabelle zusammenhängend |

Die letzten fünf sind Produktoberflächen, keine Marketing-Startseiten. Ihre öffentlich zugänglichen Bilder wurden nur als Referenz betrachtet. Keines dieser Bilder wird auf der CHASKI-Seite verwendet.

Zusätzlich wurden Originalseiten visuell geprüft:

- [Wise](https://wise.com/): starke Überschriftenhierarchie und klar gewichtete Handlungen.
- [Monzo](https://monzo.com/): tatsächliche Alltagsszene als Einstieg.
- [Dropbox](https://www.dropbox.com/): erkennbare Hauptaktion und großzügiger Abstand.
- [Back Market](https://www.backmarket.de/de-de): übersichtliche Nutzeninformationen und Informationshierarchie.
- [IKEA](https://www.ikea.com/de/de/): Fotografie als Orientierung für konkrete Angebote.
- [Packhelp](https://packhelp.com/): Verpackung als Teil der Botschaft, fokussierte Handlungen.

Patagonia zeigte nur eine Warteseite und wurde nicht als Designreferenz verwendet. Die Muster sind Beobachtungen, keine belegten Aussagen über Conversion-Raten. Die CHASKI-Gestaltung kopiert keine Referenz.

## Bildherkunft

Alle verwendeten Fotos stammen aus dem vom Nutzer angegebenen Bilderordner. Die Originale bleiben unangetastet. WebP-Dateien sind verkleinerte Ausgabekopien.

| Asset | Original unter `F:/Work_Privat/chaski-lieferadresse.ch/BIlder/2025/07/JPEG-Tiny/` |
|---|---|
| `paketuebergabe.webp` | `Innen/chaski-lieferadresse-laden-innenansicht-13.jpg` |
| `abholung.webp` | `Innen/chaski-lieferadresse-laden-innenansicht-15.jpg` |
| `shop.webp` | `Innen/chaski-lieferadresse-laden-innenansicht-3.jpg` |
| `standort.webp` | `Außen/chaski-lieferadresse-laden-aussenansicht-2.jpg` |

Schriftzug: bestehendes Markenasset aus `Relaunch-2026/Services/assets/logo-0.png`. Die Fotoauswahl wurde visuell auf lesbare persönliche Angaben und Zugangscodes geprüft. Es wurden keine KI-Bilder benötigt.

## Inhaltliche Grundlage

Verbindliche lokale Grundlage: `SEO-Strategie/2026-09-21-Bestandsaufnahme/P0-verbindliche-fakten.md` im CHASKI-Hauptordner. Aktuelle öffentliche Fakten wurden ergänzend mit [Homepage](https://lieferadresse-konstanz.ch/), [FAQ](https://lieferadresse-konstanz.ch/faq-deutsche-lieferadresse/), [Services](https://lieferadresse-konstanz.ch/services-vorteile-deutsche-lieferadresse-konstanz/) und [Kontakt](https://lieferadresse-konstanz.ch/kontakt/) abgeglichen.

Registrierung für Personen mit Schweizer Wohnsitz, Kontoaktivierung durch eigene E-Mail-Bestätigung, separate Freischaltung für 24/7-Zugang, 30/14 Kalendertage Lagerung ab Erhalt der Eingangsbestätigung. Keine erfundenen Bewertungen, Sparquoten, Rabatte, Rücksendegebühren oder Telefonnummern. Der Rechner gibt eine Orientierung, die endgültige Tarifzuordnung erfolgt im Shop. Sperrgut, Paletten und Speditionslieferungen brauchen vorherige Absprache.

Der öffentliche Auftritt ist unter `lieferadresse-konstanz.ch` erreichbar. Die Links führen zu den verifizierten aktuellen Zielen. Für Click & Collect existiert noch keine veröffentlichte eigene Seite, daher führt der Link zur FAQ.

## Verwendung

HTML-Datei direkt öffnen oder für die Vorschau einen lokalen HTTP-Server über `Relaunch-2026` verwenden. Assets und Schriftdateien sind lokal, es gibt keine externen Skripte, Tracker oder Bibliotheken. Registrierungs- und Loginlinks führen auf die vorhandene Website, der Entwurf selbst sendet keine Daten. `noindex, nofollow` kennzeichnet die Alternative als Vorschau.

Status: lokale Designalternative. Nicht committed, gepusht oder veröffentlicht. Eine spätere WordPress-Integration und Live-Veröffentlichung sind eigene Schritte.
