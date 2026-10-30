# FAQ: redaktionelle Hinweise

Stand: 15.09.2026. Statischer Entwurf, keine Veröffentlichung.

- Inhalte der aktuellen FAQ übernommen, doppelte Fragen zur Abholbenachrichtigung zusammengeführt.
- Ergänzt: Registrierung, Kosten, Bestelladresse, Bezahlung, Abholung ausserhalb der Öffnungszeiten und die Verlinkung der beiden Zoll-/MWST-Ratgeber. Grundlage: bereitgestellte Relaunch-Seiten.
- Live-FAQ korrigiert: 150 CHF gelten als MWST-Wertfreigrenze bei persönlicher Einreise, nicht pauschal bei Postsendungen. Bei Überschreitung ist der gesamte Warenwert relevant. Freimengen sind separat zu beachten.
- Die im gelieferten FAQ-Dokument angegebenen Paket-, Lager- und Versandgebühren wurden übernommen. Darüber hinaus wurden keine neuen Preise oder Serviceversprechen ergänzt. Zahlung bleibt auf die in „So funktioniert’s“ angegebenen Methoden begrenzt.
- 43 zusammengeführte Fragen in sechs Kategorien aus 49 gelieferten Frageformulierungen. Zusammengelegt wurden Abholbereitschaft/Benachrichtigung, Click & Collect/Abholung ausserhalb der Öffnungszeiten, Lagerfrist/Entsorgung, Wertfreigrenze pro Artikel/Postsendung und die beiden Speditionsfragen. Die Fragen werden aus der redaktionellen FAQ-Datenstruktur in `assets/faq.js` aufgebaut; die vorhandenen HTML-Fragen dienen als Fallback-Struktur ohne JavaScript.
- Lokale Schriftdateien und Logos aus Services übernommen. Foto: dortiges filiale-13.jpg. Material-Icons als eingebettete SVG-Pfade, kein Icon-CDN. Die sechs Kategorien entsprechen den Kategorien im gelieferten FAQ-Dokument.

## Quellen
- https://lieferadresse-konstanz.ch/faq-deutsche-lieferadresse/
- https://www.bazg.admin.ch/de/wertfreigrenze-mehrwertsteuer-einreise-150-franken
- Referenzdateien: Startseite, So funktionierts, Services, SEO-Landingpage/code-alternative.html, SEO-Landingpage-Alt/code.html und DESIGN.md.

## Prüfung
- Browserbreiten: 320, 390, 768, 1024 und 1440 Pixel ohne Seitenüberlauf.
- Suche, Nulltreffer, Zurücksetzen, alle Antworten öffnen/schliessen, Sprunglinks und Mobilmenü geprüft.
- 43 Fragen und sechs Kategorien werden im Browser aufgebaut; die nativen Akkordeons bleiben bei deaktiviertem JavaScript als bestehender Fallback verfügbar.
- Lokale Links, Sprungziele, Bilder und JavaScript-Syntax geprüft.
