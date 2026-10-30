# CHASKI Icon-Pilot · 19. Oktober 2026

Drei eigenständig gezeichnete SVG-Entwürfe nach den bereitgestellten Stilreferenzen, mit den Farben aus `../design-system.css`. Lokaler Pilot, noch nicht in WordPress eingebaut oder veröffentlicht.

## Vorschau

`index.html` im Browser öffnen. Die Seite funktioniert auch direkt als lokale Datei. Enthalten: Weiß/Salbei/Moos, statische Ansicht, Interaktion, Schleife und drei Vorschaugrößen. Auf ein Icon klicken spielt eine Sequenz. Tastaturfokus und reduzierte Bewegung werden berücksichtigt.

Optional aus diesem Ordner: `python -m http.server 4528 --bind 127.0.0.1`, danach `http://127.0.0.1:4528/`.

## Dateien

- `icons/`: drei statische, editierbare SVG-Originale, 256 × 256, transparenter Hintergrund.
- `animated/`: drei eigenständige SVGs mit eingebetteten CSS-Animationen, 3,6 Sekunden inklusive Ruhephase und Unterstützung für `prefers-reduced-motion`.
- `motion.css`: Animationen für die Inline-Verwendung. Die Klasse `is-playing` am SVG startet sie.
- `preview.template.html`, `preview.css`, `preview.js`: Quellen der Vorschauseite.
- `build.mjs`: erzeugt die Vorschauseite und animierten Exporte. Aufruf: `node build.mjs`. Nutzt die lokalen Relaunch-Schriften.

Paket: Deckel hebt sich. Brief: Häkchen erscheint und federt ein. Download: Pfeil bewegt sich zur Ablage.

Die Farben sind fest in den SVGs hinterlegt. Es gibt keine eingebetteten Rasterbilder, externen Ressourcen oder Skripte in den SVGs. Beim mehrfachen Inline-Einfügen desselben SVGs müssen dessen IDs und Referenzen einen jeweils eindeutigen Präfix erhalten. Die Vorschauseite übernimmt das bereits. Die einzelnen animierten SVG-Dateien laufen eigenständig in einer Schleife. Für Interaktion und zentrale Steuerung auf der Webseite Inline-SVG und `motion.css` verwenden.

## Gestaltung und Quellen

Eine monochrome Familie aus Salbei und Moos, weiche Konturen, helle Flächen und plastische Schatten. Als illustrative Icons vor allem für 64 px und größer vorgesehen. Die Vorschau zeigt zusätzlich 32 und 48 px zur Beurteilung. Kleine UI-Symbole benötigen eine vereinfachte Ableitung. Auf dunklem Moos sind die dunklen Details bewusst tonig und weniger kontrastreich.

Workflows als Referenz verwendet, nicht global installiert:
- https://github.com/JKc66/custom-icons-skill — nativer SVG-Workflow und Strukturprüfung.
- https://github.com/upbrew-tech/svg-creator-skill — Rendern, visuelle Prüfung, Korrektur. Browser-Rendering anstelle der fest auf Claude/Linux-Pfade ausgelegten Hilfsdatei.

## Prüfung

Browserprüfung und Screenshots liegen unter `../../output/playwright/chaski-icons/`. Geprüft: lokale Schriften, eindeutige SVG-IDs und auflösbare Referenzen, Hintergrundwechsel, Animationen, Einzelwiedergabe, Tastaturfokus, reduzierte Bewegung, Layoutbreiten 320/390/768/1360 px, eigenständiger animierter Export sowie statische Ansicht und Downloads ohne JavaScript. Die Screenshots wurden visuell kontrolliert.

Die gestalterische Abnahme des Piloten steht noch aus.
