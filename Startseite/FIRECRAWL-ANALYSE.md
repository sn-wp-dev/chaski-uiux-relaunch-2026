# Firecrawl → CHASKI: UI/UX-Analyse und alternative Startseite

Stand: 19. Oktober 2026. Referenz: https://www.firecrawl.dev/

## Umfang und Belege

Die öffentliche Firecrawl-Homepage wurde im echten Browser vom Ankündigungsbanner bis zum vollständigen Footer betrachtet. Dabei wurden die aufeinanderfolgenden Abschnitte in kleinen Scroll-Schritten visuell geprüft. Desktop-Navigation und das große Produktmenü wurden geöffnet. Der Scrape-Umschalter der Hero-Demo wurde geprüft. Überschriften und ihre berechneten Schriftwerte wurden aus dem DOM ausgelesen. Die mobile Homepage wurde zusätzlich bei 390 × 844 px aufgenommen.

Das ist eine Analyse der vollständigen öffentlichen Startseite, keine vollständige Prüfung aller verlinkten Produktseiten, des angemeldeten Produkts oder jedes einzelnen Demo-Zustands. Dynamische Zahlen und Illustrationen können sich zwischen Aufnahmen ändern. Die Referenz ist eine laufend veränderte Website.

Das CHASKI-Mockup liegt in `code-alternative-firecrawl.html`. Gestaltung und Interaktionen liegen unter `assets-firecrawl/`. Die bisherigen Startseiten bleiben erhalten. Keine WordPress-Integration, Veröffentlichung oder Änderung am Live-System.

## 1. Visuelles System der Referenz

**Grundstruktur.** Die Website erscheint wie ein technisches Arbeitsblatt: fast weiße Flächen, durchgehende dünne Linien, ein umrahmter Seitenkörper und sichtbare Rasterkreuzungen. Abschnitte sind meist zusammenhängende Flächen statt frei schwebender Karten. Die Typografie und die Illustrationen tragen die Hierarchie. Kleine abgerundete Zellen und feine innere Rahmen geben dem Raster eine weichere Anmutung.

**Farbe.** Ein sehr konzentrierter Orange-Akzent kennzeichnet Aktionen, einzelne Wörter, aktive Zustände und technische Details. Große Teile der Seite bleiben neutral. Erst die Alexandria-Sektion wechselt in eine vollflächige Akzentfarbe. Dieses Verhältnis von neutraler Fläche und gezielter Hervorhebung ist entscheidender als ein bloßer Farbtausch an Buttons.

**Typografie.** Im untersuchten Desktop-Viewport: Suisse, Schriftgewicht 500, H1 60 px mit −0,3 px Laufweite. Zentrale H2 stehen bei 52 px und −0,52 px, Split-Headlines bei 40 px und −0,4 px. Relativ geringe Gewichte, knappe Zeilenabstände und große ruhige Textflächen ergeben den charakteristischen Look. Kleine technische Texte und Kapitelnummern verwenden eine Monospace-Anmutung. Fließtext ist deutlich zurückgenommen, aber der Farbkontrast mancher Referenzbeschriftungen fällt gering aus.

**Abstände und Formen.** Große vertikale Pausen zwischen Themen, dichte Bedienelemente innerhalb einer Demo. Das Raster verläuft über Abschnittsgrenzen hinweg. Buttons sind kompakte, moderat gerundete Rechtecke. Kleine Badges und ausgewählte Bedienelemente sind pillenförmig. Feine Schatten kennzeichnen interaktive oder aufgesetzte Elemente, nicht jede Inhaltsfläche.

**Bildsprache.** ASCII-Landschaften, Punktmuster, Pixelzeichen, schematische Browserfenster, Codezeilen und Leitungsdiagramme. Eine Mischung aus echtem Text, bewegter Illustration und UI-Simulation ersetzt klassische Hero-Fotografie. Charakteristisch sind die geringe Deckkraft und die oft nur teilweise sichtbaren Illustrationen.

## 2. Informationsarchitektur und Seitenrhythmus

| Referenzabschnitt | UI-/UX-Rolle | Übertragung auf CHASKI |
|---|---|---|
| Ankündigung und sticky Header | Neuigkeit, Orientierung, schnelle Anmeldung | 24/7-Abholung, Servicemenü, Registrierung |
| Zentrierter Hero mit Badge und zwei Aktionen | Nutzenversprechen und direkter Einstieg | Deutsche Lieferadresse, Registrieren, Ablauf |
| Eingabefeld mit Modi | Angebot schon vor der Anmeldung ausprobieren | Wahl zwischen Shop und 24/7-Abholung |
| Großes Demo-Fenster | Abstraktes Produkt greifbar machen | Paketweg und korrektes Adressmuster |
| Logo-/Vertrauensband | Soziale Bestätigung | Vier belegte Servicevorteile statt erfundener Logos |
| Main Features und Code-Tabs | Leistungsumfang und schnelle Anwendung | Registrieren, Bestellen, Abholen und Adressdarstellung |
| Agent-Anbindung | Einstieg in bestehende Werkzeuge | Checkout-Ansicht der Adresse |
| Leistungs-Bento | Leistungsversprechen visuell belegen | Lagerzeiten, große Sendungen, Retouren, Standort |
| Weitere Features und Use Cases | Mehr Anwendungssituationen sichtbar machen | In die CHASKI-Services integriert, um Wiederholungen zu vermeiden |
| Alexandria in Vollfarbe | Eigenständiges Angebot hervorheben | Click & Collect in tiefem Moosgrün |
| Testimonials | Zweifel vor der Registrierung abbauen | Belegte Konditionen und echter Shop statt erfundener Kundenstimmen |
| Schluss-CTA | Erneuter Einstieg nach der Information | Registrierung mit vier Vorteilen |
| FAQ in geteiltem Raster | Einwände thematisch beantworten | Konto, Adressierung, Lagerung und Abholung |
| Umfangreicher Footer | Weitere Orientierung, Rechtliches, Vertrauen | CHASKI-Angebot, Konto, Shop, rechtliche Links |

Die Referenz verwendet nummerierte Kapitelbänder, teilweise mit wiederholter Nummerierung. Das Mockup übernimmt das Muster mit einer konsistenten Abfolge 01 bis 06.

## 3. Interaktion und Zustände

**Navigation.** Der sticky Header bleibt während des Scrollens sichtbar. Das Produktmenü der Referenz ist ein breites, dreispaltiges Mega-Menü mit Angebotsgruppen, erklärenden Unterzeilen und einer hervorgehobenen Themenfläche. Das Mockup übersetzt dieses Muster in CHASKI-Services. Es lässt sich per Tastatur öffnen, durch Escape schließen und schließt nach der Auswahl. Auf kleinen Bildschirmen wechselt die Navigation in ein aufklappbares Menü.

**Hero.** Die Referenz verknüpft ihre Modusauswahl mit dem nächsten Handlungsschritt. Das CHASKI-Mockup ändert beim Wechsel zwischen Shop und Click & Collect sowohl den erklärenden Text als auch das Linkziel. Der aktive Zustand wird optisch und mit `aria-pressed` vermittelt. Es gibt keine erfundene Sendungsverfolgung und keine Eingabe von Kundendaten.

**Adressdarstellung.** Die Code-/Formatumschalter der Referenz werden zu „Adresszeilen“ und „Im Checkout“. Beide Ansichten verwenden das bestätigte CHASKI-Adressschema. Die Kopierfunktion kopiert ausschließlich ein erkennbares Muster mit Platzhaltern. Falls die Zwischenablage nicht verfügbar ist, wird der Text für manuelles Kopieren markiert.

**FAQ.** Themennamen stehen links, die Fragen rechts in einem durch Linien getrennten Stapel. Native `details`-Elemente halten Inhalt und Tastaturbedienung auch ohne JavaScript zugänglich. Der Zustand wird zusätzlich über die Richtung des Chevron-Symbols deutlich.

**Motion.** Die Referenz enthält zahlreiche automatisch animierte Demos, Zähler, Laufschriften und wechselnde Inhalte. Das Mockup übernimmt die technische Bildsprache, verwendet aber statische deterministische ASCII-Illustrationen und gezielte Zustandswechsel. Es simuliert keine Betriebsdaten. `prefers-reduced-motion` schaltet weiches Scrollen und Übergänge ab.

## 4. Mobile UX

Die mobile Referenz reduziert die Navigation auf das Logo und einen Menüschalter, verwendet eine schmale Einfassung und stapelt ihre Hauptaktionen über die gesamte Inhaltsbreite. Der Hero verzichtet weitgehend auf das große Desktop-Raster. Die Headline wird deutlich mehrzeilig, die Demo ist eine schmale Eingabekarte.

Das Mockup folgt diesem Prinzip mit gestapelten Hero-Aktionen, einer reduzierten Hero-Fläche, einzeln stehenden Ablauf- und Leistungsmodulen sowie übereinander angeordneten FAQ-Gruppen. Die Registrierung bleibt zusätzlich im mobilen Header erreichbar. Die mit 320 px geprüfte Minimalbreite hat keinen horizontalen Überlauf.

## 5. CHASKI-Farbzuordnung

Quelle: `../DESIGN-SYSTEM.md`, gegengeprüft mit `../DESIGN.md`. Für diese ausdrücklich gewünschte Alternative sind Formen, Raster und Layout der Firecrawl-Referenz maßgeblich. Es werden nicht die üblichen CHASKI-Pillbuttons oder das bestehende Zwei-Spalten-Hero erzwungen.

| Rolle | Farbe |
|---|---|
| Seitenfläche | `#F6F8F3` |
| Weiße UI-Flächen | `#FFFFFF` |
| Sekundäre Fläche | `#EDF1E7` |
| Salbei-Tönung | `#E3EAD8` |
| Primäre Aktionen und Vollfläche | `#2D351B` |
| Hover-/Pressed-Farbe | `#252D15` |
| Hervorgehobener Text | `#586937` |
| Haupttext | `#191C19` |
| Begleittext | `#4E5549` |
| Raster und Trennlinien | `#DDE4D4` |

Die kommerzielle Suisse-Schrift der Referenz wurde nicht übernommen. Arial/Helvetica bildet im Mockup die neutrale Schweizer Grotesk-Anmutung nach. Das vorhandene originale CHASKI-Logo und ein echtes vorhandenes Shopfoto werden lokal eingebunden. Es werden keine Firecrawl-Marken, Kundenlogos, Kundenzitate oder proprietären Illustrationsdateien übernommen. Die ASCII-Motive und Logistikdiagramme sind neu für CHASKI erstellt.

## 6. Fachliche Grenzen und Verlinkungen

Die verbindlichen Betriebsdaten stammen aus `SEO-Strategie/2026-09-21-Bestandsaufnahme/P0-verbindliche-fakten.md` im CHASKI-Hauptordner. Berücksichtigt sind Schweizer Wohnsitz, selbstständige Kontoaktivierung über die Bestätigungs-E-Mail, separate Freischaltung des 24/7-Zugangs, 30/14 Kalendertage Lagerung ab Eingangsbestätigung, das korrekte Adressschema und ausschließlich vorfrankierter kostenloser Versand für registrierte Kunden mit Schweizer Wohnsitz.

Registrierung, Login und Click & Collect verlinken vorhandene lokale Relaunch-Mockups. Diese Links sind keine echte Registrierung und keine produktive Kundenkontoanbindung. Die Preisübersicht verlinkt den vorhandenen Preisabschnitt in `code.html#preise`, dessen inhaltliche Neuprüfung außerhalb dieses Entwurfs liegt. Rechtliche Links führen auf die bestehende Website. Die Anfahrt öffnet Google Maps erst nach einem Klick.

## 7. Prüfung

Automatisierte Browserprüfung: `assets-firecrawl/verify.cjs`, Ergebnisse: `assets-firecrawl/qa-results.json`. Desktopprüfung zusätzlich im Codex-Browser. Für reproduzierbare Viewports und den mobilen Referenzabgleich wurde lokales Playwright verwendet, da die verfügbare IAB-Oberfläche keine direkte Resize-Methode bereitstellte und der separate Playwright-MCP-Aufruf nicht zeitnah zurückkam.

Geprüft wurden 1440, 1050, 768, 390 und 320 px, jeweils genau eine H1, keine horizontalen Überläufe, keine fehlenden Bilder, keine JavaScript-Fehler, Abholart-Umschalter, Adressansichten, Kopierfunktion und FAQ per Enter. Zusätzlich mobiles Menü inklusive Escape, reduzierte Bewegung und FAQ ohne JavaScript. Screenshots liegen im Assetordner. Der visuelle Abgleich betrifft Raster, Hero-Hierarchie, Kapitelzeilen, UI-Größen, Bento-Struktur, vollfarbige Angebotsfläche, mobile Aktionsanordnung und FAQ-Raster.

Bewusste Abweichungen: CHASKI-Farben und Inhalte, Original-CHASKI-Logo, Ersatzschrift, reduzierte Seitenlänge, keine Kundenstimmen, kein Backend und statische statt automatisch animierte Illustrationen. Es handelt sich um eine designgetreue Übertragung der Referenzsprache, nicht um eine pixelidentische Kopie der Firecrawl-Seite.
