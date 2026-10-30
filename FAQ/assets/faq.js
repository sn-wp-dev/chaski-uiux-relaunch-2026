(() => {
  const paths = {
    person: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    box: 'M21 8l-9-5-9 5v10l9 5 9-5V8zm-9-2.71L17.74 8 12 10.71 6.26 8 12 5.29zM5 9.67l6 3v7.66l-6-3V9.67zm8 10.66v-7.66l6-3v7.66l-6 3z',
    clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    pay: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z',
    return: 'M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z',
    search: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    arrow: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
    check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
  };
  const icon = name => '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + paths[name] + '"/></svg>';
  const faqData = [
    { id: 'bestellung', title: 'Bestellung, Registrierung und Adressierung', icon: 'person', questions: [
      { id: 'einlagerung', q: 'Wie funktioniert die Einlagerung meiner bestellten Pakete bei CHASKI?', a: 'Registriere dich zunächst kostenlos bei CHASKI und bestätige deine E-Mail-Adresse. Danach erhältst du deine persönliche Kundennummer. Verwende bei deiner Bestellung diese Adressstruktur:<br><br><strong>CHASKI XX-123456<br>c/o Vorname Nachname<br>August-Borsig-Strasse 2a<br>78467 Konstanz</strong><br><br>Ersetze XX-123456 durch deine Kundennummer und trage deinen eigenen Namen in der c/o-Zeile ein. CHASKI darf ausschliesslich als <strong>Lieferadresse</strong> verwendet werden. Als Rechnungsadresse gibst du deine eigenen persönlichen Daten an.' },
      { id: 'registrieren', q: 'Wie registriere ich mich bei CHASKI und wann erhalte ich meine Kundennummer?', a: 'Du kannst dich <a href="https://lieferadresse-konstanz.ch/registrierung/">kostenlos online registrieren</a>. Nach der Registrierung bestätigst du deine E-Mail-Adresse. Sobald dein Konto aktiviert ist, erhältst du deine persönliche Kundennummer. Diese Nummer gehört zu jeder Bestellung an deine CHASKI-Lieferadresse.' },
      { id: 'nutzer', q: 'Wer kann CHASKI nutzen?', a: 'Für die Nutzung der CHASKI-Lieferadresse musst du registriert und mindestens 18 Jahre alt sein. Das Angebot richtet sich besonders an Kundinnen und Kunden aus der Schweiz. Für den Versand ab CHASKI gilt zusätzlich, dass du deinen Wohnsitz in der Schweiz haben musst.' },
      { id: 'vorbestellung', q: 'Muss ich vor der Bestellung bei CHASKI registriert sein?', a: 'Ja. Registriere dich vor deiner Bestellung und warte auf die Bestätigung deines Kundenkontos sowie deine persönliche Kundennummer. Ohne eindeutige Kundennummer kann eine Sendung nicht zuverlässig zugeordnet und bearbeitet werden.' },
      { id: 'angaben', q: 'Welche Angaben muss ich bei einer Bestellung im Online-Shop machen?', a: 'Verwende die von CHASKI vorgegebene Lieferadresse aus deinem Kundenkonto. Deine persönliche Kundennummer gehört in die erste Zeile, dein Vor- und Nachname in die c/o-Zeile. Als Rechnungsadresse verwendest du deine eigenen persönlichen Daten. CHASKI darf nicht als Rechnungsadresse eingetragen werden. <a href="https://lieferadresse-konstanz.ch/mein-konto/">Lieferangaben im Kundenkonto ansehen</a>.' },
      { id: 'teillieferungen', q: 'Was muss ich bei mehreren Paketen oder Teillieferungen beachten?', a: 'Verwende bei jeder Bestellung und bei jedem einzelnen Paket deine persönliche CHASKI-Kundennummer. Teillieferungen können an unterschiedlichen Tagen eintreffen. Die Lagerfrist beginnt für jedes Paket mit seinem Eingang bei CHASKI. Prüfe beim Online-Shop, ob die Bestellung in mehreren Paketen versendet wird, und bewahre alle Sendungsnummern auf.' },
      { id: 'onlineshop', q: 'Liefert jeder Online-Shop an die CHASKI-Adresse?', a: 'Nein. Prüfe vor der Bestellung, ob der Online-Shop an eine deutsche Lieferadresse oder Paketannahmestelle liefert. Achte auf Versandart, Versanddienstleister, Teillieferungen und besondere Anforderungen des Händlers. Speditionslieferungen, Paletten und besonders grosse Sendungen müssen vorher mit CHASKI abgesprochen werden.' },
      { id: 'zustellung', q: 'Müssen Lieferungen während der Öffnungszeiten zugestellt werden?', a: 'Ja. Lieferungen müssen während der regulären Öffnungszeiten von CHASKI zugestellt werden. Die 24/7-Abholung über Click & Collect bedeutet nicht, dass Lieferungen rund um die Uhr angenommen werden können. Kläre besondere Lieferzeiten vorher mit CHASKI.' },
      { id: 'unerlaubt', q: 'Welche Waren dürfen nicht an CHASKI geliefert werden?', a: 'An CHASKI dürfen keine illegalen oder lebenden Waren geliefert werden. Für bestimmte Waren gelten zudem Einfuhrverbote, Beschränkungen oder Bewilligungspflichten, zum Beispiel für Waffen, Betäubungsmittel, bestimmte Medikamente, geschützte Tier- und Pflanzenarten, Fälschungen oder pyrotechnische Artikel. Informiere dich vor der Bestellung über die geltenden Vorschriften.' },
      { id: 'zuordnung', q: 'Was passiert, wenn meine Sendung nicht richtig zugeordnet werden kann?', a: 'Sendungen ohne eindeutige Zuordnung werden zunächst nicht weiterbearbeitet. Melde dich möglichst schnell bei CHASKI und nenne deine Kundennummer, Sendungsnummer und Kontaktdaten. Alternativ kannst du die <a href="https://lieferadresse-konstanz.ch/lost-found/">Lost-&amp;-Found-Suchanfrage</a> in deinem Kundenkonto nutzen. Meldet sich innerhalb der geltenden Lagerfrist niemand, wird die Sendung entsorgt.' }
    ]},
    { id: 'abholung', title: 'Benachrichtigung und Abholung', icon: 'clock', questions: [
      { id: 'benachrichtigung', q: 'Wie erfahre ich, dass meine Bestellung zur Abholung bereit ist, und wie hole ich sie in Konstanz ab?', a: 'Sobald deine korrekt zugeordnete Sendung bei CHASKI eingegangen ist, wirst du am Eingangstag per E-Mail oder WhatsApp benachrichtigt. Die Nachricht des Versanddienstleisters allein reicht nicht für die Abholung aus. Warte immer auf die Bestätigung von CHASKI. Danach kannst du dein Paket während der regulären Öffnungszeiten oder als registrierter Kunde über Click & Collect abholen.' },
      { id: 'vollmacht', q: 'Kann ich meine Bestellung von einer autorisierten Person abholen lassen?', a: 'Ja. Hinterlege die Person vorab als abholberechtigte Person in deinem CHASKI-Kundenkonto. Die autorisierte Person muss bei der Abholung ein gültiges Ausweisdokument vorlegen. Die Autorisierung sollte vollständig hinterlegt sein, bevor sie zur Abholung kommt. <a href="https://lieferadresse-konstanz.ch/mein-konto/">Abholberechtigung verwalten</a>.' },
      { id: 'fehlende-nachricht', q: 'Was kann ich tun, wenn meine Sendung längst angekommen sein müsste?', a: 'Prüfe zuerst die Sendungsverfolgung und deinen Spam-Ordner. Eine Zustellbestätigung des Versanddienstleisters bedeutet nicht automatisch, dass die Sendung bei CHASKI abholbereit ist. Wenn du keine Nachricht erhalten hast, schreib uns per E-Mail mit Name, E-Mail-Adresse, Kundennummer und Sendungsnummer. Bitte sende die Sendungsnummer als Text, nicht als Screenshot. Alternativ kannst du die <a href="https://lieferadresse-konstanz.ch/lost-found/">Lost-&amp;-Found-Suchanfrage</a> nutzen.' },
      { id: 'clickcollect', q: 'Wie funktioniert die 24/7-Abholung mit CHASKI Click & Collect und kann ich mein Paket ausserhalb der regulären Öffnungszeiten abholen?', a: 'Die 24/7-Abholung über Click & Collect steht registrierten CHASKI-Kunden zur Verfügung. Die konkreten Informationen zur Nutzung erhältst du direkt vor Ort. Du kannst deine Sendung erst abholen, nachdem CHASKI den Eingang bestätigt und sie zur Abholung freigegeben hat. Die 24/7-Abholung bedeutet nicht, dass Lieferungen ausserhalb der Öffnungszeiten angenommen werden.' },
      { id: 'oeffnungszeiten', q: 'Welche regulären Öffnungszeiten gelten bei CHASKI?', a: 'Montag bis Freitag: 16:00 bis 19:00 Uhr<br>Samstag: 10:00 bis 13:00 Uhr<br><br>An deutschen Feiertagen bleibt CHASKI geschlossen. Für Abholungen ausserhalb dieser Zeiten steht registrierten Kunden Click & Collect zur Verfügung. <a href="../Services/code.html#kontakt">Öffnungszeiten und Anfahrt ansehen</a>.' },
      { id: 'dokumente', q: 'Welche Dokumente muss ich zur Abholung mitbringen?', a: 'Für die Abholung benötigst du ein gültiges Ausweisdokument. Holt eine autorisierte Person deine Sendung ab, muss auch sie ein gültiges Ausweisdokument vorlegen. Die Autorisierung muss vorher in deinem Kundenkonto hinterlegt werden.' },
      { id: 'zahlung', q: 'Welche Zahlungsmethoden werden bei der Abholung akzeptiert?', a: 'Die CHASKI-Gebühr kannst du bar in Euro oder Schweizer Franken bezahlen. Ausserdem akzeptieren wir EC-/girocard, Mastercard und Visa. Bei einer Zahlung in Schweizer Franken gilt der Wechselkurs 1:1.' }
    ]},
    { id: 'lagerung', title: 'Lagerung und Gebühren', icon: 'box', questions: [
      { id: 'lagerfrist', q: 'Wie lange wird meine Bestellung bei CHASKI gelagert und was passiert mit nicht abgeholten Sendungen?', a: 'Normale Pakete werden <strong>30 Tage kostenlos</strong> gelagert. Sperrgut und Paletten werden <strong>14 Tage kostenlos</strong> gelagert. Die Lagerfrist beginnt jeweils mit dem Eingang der einzelnen Sendung bei CHASKI; du wirst am Eingangstag benachrichtigt. Für eine weitere Lagerung können Gebühren anfallen. Wird eine Sendung innerhalb der geltenden Frist nicht abgeholt und meldet sich niemand dazu, wird sie entsorgt.' },
      { id: 'annahmegebuehren', q: 'Welche Gebühren fallen für die Annahme meiner Sendung an?', a: 'Die Annahmegebühr richtet sich nach Art und Grösse der Sendung:<br><br><strong>Briefe</strong><br>Brief: 1,50 €<br>Versandtasche bis 35 cm: 3,00 €<br><br><strong>Normale Pakete</strong><br>XS bis 35 cm: 3,00 € · S 36–50 cm: 4,00 € · M 51–80 cm: 5,00 €<br>L 81–120 cm: 7,00 € · XL 121–150 cm: 10,00 € · XXL 151–200 cm: 15,00 €<br><br>Für normale Pakete werden längste und kürzeste Seite zusammengerechnet. <strong>Sperrgut und Paletten:</strong> Gurtmass S bis 350 cm: 20,00 € · Gurtmass M bis 500 cm: 25,00 € · Europalette bis 120 × 80 cm: 25,00 € · PKW-Sendungen auf Anfrage. Für Speditionen und Sonderfälle ist eine vorherige Absprache erforderlich. <a href="../Startseite/code.html#preise">Preise und Grössenrechner ansehen</a>.' },
      { id: 'lagergebuehren', q: 'Welche Lagergebühren können nach Ablauf der kostenlosen Lagerfrist entstehen?', a: 'Normale Pakete werden 30 Tage, Sperrgut und Paletten 14 Tage kostenlos gelagert. Danach gelten folgende Tagesgebühren:<br><br>XS, S und M: 0,50 € pro Tag<br>L, XL und XXL: 1,00 € pro Tag<br>Sperrgut und Paletten: 5,00 € pro Tag<br><br>Nicht abgeholte Sendungen werden entsorgt, wenn sich innerhalb der geltenden Lagerfrist niemand dazu meldet.' },
      { id: 'pro-sendung', q: 'Gilt die Lagerfrist pro Paket oder pro Bestellung?', a: 'Die Lagerfrist gilt für jede einzelne Sendung. Sie beginnt mit dem Eingang des jeweiligen Pakets bei CHASKI. Wenn eine Bestellung in mehreren Teillieferungen eintrifft, beginnt für jedes Paket eine eigene Lagerfrist.' },
      { id: 'verlaengerung', q: 'Kann ich die Lagerfrist verlängern?', a: 'Die reguläre Lagerfrist kann nicht automatisch verlängert werden. Wenn du eine besondere Lösung benötigst, kontaktiere CHASKI möglichst vor Ablauf der Frist. Eine Verlängerung kann nicht garantiert werden. Bitte melde dich rechtzeitig, damit eine Sendung nicht als nicht abgeholt entsorgt wird.' },
      { id: 'verpackung', q: 'Kann ich Verpackungsmaterial bei CHASKI entsorgen?', a: 'Ja. Du kannst deine Sendung bei CHASKI auspacken und das Verpackungsmaterial vor Ort entsorgen. Nutze dafür die vorhandene Ein- und Auspackstation.' }
    ]},
    { id: 'zoll', title: 'Zoll, Mehrwertsteuer und Grenzübertritt', icon: 'return', questions: [
      { id: 'lieferadresse', q: 'Was ist eine deutsche Lieferadresse und warum benötige ich diese?', a: 'Eine deutsche Lieferadresse ermöglicht es dir, Bestellungen an eine Adresse in Deutschland liefern zu lassen und sie anschliessend in Konstanz abzuholen. Das ist praktisch, wenn ein Online-Shop nicht in die Schweiz liefert, nur deutsche Lieferadressen akzeptiert oder hohe Versandkosten in die Schweiz verlangt. Die deutsche Lieferadresse ersetzt nicht die Schweizer Einfuhrbestimmungen. Wenn du deine Bestellung persönlich mitnimmst, bist du für die korrekte Einfuhr verantwortlich.' },
      { id: 'wertfreigrenze', q: 'Was muss ich bei der Schweizer Wertfreigrenze beachten: Gilt sie pro Artikel und auch für Post- oder Kuriersendungen?', a: 'Wenn du deine Bestellung persönlich von Deutschland in die Schweiz mitnimmst, gilt für private Waren grundsätzlich eine <strong>MWST-Wertfreigrenze von 150 CHF pro Person und Tag</strong>. Wird der relevante Gesamtwert überschritten, wird die Schweizer Mehrwertsteuer grundsätzlich auf den gesamten relevanten Warenwert berechnet, nicht nur auf den Betrag über 150 CHF. Die Grenze gilt für den Gesamtwert, nicht pro Artikel. Ein einzelner Gegenstand über 150 CHF ist unabhängig von der Anzahl mitreisender Personen immer mehrwertsteuerpflichtig. Die Wertfreigrenze gilt für den persönlichen Reiseverkehr; für Post- und Kuriersendungen gelten andere Einfuhrbestimmungen. Bewahre Rechnung und Zahlungsbestätigung auf. <a href="../SEO-Landingpage/code-alternative.html">Wertfreigrenze und Freimengen erklärt</a>. <span class="source">Quelle: <a href="https://www.bazg.admin.ch/de/wertfreigrenze-mehrwertsteuer-einreise-150-franken">Bundesamt für Zoll und Grenzsicherheit</a>, geprüft am 15.09.2026.</span>' },
      { id: 'einreise', q: 'Was muss ich bei der Einreise in die Schweiz beachten?', a: 'Wenn du deine Bestellung persönlich von Deutschland in die Schweiz mitnimmst, bist du für die korrekte Einfuhr selbst verantwortlich. Prüfe den Gesamtwert, beachte Wert- und Mengenfreigrenzen und führe Rechnungen sowie Zahlungsbelege mit. Wenn Abgaben anfallen oder besondere Vorschriften gelten, musst du die Waren beim Schweizer Zoll anmelden.' },
      { id: 'quickzoll', q: 'Muss ich QuickZoll verwenden?', a: 'QuickZoll ist für Privatpersonen eine praktische Möglichkeit, Waren vor der Einreise zu erfassen sowie mögliche Abgaben zu berechnen und zu bezahlen. Wenn deine Waren innerhalb der geltenden Wert- und Mengenfreigrenzen liegen und keine besonderen Vorschriften gelten, ist die Nutzung nicht zwingend. QuickZoll ist für persönlichen Gebrauch oder Geschenke vorgesehen; für Wiederverkauf und gewerblichen Gebrauch gelten andere Verfahren. <a href="../SEO-Landingpage/code-alternative.html#quickzoll">Mehr zu QuickZoll</a>.' },
      { id: 'mengenfreigrenzen', q: 'Welche Mengenfreigrenzen gelten für Lebensmittel, Alkohol und Tabakwaren?', a: 'Zusätzlich zur Wertfreigrenze gelten eigene Mengenfreigrenzen, zum Beispiel:<br><br>Fleisch und Fleischzubereitungen: 1 kg pro Person und Tag<br>Butter und Rahm: 1 kg beziehungsweise 1 Liter<br>Öle, Fette und Margarine: 5 kg beziehungsweise 5 Liter<br>Alkohol bis 18 Volumenprozent: 5 Liter pro Person ab 17 Jahren<br>Alkohol über 18 Volumenprozent: 1 Liter pro Person ab 17 Jahren<br>Tabakwaren und bestimmte E-Zigaretten-Produkte: besondere Freimengen ab 17 Jahren<br><br>Bei Überschreitung können zusätzliche Abgaben anfallen. Prüfe vor der Einfuhr die aktuellen Angaben des Schweizer Zolls.' },
      { id: 'verbote', q: 'Welche Waren sind bei der Einfuhr in die Schweiz verboten oder bewilligungspflichtig?', a: 'Bestimmte Waren dürfen nicht oder nur unter Voraussetzungen eingeführt werden. Dazu können Betäubungsmittel, Waffen, Feuerwerk, geschützte Tier- und Pflanzenarten, Fälschungen, bestimmte Medikamente und weitere Waren gehören. Informiere dich vor Bestellung und Einfuhr über die geltenden Vorschriften. CHASKI übernimmt keine Zollabklärung für dich.' },
      { id: 'mwst-rueck', q: 'Bekomme ich die deutsche Mehrwertsteuer zurück?', a: 'Eine Erstattung erfolgt nicht automatisch. Ob sie möglich ist, hängt vom Händler, deinem Wohnsitz ausserhalb der EU, dem Ausfuhrnachweis und dem Verfahren des Händlers oder Tax-Free-Dienstleisters ab. Kläre die Rückerstattung möglichst vor dem Kauf direkt mit dem Händler. CHASKI erstattet die deutsche Mehrwertsteuer nicht selbst. <a href="../SEO-Landingpage-Alt/code.html">Ratgeber zur MWST-Rückerstattung lesen</a>.' },
      { id: 'unterlagen', q: 'Welche Unterlagen sollte ich bei der Einfuhr mitführen?', a: 'Bewahre Rechnung, Bestellbestätigung, Zahlungsbestätigung und gegebenenfalls Unterlagen zur Mehrwertsteuererstattung auf. Die Dokumente helfen dir, den Warenwert nachzuweisen und die Schweizer Einfuhr korrekt abzuwickeln.' },
      { id: 'mwst-warenwert', q: 'Wird die deutsche Mehrwertsteuer bei der Schweizer Einfuhr berücksichtigt?', a: 'Für die Schweizer Wertfreigrenze ist grundsätzlich der Warenwert nach Abzug der ausländischen Mehrwertsteuer massgebend, sofern sie auf Rechnung oder Kaufbeleg separat ausgewiesen ist. Für die genaue Berechnung können je nach Einfuhrfall weitere Kosten berücksichtigt werden. Bewahre deshalb alle Rechnungen und Belege auf.' }
    ]},
    { id: 'sperrgut', title: 'Sperrgut und Spedition', icon: 'box', questions: [
      { id: 'sperrgut-annahme', q: 'Kann ich auch Sperrgut oder Paletten an meine deutsche Lieferadresse senden lassen?', a: 'Ja, Sperrgut und Paletten können nach vorheriger Absprache an CHASKI geliefert werden. Teile uns vor der Bestellung möglichst Händler, Anzahl der Packstücke, Masse, Gewicht, Versanddienstleister und geplanten Liefertermin mit. Für Sperrgut, Paletten und Speditionslieferungen gelten besondere Annahmebedingungen und Lagerfristen. Eine Annahme in jeder Grösse kann nicht automatisch garantiert werden. <a href="#kontakt">Sperrgut mit uns absprechen</a>.' },
      { id: 'sperrgut-groessen', q: 'Welche Masse und Grössen gelten für Sperrgut?', a: 'Aktuelle Preisstufen sind: Gurtmass S bis 350 cm: 20,00 € · Gurtmass M bis 500 cm: 25,00 € · Europalette bis 120 × 80 cm: 25,00 € · PKW-Sendungen auf Anfrage. Das Gurtmass berechnet sich aus Länge plus zweimal Breite plus zweimal Höhe. Die konkrete Annahme hängt zusätzlich von Gewicht, Packstücken, Versandart, Liefertermin und Kapazität ab. Kläre Sperrgut immer vor der Bestellung mit CHASKI ab.' },
      { id: 'spedition', q: 'Was muss ich bei einer Speditionslieferung beachten? Muss ich eine Speditionslieferung vorher anmelden?', a: 'Ja, Speditionslieferungen müssen vor der Bestellung bestätigt werden. Das gilt unter anderem für Paletten, Möbel, Küchen, Baumaterial, Fahrräder, Reifen und andere grosse oder schwere Sendungen. Sende uns Händler, Produkt und Inhalt, Packstückzahl, Länge, Breite, Höhe, Gewicht, Versanddienstleister, Liefertermin und besondere Anlieferungsanforderungen. Bestelle erst, wenn CHASKI die Annahme bestätigt hat.' },
      { id: 'abholung-fahrzeug', q: 'Welches Fahrzeug benötige ich zur Abholung von Sperrgut?', a: 'Prüfe vor der Bestellung Masse der verpackten Ware, Gesamtgewicht, Packstückzahl und benötigten Laderaum. Achte auf Ladehöhe, Kofferraumöffnung, notwendige Ladungssicherung und darauf, ob du eine zweite Person zum Einladen benötigst.' }
    ]},
    { id: 'versand', title: 'Rücksendungen und Versand ab CHASKI', icon: 'return', questions: [
      { id: 'pakete-versenden', q: 'Kann ich über CHASKI auch Pakete versenden?', a: 'Ja. Registrierte Kunden mit Wohnsitz in der Schweiz können über CHASKI vollständig vorfrankierte Pakete versenden. CHASKI übernimmt keine Frankierung und erstellt keine Versandlabels. Für den Versand fällt eine Gebühr von <strong>5,00 € pro Sendung</strong> an. Der Versand ist mit allen Versanddienstleistern möglich, sofern ein gültiges und vollständig bezahltes Versandlabel vorhanden ist.' },
      { id: 'retoure-online-shop', q: 'Wie funktioniert eine Rücksendung an den Online-Shop?', a: 'Melde die Rücksendung zunächst beim jeweiligen Online-Shop an und beachte dessen Rückgabefristen und Bedingungen. Verwende das Rücksendeetikett des Händlers oder einen vollständig vorfrankierten Rücksendeversand. Solange sich die Ware noch bei CHASKI in Deutschland befindet, kannst du die Rücksendung direkt von dort organisieren.' },
      { id: 'unfrankiert', q: 'Werden unfrankierte Rücksendungen angenommen?', a: 'Nein. Rücksendungen müssen vollständig vorfrankiert sein. CHASKI übernimmt keine Frankierung und erstellt keine Versandlabels. Für die Rücksendung bist du selbst verantwortlich.' },
      { id: 'versand-voraussetzungen', q: 'Welche Voraussetzungen gelten für den Versand ab CHASKI?', a: 'Der Versand ab CHASKI ist nur für registrierte Kunden mit Wohnsitz in der Schweiz möglich. Das Paket muss vollständig vorfrankiert sein und ein gültiges Versandlabel besitzen. Die Gebühr beträgt 5,00 € pro Sendung.' },
      { id: 'beschaedigt', q: 'Was passiert, wenn mein Paket bei der Annahme beschädigt ist?', a: 'Sichtbare Beschädigungen werden bei der Annahme durch CHASKI dokumentiert. Wenn du eine beschädigte Sendung abholst, prüfe den Zustand ebenfalls und bewahre Fotos sowie alle Unterlagen auf. Wende dich bei Transportschäden zusätzlich an Händler oder Versanddienstleister.' },
      { id: 'haftung', q: 'Haftet CHASKI für Schäden oder gibt es eine Versicherung?', a: 'Über CHASKI besteht keine zusätzliche Haftung oder Versicherung für deine Ware. Prüfe deshalb die Haftungs- und Versicherungsbedingungen des Versanddienstleisters und des Online-Shops. Bewahre Rechnungen, Versandunterlagen und Fotos von Beschädigungen auf.' },
      { id: 'auspacken', q: 'Kann ich meine Bestellung bei CHASKI auspacken oder anprobieren?', a: 'Ja. Du kannst deine Bestellung an der Ein- und Auspackstation auspacken. Für Kleidung steht eine Umkleidekabine zur Verfügung. Wenn du Ware zurücksenden möchtest, beachte die Rückgabebedingungen des Online-Shops und verwende ein vollständig vorfrankiertes Rücksendeetikett.' }
    ]}
  ];

  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.flatMap(group => group.questions.map(question => ({
      '@type': 'Question',
      name: question.q,
      acceptedAnswer: { '@type': 'Answer', text: question.a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
    })))
  });
  document.head.appendChild(schemaScript);

  const sidebar = document.querySelector('.sidebar nav');
  sidebar.innerHTML = '<p>Worum geht’s?</p>' + faqData.map(group => '<a href="#' + group.id + '">' + icon(group.icon) + '<span>' + group.title + '</span><span class="count">' + group.questions.length + '</span></a>').join('');
  const content = document.querySelector('#faq-content');
  const plus = icon('plus');
  content.innerHTML = '<div class="results-bar" hidden><p id="search-status" role="status" aria-live="polite"></p><button id="expand-all" type="button" aria-expanded="false">Alle Antworten öffnen</button></div>' + faqData.map((group, groupIndex) => '<section class="faq-group" id="' + group.id + '" aria-labelledby="title-' + group.id + '"><div class="group-heading">' + icon(group.icon) + '<h2 id="title-' + group.id + '">' + group.title + '</h2><span>' + group.questions.length + ' Fragen</span></div><div class="questions">' + group.questions.map((question, questionIndex) => '<details class="question" id="' + question.id + '"' + (groupIndex === 0 && questionIndex === 0 ? ' open' : '') + '><summary><h3>' + question.q + '</h3>' + plus + '</summary><div class="answer"><p>' + question.a + '</p></div></details>').join('') + '</div></section>').join('') + '<div class="empty" hidden><h2>Keine passende Antwort gefunden.</h2><p>Versuche einen kürzeren Begriff oder frag uns direkt.</p><button class="btn secondary" id="reset-empty" type="button">Alle Fragen anzeigen</button><a href="#kontakt">Kontakt aufnehmen</a></div>';

  const topicCost = document.querySelector('.search-hint a[href="#kosten"]');
  if (topicCost) { topicCost.href = '#lagerung'; topicCost.textContent = 'Lagerung & Gebühren'; }
  const input = document.querySelector('#faq-search');
  const questions = [...document.querySelectorAll('.question')];
  const groups = [...document.querySelectorAll('.faq-group')];
  const status = document.querySelector('#search-status');
  const clear = document.querySelector('#clear-search');
  const expand = document.querySelector('#expand-all');
  const normalize = value => value.toLocaleLowerCase('de-CH').replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss');
  const texts = new Map(questions.map(q => [q, normalize(q.textContent)]));
  let savedOpen = null;
  document.querySelector('.search').hidden = false;
  document.querySelector('.results-bar').hidden = false;
  function syncExpand() {
    const shown = questions.filter(q => !q.hidden);
    const all = shown.length > 0 && shown.every(q => q.open);
    expand.textContent = all ? 'Alle Antworten schliessen' : 'Alle Antworten öffnen';
    expand.setAttribute('aria-expanded', String(all));
    expand.hidden = !shown.length;
  }
  function filter() {
    const term = normalize(input.value.trim());
    if (term && !savedOpen) savedOpen = new Set(questions.filter(q => q.open));
    const words = term.split(/\s+/).filter(Boolean);
    let count = 0;
    questions.forEach(q => {
      const match = words.every(word => texts.get(q).includes(word));
      q.hidden = !match;
      if (term) q.open = match;
      else if (savedOpen) q.open = savedOpen.has(q);
      if (match) count++;
    });
    if (!term) savedOpen = null;
    groups.forEach(group => { group.hidden = ![...group.querySelectorAll('.question')].some(q => !q.hidden); });
    status.textContent = term ? count + ' ' + (count === 1 ? 'Antwort' : 'Antworten') + ' gefunden' : questions.length + ' Fragen · ' + groups.length + ' Themen';
    clear.hidden = !input.value;
    document.querySelector('.empty').hidden = count !== 0;
    syncExpand();
  }
  function reset() { input.value = ''; filter(); }
  input.addEventListener('input', filter);
  document.querySelector('.search').addEventListener('submit', event => event.preventDefault());
  clear.addEventListener('click', () => { reset(); input.focus(); });
  document.querySelector('#reset-empty').addEventListener('click', () => { reset(); input.focus(); });
  expand.addEventListener('click', () => {
    const shown = questions.filter(q => !q.hidden);
    const open = !shown.every(q => q.open);
    shown.forEach(q => { q.open = open; });
    syncExpand();
  });
  questions.forEach(q => q.addEventListener('toggle', syncExpand));
  function revealHash() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target || !target.matches('.question,.faq-group')) return;
    if (input.value) reset();
    if (target.matches('.question')) target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^=\"#\"]');
    if (link && document.getElementById(link.hash.slice(1))?.matches('.question,.faq-group')) {
      if (input.value) reset();
      if (link.hash === location.hash) revealHash();
    }
    if (link) document.querySelector('.mobile-menu').open = false;
  });
  document.addEventListener('keydown', event => { if(event.key === 'Escape') document.querySelector('.mobile-menu').open = false; });
  window.addEventListener('hashchange', revealHash);
  const links = [...document.querySelectorAll('.sidebar nav>a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const active = entries.find(entry => entry.isIntersecting);
      if (active) links.forEach(link => {
        if (link.hash === '#' + active.target.id) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin:'-110px 0px -55% 0px'});
    groups.forEach(group => observer.observe(group));
  }
  filter();
  if (location.hash) revealHash();
})();
