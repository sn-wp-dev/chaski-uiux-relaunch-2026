# Überarbeitung vom 30.10.2026

Lokaler HTML-Entwurf: `code-alternative-firecrawl.html`. Kein Deployment. Ergänzt die ursprüngliche `FIRECRAWL-ANALYSE.md`, deren Beschreibungen zu ASCII, Preisen und fehlendem Social Proof durch diese Revision überholt sind.

## Abnahme der Kommentare

| Nr. | Änderung |
|---|---|
| 1 | Original Google Material Symbol `pallet`, Gewicht 400. Transparente Plattform entfernt. |
| 2 | Registrierung im Header mit dunkler Primärfarbe, größerem Klickziel und kräftigerem Text. |
| 3 | Beide Sterne im Hero entfernt. |
| 4 | Hero und Preiseinstieg verwenden ganze Einheiten desselben 12-Spaltenrasters. Container-Einheiten berücksichtigen die verfügbare Breite inklusive Scrollbar. |
| 5 | ASCII-Motiv entfernt. Dezente durchgehende Rasterlinien mit abgeschwächtem Kontrast und lokalen Material-Paketmotiven. |
| 6 | Unklarer Abholart-Umschalter durch „Was kostet mein Paket?“ mit Einstiegspreis und direktem Sprung zum Rechner ersetzt. |
| 7 | Frei schwebende Länder-Pills entfernt. Deutschland ist jetzt direkt der CHASKI-Kachel zugeordnet. |
| 8 | Schweiz steht in der Zuhause-Kachel. Hinweis unter dem Ablauf erklärt die eigene Abholung. |
| 9 | Vorteilsband zeigt Click & Collect statt Retouren. |
| 10 | „So holst du deine Sendung ab“ verlinkt `So funktionierts/code.html#schritt-3`. |
| 11 | Missverständliche geografische Ringgrafik ersetzt durch eindeutige Standortangabe CHASKI in Konstanz mit Straße und Sprung zur Karte. |
| 12 | ASCII-Hintergrund durch ein zurückhaltendes Fach-/Schließfachraster ersetzt. |
| 13 | Preise, Größen, Rechner für Standardpakete und Sperrgut sowie Lagerzuschläge ergänzt. |
| 14 | Echter Google-Maps-Kartenausschnitt vom Standort, inklusive Google-Logo und Kartenattribution. Keine private Kontonavigation im Ausschnitt. Klick öffnet Google Maps. |
| 15 | Aktuelle Shopzeiten und berechneter Status im Standortbereich. |
| 16 | Gleiche Shopzeiten und Status im Footer. |
| 17 | Schmale, helle Hinweisleiste mit Schließen-Schaltfläche. Auswahl bleibt für die Browsersitzung erhalten. |

Zusätzlich: kompakter Google-Vertrauenshinweis und eigener Bereich mit drei echten, als Auszüge gekennzeichneten Rezensionen. Alle Icons sind lokale Google Material Symbols Outlined, Gewicht 400. Buttons verwenden die projektweit festgelegte Pillform.

## Quellen und Faktenentscheidungen

- Preise und Größen: https://lieferadresse-konstanz.ch/ am 30.10.2026 geprüft. Standard XS/S/M/L/XL/XXL: 3/4/5/7/10/15 €. Berechnungsmaß: längste plus kürzeste Seite. Schwellen: 35/50/80/120/150/200 cm. Über 200 cm wird keine pauschale Gebühr erfunden, sondern zum Sperrgut-Rechner verwiesen.
- Sperrgut: Gurtmaß = längste Seite + zweimal die übrigen Seiten. Bis 350 cm 20 €, bis 500 cm 25 €, darüber Anfrage. Europalette bis 120 × 80 cm 25 €, PKW auf Anfrage. Briefe 1,50 €, Versandtasche bis 35 cm 3 €. Lagerzuschläge XS/S/M 0,50 €/Tag ab Tag 31, L/XL/XXL 1 €/Tag ab Tag 31, Sperrgut/Palette 5 €/Tag ab Tag 15. Speditionslieferungen vorher absprechen.
- Öffnungszeiten: https://lieferadresse-konstanz.ch/kontakt/ am 30.10.2026 geprüft. Montag bis Freitag 16–19 Uhr, Samstag 10–13 Uhr. Die älteren Zeiten in `Startseite/code.html` wurden ausdrücklich nicht übernommen.
- Status: lokale Kopie des bestehenden `wp-content/themes/enfold-child/js/chaski-shop-status.js`, berechnet nach Europe/Berlin und Feiertagen in Baden-Württemberg. Reguläre Zeiten, keine Anbindung an kurzfristige Betriebsausnahmen. Der Hinweis „Reguläre Shopzeiten“ grenzt dies im Entwurf ein.
- Standort und Bewertungen: https://www.google.com/maps?cid=10319694012785641856 am 30.10.2026 direkt im Browser geprüft. Google zeigte 4,8 Sterne und 81 Rezensionen. Die Nutzerangabe von 4,7 wurde deshalb auf den verifizierten Stand aktualisiert. Der Bewertungsstand ist eine datierte Momentaufnahme, keine Live-API.
- Drei sichtbare Originalrezensionen von Stefanie Kuechler, Karin Burri und Larisa Velickovic wurden gelesen. Kurze wörtliche Auszüge, keine erfundenen Texte, Zeitangaben oder Profilbilder. Links öffnen das Unternehmensprofil mit den Originalrezensionen.
- Screenshot: `assets-firecrawl/google-maps.png`, ausschließlich Kartenbereich mit unveränderter Kartenbeschriftung und Quellenattribution. Statische lokale Grafik, keine automatische Google-Verbindung beim Seitenaufruf.

## Prüfung

Browser: Codex-In-App-Browser für visuellen Abgleich und Preiseinstieg, lokales Playwright für reproduzierbare Viewports und Zeitfälle. Der separate Browser-Plugin-Skill ist nicht verfügbar. Keine neuen Browser-Abhängigkeiten installiert.

- 1440, 1050, 768, 390 und 320 px: kein Überlauf, eine H1, Bilder vollständig, keine JavaScript-Fehler oder fehlgeschlagenen Ressourcen.
- 19 Rechnerfälle: alle Paketschwellen und unmittelbare Überschreitungen, Dezimalmaße, gedrehte Maßreihenfolge, mehrere gleiche Pakete, Nullmaße, ungültige Anzahl, beide Sperrgutgrenzen und Anfragefall.
- 7 Statusfälle: Werktag offen/geschlossen, Samstag offen/geschlossen, Sonntag, Dreikönig und Karfreitag.
- Hinweis schließen und nach Reload ausgeblendet, mobiles Menü mit Escape, Adressansichten, Zwischenablage, FAQ per Tastatur, reduzierte Bewegung und FAQ ohne JavaScript.
- Ohne JavaScript bleiben alle Tarife sichtbar. Eine Erklärung weist auf die JavaScript-Anforderung des Rechners hin. Konto- und Click-&-Collect-Ziele bleiben vorhandene lokale Entwürfe.
- Ergebnisdatei: `assets-firecrawl/qa-results.json`. Bildschirmaufnahmen: `preview-desktop.png`, `preview-mobile.png`, `preview-prices.png`, `preview-location.png`, `preview-reviews.png`, ganze Seite in `preview-1440.png` und `preview-390.png`.
