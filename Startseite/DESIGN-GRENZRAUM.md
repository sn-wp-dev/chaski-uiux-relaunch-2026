# Designalternative Grenzraum

## Vorabentscheidung

Eigenständiger Neustart am 9. Oktober 2026. Keine vorhandene Homepagealternative wurde zur Form-, Layout- oder Inhaltsentwicklung geöffnet. Grundlage sind der tatsächliche CHASKI-Service, aktuelle Primärquellen, acht visuell untersuchte Referenzseiten und die Originalfotos.

<design_plan>
- Aufgabe: Schweizer Einwohner verstehen die persönliche Abholung in Konstanz, können ihre Annahmegebühr einschätzen und registrieren sich kostenlos.
- AIDA: sofortige Dienstklärung → interaktiver Ablauf/Preis → praktische Hilfe und Abholwahl → Registrierung.
- Hero: Cinematic Center. H1 breit zentriert, zwei Zeilen ab Desktop, höchstens drei Zeilen mobil. Zwei Hero-Aktionen, eine klare Hauptaktion.
- Schrift: Satoshi, lokal. Normaler Satz, große Buchstaben und bewusste Zeilenführung statt dauernder Großschreibung.
- Palette: Weiß #FFFFFF, Eis #F3F6FA, Navy #142D3F, Kobalt #174BF2, Koralle #FF6748. Sekundärtext #536577, Linien #D8E1EB. Kontrastprüfung im Browser/QA.
- Raster: 12 Spalten bei 1200 px Maximalbreite, 24 px Zwischenraum. Interaktiver Bereich 7/5, Fotokarten 5/7. 32 px Innenabstand. Mobil eine Spalte, keine horizontale Bewegung als Bedienvoraussetzung.
- Komponenten: interaktive Paketmaße, kleine Fotokapsel in der Headline, Abholvergleich. Deterministische tatsächliche Python-Auswahl vor Umsetzung: Cinematic Center / Satoshi / Interactive parcel dimensions + Inline Typography Images + Service comparison / Scrub text + Card stacking.
- Bewegung: GSAP und Three.js. Paketübergaben erklären Zuständigkeiten. Rechner verändert dasselbe Paket. Zwei Bilderkarten überlagern sich beim Scrollen, ein Satz erhält eine behutsame Wortbetonung. Kein endloser Renderloop, keine automatisch schwebenden Objekte, keine Scrollübernahme.
- Barrieren: Inhalte ohne JavaScript lesbar, SVG statt WebGL bei Ausfall, reduzierte Bewegung statisch, native Links/Formulare/FAQ/Dialog, sichtbarer Tastaturfokus.
- Conversion: Hypothesen anhand der Forschung, kein behaupteter oder erfundener gemessener Erfolg.
</design_plan>

## Quellen und Abgrenzung

Siehe RECHERCHE-NEUSTART.md. Verbindliche Servicefakten aus P0-verbindliche-fakten.md und den aktuellen Originalseiten. Fremde Seiten liefern Aufgabenmuster, keine kopierten Layouts oder Grafiken.

## Medien

Originalfotos aus BIlder: Innenansicht 13 (Übergabe), Innenansicht 7 (Packstation), Außenansicht 2 (Standort), IMG-20240523-WA0188 (Umkleide). Nur Größenoptimierung nach WebP. Keine Kundendaten oder Zugangscodes. Das 3D-Paket ist eine funktionale Illustration, kein Foto des Ladenbetriebs.

## Bibliotheken

GSAP 3.15.0, ScrollTrigger 3.15.0 und Three.js 0.186.1 lokal aus den offiziellen npm-Paketen. Satoshi 400/500/700/900 von Fontshare lokal. Lizenzhinweise der Anbieter beachten.

## Prüfungen

Abgeschlossen: 76 gezielte Assertions für die Bedienlogik und Tarifgrenzen sowie 48 Browserprüfungen. Desktop, Tablet und Mobilansichten mit 1440, 1024, 768, 390 und 320 px ohne horizontalen Überlauf, fehlende Bilder oder JavaScript-Fehler. Geprüft: Ablaufwahl, Preismodus, Paket- und Lagergebühren, Sonderfälle, Tabs per Tastatur, Dialog mit Escape/Fokusrückgabe, FAQ, kontrastierender Fokus, reduzierte Bewegung, ruhende Szene außerhalb des Bildschirms, Verlust des WebGL-Kontexts und lesbare Inhalte ohne JavaScript. WebGL-Prüfung in Chromium mit Software-Rendering. Echte Mobilgeräte und echte Nutzertests waren nicht Gegenstand dieser lokalen Gestaltung.


## Ergebnis und Umsetzung

- Neu angelegte HTML-, CSS- und JavaScript-Dateien. Die bestehenden Alternativen bleiben erhalten.
- Schwebende Navigation, zentrierter Hero mit kleiner Originalfotografie, interaktiver Ablauf und Preishilfe am selben 3D-Paket.
- Größen werden relativ zur längsten Kante maßstäblich angezeigt, auch bei sehr flachen Sendungen. Die Bühne wird nur bei Bedarf gerendert.
- Zwei echte Fotobereiche mit dezenter Kartenüberlagerung, lesbare Wortbetonung, Abholvergleich und vollständige Annahmegebühren.
- Mobile Eingaben stehen vor dem Ergebnis. Ohne JavaScript führen Preislinks direkt zur vollständigen Tarifübersicht.
- Alle Bilder und Schriften lokal. Satoshi-Lizenz vollständig in assets-grenzraum/LICENSE-Satoshi.txt. Die Fontdateien wurden nicht verändert.
- Three.js derselben Version als lokal gespeichertes minimiertes Bundle: rund 747 KB statt 2,12 MB für zwei unminimierte Module. Das ist eine Dateigrößenoptimierung, kein gemessener Ladezeit- oder Conversion-Effekt.
- Die CSS-Datei wurde lesbar formatiert. Sämtliche browserseitig geparsten CSS-Regeln sind unverändert geblieben.

### Lokale Vorschau

http://127.0.0.1:60051/Startseite/code-alternative-grenzraum.html

Für eine spätere Vorschau Relaunch-2026 mit einem lokalen HTTP-Server bereitstellen. Ein einfacher Dateiaufruf kann das JavaScript-Modul für Three.js wegen Browserbeschränkungen nicht laden. In diesem Fall bleibt die SVG-Illustration erhalten.

### Nachweise

Außerhalb des Repositorys, im Codex-Visualisierungsordner dieser Aufgabe:
- grenzraum-ui-check.cjs: 76 gezielte Assertions.
- grenzraum-final-report.json: 48 bestandene Browserprüfungen.
- grenzraum-polish-report.json: CSS-Regelgleichheit und minimiertes 3D-Bundle.
- grenzraum-final-desktop.png, grenzraum-final-mobile.png, grenzraum-final-full.png und weitere Zustandsbilder.

### Grenzen und sinnvoller nächster Schritt

Lokale Designalternative, kein Live-Deployment. Preise und Betriebsangaben wurden mit den vorhandenen verbindlichen Fakten und den aktuellen Originalseiten abgeglichen. Vor einer Veröffentlichung erneut gegen den dann gültigen Stand prüfen. Für Conversion-Aussagen sind Nutzertests bzw. ein A/B-Test notwendig. Insbesondere messen: abgeschlossene Registrierungen, Nutzung der Preishilfe, Rückfragen zum Ablauf und mobile Abbrüche.
