# CHASKI · Alternative Startseite nach Syncora-Referenz

## Grundlage und Umfang

Visuelle Grundlage sind die acht gelieferten Screenshots. Für die Analyse wurden sie um 90° im Uhrzeigersinn gedreht. Die hellblaue Fläche außen ist der Präsentationsrahmen; sie gehört nicht zur Website. Inhaltliche Grundlage ist ausschließlich `code.html`. Die Alternative heißt `code-alternative-syncora.html` und verwendet eigene lokale Styles, Skripte, Schriften und Assets.

Die Screenshots liefern keine Font-Dateien, Figma-Maße oder Originalgrafiken. Farben wurden aus den normalisierten Bildern abgeleitet; Abstände und Formen aus den sichtbaren Proportionen. Inter und Instrument Serif Italic sind visuell passende Ersatzschriften, keine behauptete Identifizierung der unbekannten Originalschriften. Die Landschaft und Paketgrafik wurden mit dem ChatGPT-Bildgenerator neu erstellt.

## Analyse der acht Referenzen

| Screenshot | Sichtbare Gestaltung | Übertragung auf CHASKI |
|---|---|---|
| 1 · Abschluss und Footer | Zentrale Abschlussüberschrift, weißer Hauptbutton, dunkler Nebenbutton, feines Linienraster, niedriger Kontrast beim riesigen Markenwort | Registrierungsabschluss, vollständiger Footer und großes CHASKI-Wort am Seitenende |
| 2 · Preise | Zentrierte Überschrift mit kursivem Schlusswort; großzügiger Abstand; dunkle runde Karten; gelblicher Glanz und dünner Akzentrand am hervorgehobenen Angebot | Größenrechner als hervorgehobene Karte neben der vollständigen Tariftabelle; bestehende Preise unverändert |
| 3 · Integrationen | Schwebende dunkle Glasbuttons, runde Träger, kleine Lichtreflexe, breite freie Flächen zwischen Modulen | Einheitliche Glas-Iconträger bei Vorteilen und Bedienfeldern; vorhandene Funktionen statt fremder Softwarelogos |
| 4 · Funktionen | Drei Spalten im Linienraster; große matte Grafikflächen; kurze Titel mit kursivem Wort; darunter großzügiger zentraler Abschnittstitel | Prozessraster mit drei bestehenden Schritten; neue Paket-Netzwerkgrafik; Servicekarten und vollständige Beschreibungen |
| 5 · Workflow | Breites, abgerundetes visuelles Showcase; dunkles Glas auf olivefarbenem Licht; dünne Verbindungen und zentrale visuelle Knoten | Mit dem Bildgenerator erstellte Paketgrafik mit Paket, Standort, Nachricht und Schloss; keine fiktiven CHASKI-Statistiken |
| 6 · Lösungen | Geteilte Bento-Flächen, asymmetrische Text-/Bildverteilung, dünne Rasterlinien und große Serifakzente | Über-CHASKI-Bild/Text-Paar und Standort-Bento mit erhaltenen Aussagen, Adresse und Abholinformationen |
| 7 · Probleme | Große zentrierte Aussage; Sans-Serif im Hauptsatz, gelbliche kursive Serif im Schluss; dunkle Zweispaltenmodule | Vergleich Direktversand/CHASKI; FAQ und Bewertungen in der gleichen visuellen Familie |
| 8 · Hero | Drei separate Glasgruppen in der Navigation, mittige Zweizeilenüberschrift, matte sagefarbene Hügellandschaft, weiße CTA, drei überlagerte Glaskarten | Bestehende Navigation, deutsche Lieferadresse als Hero, generierte Landschaft, vorhandene Vorteile, Filialfoto und vorhandene 4.9/5-Bewertung |

## Farben und Oberflächen

| Token | Wert | Verwendung |
|---|---|---|
| `--canvas` | `#14160b` | Olivschwarzer Grund; dominante dunkle Referenzfläche |
| `--surface` | `#1e2015` | Matte Karten und Tabellen |
| `--surface-glass` | `rgba(30,34,20,.82)` | Glasfamilie |
| `--text` | `#f8f8f2` | Überschriften und wichtigster Text |
| `--muted` | `#b6baa9` | Fließtext und sekundäre Angaben |
| `--accent` | `#dbd96c` | Kursive Schlusswörter, aktive Zustände, Sterne |
| `--line` | `rgba(216,225,165,.14)` | Raster, Divider und neutrale Ränder |
| `--line-strong` | `rgba(218,226,118,.46)` | Rechner, hervorgehobene Vergleichskarte |
| Primärbutton | `#fcfcf8` / Text `#17190e` | Weiße handlungsorientierte CTA |
| Niedrig kontrastierte Wortmarke | `#272e14` | Großes CHASKI-Wort am Seitenende |

Licht stammt aus generierten Rasterbildern. Die Abschnittsatmosphäre wird mit einer neutralen dunklen Fläche multipliziert, damit sie im dunklen Farbbereich der Referenz bleibt. Glasnavigation und überlagerte Karten verwenden transparente Füllungen, feine helle Ränder und 12–22 px Hintergrundunschärfe. Schatten bleiben flach; die Reflexe sitzen primär an oberen Rändern.

## Typografie

| Rolle | Umsetzung |
|---|---|
| Sans-Schrift | Lokal gespeicherte Inter, Regular 400; unterstützend 500/600/700 |
| Display-Akzent | Lokal gespeicherte Instrument Serif Italic 400 |
| Hero | Desktop bis 64 px, Zeilenhöhe 1.02, Tracking −0.055 em |
| Abschnittsüberschrift | 36–58 px, Zeilenhöhe 1.08, Tracking −0.055 em |
| Kartentitel | Meist 23–26 px, Zeilenhöhe 1.2 |
| Fließtext | 14–16 px, Zeilenhöhe 1.6–1.8 |
| Hero-Beschreibung | 18 px Desktop, 15 px Mobile |
| Badge | 14 px Desktop, 11 px Mobile |
| Tabelle | 11 px, Zeilenhöhe 1.5; auf Mobile innerhalb eines eigenen horizontalen Scrollbereichs |

Kursive Akzente markieren bereits vorhandene Wörter, etwa „in Konstanz.“, „deutschen Adresse“, „Größenrechner“ und „unsere Kunden“. Überschriften bleiben normal gewichtet. Das Verhältnis von ruhiger Sans-Schrift und schmaler, kontrastreicher Kursivschrift folgt der Referenz. Texte werden vollständig dargestellt; es gibt keine neuen Textkürzungen.

## Raster, Spacing und Formen

Grundraster: 8 px. Inhaltsbreite: maximal 1200 px; Hero-Navigation maximal 1280 px. Desktop-Außenabstand mindestens 48 px, Tablet 32 px, Mobile 20 px. Normale Abschnitte haben 112 px vertikalen Innenabstand; Mobile 72 px. Überschrift zu Inhalt: 64 px beziehungsweise 40 px auf Mobile. Karten-Gaps: 18–22 px; Karten-Innenabstand meist 27–38 px.

| Element | Form |
|---|---|
| Standardkarte | 22 px Radius |
| Großes Showcase/Bento | 26–30 px Radius |
| Button | 12 px Radius, ca. 48–55 px Höhe |
| Glasnavigation | 14 px Radius |
| Kleine Iconfläche | 12 px Radius, ca. 42 × 42 px |
| Eyebrow | Pillenform, Radius 999 px |
| Review-Steuerung | Runde Fläche, 42 × 42 px |

Der Hero zeigt zuerst Text und Aktionen, danach drei überlagerte Karten. Die Bildkarte ist bewusst breiter, weil sie reale CHASKI-Inhalte zeigt. Prozess und Footer verwenden das feine Linienraster der Referenz. Die sechs Servicekarten verwenden das gleiche Raster und die vorhandenen Filialfotos. Karten gewinnen ihre Hierarchie über Position, Typografie und Randstärke.

## Bilder und Icons

`hero-landscape-refined.png`: finaler Hintergrund mit sagegrauem Himmel, gedämpften Hügeln, gelbgrünem Vordergrund und dunklem unteren Auslauf. `parcel-network.png`: generierte Glasgrafik mit Paket, Standort, Nachricht und Schloss. `olive-atmosphere.png`: generiertes diffuses Licht für Karten und Abschnitte. Die Generierungsanweisungen sind im Asset-Ordner dokumentiert.

Alle vorhandenen inhaltlichen Filialfotos wurden lokal übernommen. Die dekorative alte Abschlussaufnahme bleibt im HTML erhalten, wird aber durch die neue Atmosphäre ersetzt. Die ursprüngliche schematische SVG-Karte wurde durch das bestehende echte Gebäudefoto ersetzt; die Beschriftungen Kaufland und OBI sowie der echte Google-Maps-Routenlink bleiben erhalten. Die Landschaft ist ein dekoratives Bild und zeigt keinen behaupteten CHASKI-Standort.

Die vorhandene Google-Markengrafik bleibt erhalten. Die vorhandenen Material Symbols sind als lokal gespeicherte Schrift eingebunden; sie gehören durchgehend zur gleichen Iconfamilie. Die neue Illustration wird nicht durch handgezeichnete SVG- oder CSS-Grafiken ersetzt.

## Verhalten und Responsive-Regeln

Bei Desktop-Breite stehen Hero-Karten, Prozessschritte und Servicekarten mehrspaltig. Unter 1100 px wird der Hero zweispaltig mit voller Bewertungszeile; der Preisbereich und das Kontaktmodul wechseln auf eine Spalte. Unter 768 px werden große Module einspaltig, die Navigation klappt per Button auf und die Bewertungen bleiben horizontal scrollbar. Unter 360 px erhält die Aktionsgruppe eine eigene Headerzeile.

Der Rechner nutzt die vorhandenen Tarife: Standard `L + kürzeste Seite`, Sperrgut `L + 2×B + 2×H`; die Höhe wird nur für Sperrgut aktiviert. Fehlende beziehungsweise ungültige Maße erzeugen eine klare Rückmeldung. FAQ verwendet native `details/summary`. Das Menü schließt nach einer Navigation und per Escape. Bedienfelder haben sichtbaren Tastaturfokus. Reduzierte Bewegung deaktiviert weiche Scroll- und Hoverbewegungen.

## Inhalts- und Prüfgrenzen

Der Prüfbericht `qa-syn-cora/content-verification.json` vergleicht alle elf Bereiche, die Footertexte und sämtliche bestehenden Linkziele mit der Originaldatei. Es wurden keine redaktionellen Behauptungen, Preise, Öffnungszeiten oder Bewertungen ergänzt. Der Stand 2025 und die vorhandenen Platzhalterziele wie `#login` oder `#` stammen aus der Vorlage. Der lokale Prototyp implementiert kein neues Login, keine Registrierung und kein Backend.

Browserprüfung und visueller Vergleich sind in `design-qa.md` dokumentiert. Die Originaldatei wird über ihren SHA-256-Wert kontrolliert. Diese Alternative ist eine lokale HTML-Variante; sie wurde nicht veröffentlicht.
