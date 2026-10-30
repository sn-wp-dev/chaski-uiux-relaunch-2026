# MWST-Rückerstattung · statischer Layoutentwurf

`code.html` direkt öffnen. CSS, JavaScript, Schriftdateien, Logos und Foto liegen lokal im Ordner `assets`. Es sind keine Icon-API, kein Build und kein CDN erforderlich. Die Nachbarseiten werden relativ verlinkt, Registrierung und Login führen auf die Live-Website.

## Gestaltung

Referenzen: `../Startseite/code.html`, `../So funktionierts/code.html`, `../Services/code.html`, `../SEO-Landingpage/code-alternative.html` und `../DESIGN.md`.

Bewusst als thematische Services-Unterseite zur MWST-Rückerstattung umgesetzt, entsprechend der gelieferten Inhaltsquelle. Die bestehenden HTML-Seiten haben Vorrang bei den dort bereits verwendeten runden Buttons und Medienrahmen. Keine neuen Schriften oder Farben. Die Navigation wurde aus der vorhandenen SEO-Seite übernommen. Der Einstieg verwendet ein Rechenbeispiel; das bestehende Filialfoto steht im Registrierungsbereich.

## Inhalte und Quellen

- CHASKI: https://lieferadresse-konstanz.ch/mwst-rueckerstattung-deutschland-schweiz/
- BMF: https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/Merkblaetter/2025-03-12-merkblatt-ausfuhrlief-nichtkom-rv.pdf?__blob=publicationFile&v=5
- BAZG: https://www.bazg.admin.ch/de/wertfreigrenze-mehrwertsteuer-einreise-150-franken

Stand der Prüfung: 14. September 2026. Inhaltlich verdichtet; ergänzend Rechnungs-/Lieferadresse, Dokumentencheck, Einreichungsfrist und Abgrenzung von QuickZoll. Meta-Titel, Beschreibung, semantische Überschriften und FAQPage-Daten entsprechend den sichtbaren FAQ vorhanden. Daraus folgt keine Zusage einer bestimmten Google-Darstellung oder Platzierung.

## Prüfung

Im Codex In-app Browser mit Screenshots geprüft; Referenz und Umsetzung über `view_image` betrachtet. Desktop 1280 px sowie Mobil 390 und 320 px. Keine horizontal überlaufenden Inhalte; alle lokalen Dateien und Sprungziele vorhanden. Keine Browser-JavaScriptfehler.

Abgleich: Moosgrün-/Salbeifarben, Plus Jakarta Sans, Header und Navigation, Buttonformen, 1200-px-Container, Abstände, Bildbehandlung und mobile Umbrüche. Hero-Texte sind bewusst auf das neue Thema zugeschnitten; kein wörtlicher Startseiten-Klon. Die im Referenzrender ausgefallenen Icon-Fonts wurden durch inline eingebettete Material-SVG ersetzt. Ein kleiner Abschluss unter dem CTA-Foto wurde durch die Aufhebung einer maximalen Bildhöhe korrigiert.

Rechner: 595 € / 19 % → 95 € Steuer, 107 € / 7 % → 7 € Steuer; ungültige negative Eingabe abgefangen; Standard 119,00 € / 19 %. FAQ-Öffnung und mobile Navigation mit automatischem Schliessen geprüft. JavaScript-Syntaxprüfung erfolgreich. Acht FAQ stimmen mit ihren strukturierten Daten überein.

Nicht veröffentlicht. Bestehende Referenzseiten und WordPress-Dateien wurden nicht geändert.

## Designüberarbeitung nach Feedback

Die erste Fassung war zu textlastig. Services, So funktioniert’s und die alternative SEO-Landingpage wurden erneut im Browser vollständig betrachtet. Die Überarbeitung übernimmt deren salbeigrüne Bildrahmen, überlagerte Infokarten, geteilte Ablaufmodule, dunkle Moosgrünflächen und funktionale Detailgestaltung.

- Hero: echtes Filialfoto mit darüberliegender Beispielrechnung statt isolierter Rechnungskarte.
- Voraussetzungen: gemeinsamer Rahmen mit getönter Einleitung und vier Icon-Zeilen.
- Ablauf: drei Etappen mit insgesamt sechs Schritten, ergänzender Adressdarstellung, Abholfoto und Rückerstattungsweg.
- Zollcheck: drei bedienbare Checkboxen mit Fortschrittsanzeige.
- Rechner: zusammenhängendes dunkles Erklärmodul und helles Rechenfeld.
- Einfuhr: visuelle Gegenüberstellung Deutschland/Schweiz.
- Zahlen: dieselbe System-Monospace-Familie wie in der SEO-Referenz, auch in Fliesstext, FAQ, Footer, Formfeldern und dynamischen Ergebnissen. Keine neue Schriftdatei nötig.

Referenzen und fertige Screenshots mit view_image verglichen: Container, Palette, Typografie, Radien, Bildrahmen, Kartenkomposition und responsive Umbrüche. Hero-Texte bewusst auf das neue Layout verdichtet; Hauptthema bleibt unverändert. Aufteilung einer FAQ-Frage durch die Zahlenspans korrigiert. Prüfung bei 1280, 768, 390 und 320 Pixeln, ohne horizontalen Überlauf. Rechnerfälle mit 19 % und 7 %, ungültige Eingabe, Checkbox-Zähler und FAQ geprüft. Alle Bilder laden. Statische HTML-Verschachtelung, lokale Dateien, FAQ-JSON und JavaScript-Syntax geprüft.
