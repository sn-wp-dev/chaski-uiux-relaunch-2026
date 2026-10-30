# Design QA · Alternative Startseite

**final result: passed**

## Findings

Im abschließenden Vergleich sind keine offenen P0-, P1- oder P2-Probleme innerhalb der beauftragten Übertragung des Referenzdesigns auf die CHASKI-Inhalte verblieben. Die unten dokumentierten Unterschiede folgen aus den erhaltenen CHASKI-Inhalten und den nicht verfügbaren Original-Designassets. „Passed“ bedeutet geprüfte Umsetzung dieser Adaption, keine behauptete pixelgleiche Kopie der Syncora-Seite.

## Vergleichsgrundlage und Normalisierung

Quelle: die acht gelieferten Screenshots, für die Analyse im Uhrzeigersinn gedreht; normalisierte Dateien `qa-syn-cora/reference-1.png` bis `reference-8.png`. Implementierung: `code-alternative-syncora.html`, geprüft im In-App Browser über den lokalen HTTP-Server auf Port 8788. Desktop-Viewport 1440 × 1100 CSS-Pixel, Gerätefaktor 1. Die Aufnahme der Inhaltsfläche ist wegen der Scrollbar 1425 Pixel breit. Die Desktop-Bereiche wurden aus dem vollständig gerenderten Screenshot anhand ihrer gemessenen Abschnittsgrenzen ausgeschnitten.

Die hellblaue Mockup-Umrandung wurde vor dem Vergleich entfernt. Referenz und Implementierung wurden in gemeinsamen Bilddateien nebeneinander gestellt. Beide Seiten werden proportional skaliert. Inhalt und Seitenlänge unterscheiden sich: CHASKI enthält elf vollständige Bereiche, vierzehn Tarifzeilen, sechs Servicekarten und reale Filialfotos. Eine gleiche Seitenhöhe oder identische Textumbrüche werden deshalb nicht als Ziel behauptet.

## Iteration und Korrekturen

| Befund | Schwere | Korrektur | Nachweis |
|---|---|---|---|
| Im ersten Hero-Vergleich lief die Landschaft hinter den Glaskarten zu früh aus; die sichtbare Karten-/Landschaftsüberlagerung war kürzer als in der Referenz | P2 | Landschaftsfläche auf 980 px Desktop-Höhe, größere Kartenhöhe und korrigierter Übergang | `compare-hero-1.png` → `compare-hero-2.png` |
| Navigation und Eyebrow waren im Verhältnis zur Hero-Typografie kleiner als in der Referenz | P2 | Desktop-Navigation auf 15 px, CTA auf 14 px, Eyebrow auf 14 px; angepasster horizontaler Rahmen | `compare-hero-2.png`, `compare-hero-detail.png` |
| Die „Empfohlen“-Markierung ragte bei 768 px über die Inhaltsfläche | P2 | Vergleichsheader darf umbrechen; Markierung bleibt sichtbar | `responsive-verification.json`: 768 px bestanden |
| Headergruppen passten bei 390 px nicht in eine Zeile | P2 | Schmaleres Markenbild und Menübutton; eigene Aktionszeile unter 360 px | `hero-mobile.png`, Breitenprüfung 320/390 px |
| Unterschiedlich lange Feldlabels verschoben die drei mobilen Maßfelder gegeneinander | P2 | Gleiche Grid-Zeilenhöhe mit flexibler Labelhöhe und unten ausgerichteten Eingabefeldern | `calculator-mobile-before.png` → `calculator-mobile-after.png`; identische gemessene Feldoberkanten |
| Tarifhinweise verloren beim Entfernen der alten Klassen ihre Absatz- und Zuschlagsstruktur | P2 | Eigene Divider, Abstände und drei Zuschlagfelder; auf Mobile einspaltig | aktualisiertes `compare-prices.png` |

Nach den Korrekturen wurden die betroffenen Ansichten erneut aufgenommen und visuell kontrolliert. Die finale Preisaufnahme enthält die neu strukturierten Hinweise; alle Vergleichsbilder mit Ausnahme des bewusst erhaltenen Vorherbilds wurden aus der finalen Desktop-Aufnahme aktualisiert.

## Pflichtflächen des visuellen Vergleichs

**Fonts und Typografie:** `compare-hero-detail.png` zeigt die Kombination aus leichtgewichtiger Sans und kontrastreicher kursiver Display-Serif gemeinsam mit der Referenz. Inter und Instrument Serif werden lokal geladen; die Browserprüfung bestätigt beide Familien. Hero maximal 64 px; Abschnitte bis 58 px; normale statt schwerer Überschriftsgewichte. Die exakten Referenzfonts sind unbekannt. Die kürzere kursive CHASKI-Phrase hat entsprechend eine andere Zeilenbreite. Bestehende Texte werden nicht abgeschnitten.

**Spacing und Layout:** `compare-hero-2.png` zeigt drei getrennte Navigationsgruppen, zentrierten Hero, breite Landschaft und drei überlagerte Karten. `compare-workflow.png` zeigt die Übertragung des Linienrasters, großen Showcases und großzügigen Abschnittsrhythmus. `compare-footer.png` zeigt Raster, dünne Linien und sehr große niedrig kontrastierte Wortmarke. Kartenradius 22 px, große Module 26–30 px, Content maximal 1200 px, Abschnittsabstand 112 px beziehungsweise 72 px auf Mobile. Schmale Felder, Headergruppen und der Tablet-Badge wurden nachgemessen und korrigiert.

**Farben und Tokens:** Dunkle Referenzflächen entsprechen `#14160b` und `#1e2015`, Akzente `#dbd96c`. Die Schlusswörter, Sterne, aktive Rechnerauswahl und hervorgehobenen Ränder verwenden die gleiche Akzentfamilie. Generierte Lichtatmosphäre bleibt nach dem Abdunkeln subtil. Primäre Buttons sind warmweiß mit dunklem Text; sekundäre Buttons transparent mit feinem Rand.

**Bildqualität und Assettreue:** Die generierte Landschaft wurde anhand der Hero-Referenz nochmals bearbeitet: sagegrauer Himmel, entsättigte Hügel, gelbgrüner Vordergrund, weicher dunkler Auslauf. Die neue Paketgrafik übernimmt Glasflächen, diffuse Olivlichter und dünne Verbindungen, zeigt aber CHASKI-relevante Motive. Alle sichtbaren Fotos und Logos laden erfolgreich. Die älteren kleinen Filialfotos behalten die begrenzte Auflösung ihrer Quelle. Die Illustrationen sind generierte Rasterassets. Die bestehende Google-Markengrafik und die lokale Material-Symbol-Schrift sind erhalten.

**Copy und Inhalt:** Der maschinelle Vergleich ist in `content-verification.json` dokumentiert. In keinem der elf Bereiche fehlen Wörter oder Linkziele; auch Headerlinks und Footertexte sind vollständig erhalten. Der separate Kontaktblock bleibt erhalten. Keine neuen Zahlen, Tarife, Kundenbewertungen oder Leistungsbehauptungen wurden ergänzt. Die Originaldatei ist bytegleich zum gespeicherten SHA-256-Ausgangswert.

## Bewusste Anpassungen an die Inhalte

Der Hero zeigt Vorteile, das reale Filialfoto und die bestehende Bewertung anstelle erfundener Dashboard-Kennzahlen. Der Preisbereich verwendet Rechner und vollständige Tabelle anstelle drei Abonnements. Die Prozessgrafik ist ein gemeinsames Showcase über den drei vollständigen Schritten. Servicefotos, Historie, Standort und Kontakt behalten ihre eigenen Bereiche. Die Wortmarke lautet CHASKI. Diese Unterschiede sind durch den Auftrag zur Übernahme sämtlicher bestehender Inhalte begründet.

## Funktions- und Responsive-Nachweise

`responsive-verification.json` bestätigt 1440, 1024, 768, 390 und 320 px ohne horizontalen Seitenüberlauf. Die Tabelle und Bewertungen besitzen ihre vorgesehenen internen Scrollbereiche. Der Tabellenbereich ist auch per Tastatur fokussierbar. Mobile Aufnahmen: `hero-mobile.png`, `prices-mobile.png` und `calculator-mobile-after.png`.

`interaction-verification.json` dokumentiert erfolgreiche Prüfung von Menüöffnung, Schließen nach Navigation, Escape, FAQ, Bewertungswechsel, Standardpreis, Sperrgutpreis, Lagerfrist, ungültigen Eingaben und Übermaß. Standardberechnung nutzt Länge plus die ausdrücklich eingegebene kürzeste Seite; Höhe wird erst bei Sperrgut aktiviert. JavaScript-Syntaxprüfung ist bestanden. Der finale Browser meldet keine Warnungen oder Fehler, zeigt genau eine H1 und lädt alle sichtbaren Bilder erfolgreich.

Sichtbarer Tastaturfokus, Eingabelabels, semantische Menüsteuerung und reduzierte Bewegung sind umgesetzt und teilweise manuell geprüft. Dies ist kein vollständiges automatisiertes Accessibility-Audit. Die Quelle enthält weiterhin Platzhalterziele für Login, Registrierung, WhatsApp und Rechtsseiten; ein Backend war nicht Teil des Designauftrags. Bestehende externe Informationsseiten wurden nicht verändert oder auf ihre Erreichbarkeit geprüft.

## Implementation Checklist

- Referenzen analysiert und Tokens dokumentiert: bestanden.
- Alternative separat gespeichert: bestanden.
- Generierte Landschaft, Paketgrafik und Atmosphäre lokal eingebunden: bestanden.
- Vollständige Inhalte, Linkziele und unveränderte Originaldatei geprüft: bestanden.
- Gemeinsame visuelle Vergleichsinputs erstellt, Befunde korrigiert und erneut aufgenommen: bestanden.
- Desktop, Tablet, Mobile und relevante Bedienelemente geprüft: bestanden.

## Follow-up Polish

Für eine spätere Produktionsintegration können die tatsächlichen Referenzfonts und größere Originalaufnahmen die Übereinstimmung weiter verfeinern. Dies ist kein offener Defekt des lokalen Prototyps. Veröffentlichung und Backend-Anbindung wurden nicht ausgeführt.
