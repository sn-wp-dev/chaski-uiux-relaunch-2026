# Botanical – Design-System, verfeinerte Variante

Datei: `code-alternative-botanical.html`. Jeder Abschnitt verwendet über `data-palette` genau eine von zwei festen Paletten. Komponenten erben semantische Farbrollen. Abwechselnd bunte Karten und individuell gefärbte Avatare entfallen.

## Bereichspaletten

| Palette | Ausgangsfarben | Verwendung |
| --- | --- | --- |
| Sage / Cream | `#A3B18A` / `#F2E8CF` | Hero, Ablauf, Versandvergleich, Preise und Rechner, Kundenstimmen, Standort, Registrierung, Kontakt, Footer |
| Lavender / Beige | `#A89BBE` / `#D8C3AB` | Services, Über uns, FAQ |

Die Hauptfarbe bestimmt Flächen und Akzente. Die Begleitfarbe ergänzt gezielte Details. Beige erhält keinen eigenen Abschnitt und wird nicht als Button- oder Labelhintergrund verwendet. Service-Labels sind weiß mit dunkler Schrift. Rose wurde vollständig als Designfarbe entfernt. Rot `#BA1A1A` bleibt ausschließlich als semantische Warnfarbe im Versandvergleich erhalten. Fotos, Markenlogos und Bewertungssterne sind inhaltliche Elemente außerhalb der dekorativen Farbregel.

## Semantische Rollen

| CSS-Token | Aufgabe | Sage / Cream | Lavender / Beige |
| --- | --- | --- | --- |
| `--theme-canvas` | Ruhiger Grund | `#FAF6ED` | `#FAF8FC` |
| `--theme-tint` | Helle Bereichsfläche | `#F2F5EC` | `#F5F2F8` |
| `--theme-wash` | Tiefe im Verlauf | `#EBF0E3` | `#EEEAF3` |
| `--theme-card` | Leseflächen | `#FFFCF5` | `#FDFBFE` |
| `--theme-accent` | Icons, Badges, Hervorhebung | Sage | Lavender |
| `--theme-companion` | Ergänzende kleine Flächen | Cream | Beige |
| `--theme-ink` | Headlines und Text | `#2E3328` | `#37303F` |
| `--theme-muted` | Begleittext | `#555F4B` | `#635A6B` |
| `--theme-strong` | Aktionen und aktiver Zustand | `#455538` | `#635477` |
| `--theme-deep` | Dunkle Flächen | `#303D2A` | `#463951` |
| `--theme-line` | Rahmen und Trennlinien | `#CFD6C0` | `#D6CBDD` |
| `--theme-on-dark` | Schrift auf dunklen Flächen | `#FFFFFF` | `#FFFFFF` |

Die sechs Originalfarben bleiben globale Primitive. Helle Mischungen und dunkle Ableitungen übernehmen die UI-Aufgaben. Kleine Texte verwenden dunkle, kontrastreiche Töne statt Pastellschrift auf hellen Flächen.

## Komponentenregeln

- Alle Karten eines Bereichs verwenden dieselbe Flächenfamilie, dieselben Rahmen und denselben Verlauf. Alle sechs Servicekarten gehören zu Lavender/Beige.
- Alle drei Ablauf-Icons verwenden denselben Sage-Verlauf. Die vorhandenen Nummern vermitteln die Reihenfolge.
- Alle Bewertungsavatare sind Sage; Sterne behalten ihre Bewertungsfarbe.
- Primäre Aktionen: klarer Grünverlauf mit weißer Schrift. Auf der dunklen Registrierungsfläche verwendet der Primärbutton Weiß mit dunkelgrüner Schrift. Nur die begleitende zweite Aktion neben einem Primärbutton wird als Textlink ohne Unterstreichung dargestellt. Eigenständige sekundäre Aktionen (Hilfecenter, Telefon, WhatsApp) verwenden weiße, vollständig runde Buttons. Klickhöhe mindestens 44 Pixel.
- Preise und Rechner: helle Sage/Cream-Flächen, dunkelgrünes Ergebnisfeld, durchgehend weiße Schrift auf dunklem Grün.
- FAQ: Lavender für Rahmen und aktiven Zustand. Antworttexte bleiben auf ruhigen Leseflächen.
- Fokus, Auswahl, Farbverläufe und dekorative Schatten folgen der lokalen Palette. Bestehende Bewegungen bleiben erhalten.
- Neue Einzelkomponenten erhalten keine zusätzliche dekorative Farbe. Eine Palette wird immer als vollständiger Satz von Rollen gewechselt.

## Hintergrundgestaltung

Der Hero verwendet jetzt den Grainient-Shader aus der bereitgestellten React-Bits-Vorlage. `hero-grainient.js` adaptiert ihn für statisches HTML mit nativem WebGL2. Es werden weder React noch OGL benötigt. Die Farben und Shader-Parameter entsprechen dem eingefügten Beispiel: Olive `#8A8F68`, Beige `#D8C3AB`, Sage `#A3B18A`, Geschwindigkeit 0,25 und statische Körnung 0,1. Eine helle Auflage schützt die Lesbarkeit der Inhalte.

Die Animation pausiert außerhalb des sichtbaren Bereichs und bei verborgenem Tab. Bei `prefers-reduced-motion: reduce` wird ein statisches Shader-Bild dargestellt. Die Auflösung ist auf DPR 1,5 begrenzt, auf Mobilgeräten auf DPR 1, die Bildrate auf ungefähr 30 FPS. Ohne WebGL2 oder bei Kontextverlust bleibt der vorherige CSS-Verlauf mit Linien und Papiertextur sichtbar. Der Hintergrund ist dekorativ, für Hilfstechnologien verborgen und fängt keine Eingaben ab.

Ablauf, Preise, Kundenstimmen und FAQ behalten ihre bisherigen radialen Aufhellungen und tonalen Verläufe der jeweiligen Palette. Karten bleiben ruhiger als die umgebenden Flächen. Der neue Grainient-Effekt ist auf den Hero begrenzt.

## Typografie und Umfang

Outfit für Headlines: H1 800, H2 750, weitere Überschriften überwiegend 700. Manrope für Fließtext und UI. Beide bieten Light, Regular und Bold. Die vorhandene System-Monoschrift bleibt erhalten. Gewichtsbereiche wurden im ersten Durchgang anhand der offiziellen Google-Fonts-Metadaten bestätigt.

Bilder, Links, IDs, Abschnittsfolge, Raster und Rechnerlogik bleiben erhalten. Die Labels „Teuer & träge“ und „Empfohlen“, die zusätzlichen unteren Service-Badges und dekorative Punkte in Labels wurden auf Wunsch entfernt. Abstände an sekundären Aktionen sind an die neue Textlinkdarstellung angepasst. Originaldatei `code.html` unverändert. Alle Designregeln liegen im eingebetteten CSS der Alternative. Google Fonts, Tailwind und externe Bilder benötigen weiterhin eine Internetverbindung.

## Lokale Prüfung

Desktop und vollständige Seite visuell geprüft; 1440, 1024, 768, 390 und 320 Pixel geprüft. Outfit und Manrope geladen; eine H1, keine defekten Bilder. FAQ lässt sich per Tastatur öffnen und schließen. Nach der Umstellung auf volle Abschnittsbreiten gibt es bei den geprüften Breiten 1440, 1304, 1058, 768, 390 und 320 Pixeln keinen horizontalen Seitenüberlauf mehr. Bestehende Rechnerlogik und Linkziele wurden nicht fachlich überarbeitet.

Aktuelle Screenshots: `../../output/playwright/botanical-refined-hero.png` und `../../output/playwright/botanical-refined-full.png`. Prüfdetails: `../../output/playwright/botanical-refined-verification.md`.

## Browser-Anmerkungen umgesetzt

Ablauf, Kundenstimmen und FAQ nutzen deutlich hellere Bereichsflächen. Alle primären Grünbuttons zeigen einen sichtbaren Verlauf. Pro Servicekachel bleibt ein neutrales weißes Label. Dunkle Flächen verwenden weiße Texte und Icons. Es gibt keine beigen Buttons. Der Grainient-Hero bleibt erhalten. Aktuelle Prüfung und Screenshots: `../../output/playwright/botanical-comments-verification.md`.

## Zweite Runde Browser-Anmerkungen

Alle 24 Anmerkungen sind umgesetzt. Abschnitte verwenden vollflächige Hintergründe und ein begrenztes inneres Inhaltsraster. Die Preise erhalten eine fast neutrale Fläche mit einem sehr feinen Punktmuster, die FAQ ein dezentes Muster. Icons in Karten verwenden dieselbe weiche Verlaufsfamilie mit der jeweils lokalen Palette; Warnicons bleiben rot. Hero-Badge und Bewertungsfläche nutzen Blur/Glas ohne zusätzlichen Badge-Verlauf. Die Bewertungsfläche enthält die vollständige Adresse, das Öffnungsbadge im Hero entfällt. Die Registrierungsfläche erhält zurückhaltende Lichtflächen, feine diagonale Linien und Grain.

Bewertungen: echtes manuell bedienbares Karussell, zwei Karten auf Desktop und eine auf kleinen Bildschirmen, Pfeile, Wischen, Tastatur (Pfeile/Home/End), Positionsanzeige. Kein automatischer Wechsel. Der zusätzliche Bewertungshinweis entfällt.

Footer: dynamischer Status der Theke mit Europe/Berlin-Zeitzone, Mo–Fr 16–19 Uhr und Sa 10–13 Uhr, Sonntag geschlossen, Feiertage in Baden-Württemberg berücksichtigt. Die Zeiten wurden gegen die zentrale Site-Core-Konfiguration und die öffentliche Website geprüft: https://lieferadresse-konstanz.ch/ . Das statische Muster berücksichtigt reguläre Zeiten und gesetzliche Feiertage; individuell in WordPress eingetragene Schließtage werden nicht synchronisiert. Dies ist im Titel des Status als reguläre Öffnungszeit gekennzeichnet. Click & Collect wird nicht mit der Thekenöffnung gleichgesetzt.

Bezeichnungen: CHASKI Lieferadresse und Industriegebiet. Das falsche Adressbeispiel in Schritt 2 wird durch „Deine CHASKI-ID im Adresszusatz“ im gleichen Fußzeilenstil wie die anderen Ablaufkarten ersetzt. Unnötige Rechnerlabels und die Aussagen „Direkt angebunden“ und „Staufrei anfahren“ entfallen.

Prüfbericht: `../../output/playwright/botanical-round-two-verification.md`. Die Originaldatei bleibt unverändert.

## Dritte Runde Browser-Anmerkungen

Die drei kleinen Hero-Icons verwenden wieder ihre vorherigen Hintergründe ohne zusätzliche Schatten. Listensymbole sind flach: helle einfarbige Grün- bzw. Warnrotflächen ohne Verlauf und Schatten. Der weich schattierte Verlaufsstil bleibt für größere Iconflächen erhalten. Im Ersparnis-Hinweis steht das Icon links vom Text. Das Bildlabel „Ein Name mit Geschichte“ entfällt. Karussellpfeile verwenden Material Symbols (`arrow_back`, `arrow_forward`). Die FAQ-Musterdeckkraft steigt von 0,45 auf 0,52, also um rund 16 Prozent.

Registrierungsfläche: stärker abgestufter Moosgrün-Verlauf, sanfte Randlichter, innerer Lichtsaum und räumlicher Schatten. Die Headline bleibt Weiß; Beschreibung und Zusatzinfos verwenden abgestufte, helle Grünweiß-Töne. Eine feine Trennlinie setzt Zusatzinfos von den Hauptaktionen ab. Keine neue bunte Akzentpalette.

Grenznähe wird als kompakte Standortnotiz mit `near_me`-Icon und kurzer Erklärung dargestellt, ohne separate leere Box. Footerstatus: „Laden geöffnet“/„Laden geschlossen“ mit grünem/rotem Punkt und neutraler Hinweisfläche. Die Öffnungslogik bleibt auf reguläre Zeiten und Feiertage bezogen.

Prüfung: Alle acht Listensymbole ohne Verlauf/Schatten, Ersparnis-Icon links, Karussell weiter bedienbar, Statusbeschriftungen für beide Zustände geprüft. Keine horizontalen Überläufe bei 1304, 768, 390 und 320 Pixeln. Screenshots: `../../output/playwright/botanical-round-three-registration.png` und `../../output/playwright/botanical-round-three-contact.png`.
