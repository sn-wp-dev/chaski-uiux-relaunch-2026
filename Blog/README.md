# CHASKI Blog: statische Relaunch-Entwürfe

- `code.html`: Blogübersicht mit elf unterschiedlichen Live-Beiträgen, Themenfilter und Suche.
- `beitrag.html`: Beispielartikel «Deutsche Lieferadresse für Schweizer: Wann lohnt sie sich?».
- `assets/`: lokale Schriften, optimierte Bilder, Styles und JavaScript. Keine externen Laufzeitbibliotheken oder Icon-API.
- `sources.json`: Herkunft der übernommenen Beiträge und Bilder, abgerufen am 16. September 2026.

Beide HTML-Dateien lassen sich direkt im Browser öffnen. Der Beispielartikel ist aus der Übersicht verlinkt; die übrigen Beiträge führen zu ihren bestehenden Live-URLs. Navigation und ergänzende Zoll-/MWST-Themen verweisen auf die vorhandenen Relaunch-Seiten. Registrierung und Login verweisen auf die Live-Website.

## Gestaltung und Inhalte

Plus Jakarta Sans, Moosgrün-Palette, Hintergrundbehandlung, Kopf-/Fussbereich und pillenförmige CTAs folgen den bereitgestellten Relaunch-Seiten. Es wurden keine neuen Markenfarben oder Schriftfamilien eingeführt. Die Google-Material-Icons sind direkt als SVG eingebunden.

Die Live-Übersicht wurde nach Beitrags-URL dedupliziert. Titel stammen aus der Quelle; Einleitung, Themenzuordnung und Kurzbeschreibungen wurden für eine verständlichere Übersicht neu formuliert. Bilder übernehmen die Kennzeichnung «KI-generiert» der Quelle. Das Artikelfoto stammt aus dem bestehenden lokalen CHASKI-Bildbestand.

Die fachlichen Abschnitte des Beispielartikels wurden übernommen und in Schweizer Schreibweise vereinheitlicht. Wiederholte Werbeblöcke und das Kommentarformular wurden entfernt. Ergänzt wurden Kurzfassung, Kosten-Checkliste und ein Quellenhinweis zu den Zollangaben. Die 150-Franken-Wertfreigrenze wurde mit https://www.bazg.admin.ch/de/wertfreigrenze-mehrwertsteuer-einreise-150-franken abgeglichen. Ausführliche Zoll- und MWST-Inhalte bleiben auf den dafür vorgesehenen Landingpages.

SEO-Grundlagen: individuelle Seitentitel und Beschreibungen, eine H1 je Seite, semantische Abschnitte, interne Verlinkung, CollectionPage-/ItemList- bzw. BlogPosting-Daten. Die Entwürfe wurden nicht veröffentlicht oder in WordPress integriert.

## Prüfung

Browserprüfung bei 320, 390, 768, 1024 und 1440 Pixeln: keine horizontalen Seitenüberläufe, fehlenden Bilder oder JavaScript-Fehler. Themenfilter, kombinierte Suche, Leerzustand, Rücksetzen, Artikelwechsel, mobile Navigation inklusive Escape, FAQ und Inhaltsverzeichnis-Sprungmarken erfolgreich geprüft. Lokale Dateilinks und Anker auf Vorhandensein geprüft. Elf Beitrags-URLs in der Übersicht, keine Duplikate.

Ohne JavaScript bleiben alle Beiträge und der vollständige Artikel verfügbar; Such-/Filterwerkzeuge werden erst mit JavaScript eingeblendet. Das Inhaltsverzeichnis und die FAQ verwenden native Details-Elemente.
