"""Rebuild the six static CHASKI account design pages. No backend calls."""
from pathlib import Path
from html import escape
import shutil
import re
import base64

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / 'assets'
ASSETS.mkdir(exist_ok=True)
for name in ['fonts.css', 'jakarta-0.woff2', 'jakarta-1.woff2', 'jakarta-2.woff2', 'jakarta-3.woff2', 'logo-0.png', 'logo-1.png', 'filiale-13.jpg']:
    shutil.copy2(ROOT.parent / 'FAQ' / 'assets' / name, ASSETS / name)

# Google Material Icons, embedded SVG paths; no icon fonts or external requests.
ICONS = {
 'arrow':'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
 'person':'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
 'dashboard':'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
 'card':'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4V6h16v12zM6 10h5v2H6zm0 4h8v2H6zm9-6h3v4h-3z',
 'box':'M360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5T490-80Zm230 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm66-106 28-28-74-74v-112h-40v128l86 86ZM240-560v400-400Z',
 'search':'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
 'chat':'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6zm8 6H6v-2h8zm4-8H6V5h12z',
 'lock':'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3-9H9V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2z',
 'delete':'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
 'logout':'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
 'copy':'M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
 'pin':'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z',
 'clock':'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
 'check':'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
 'info':'M11 17h2v-6h-2v6zm1-15a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zM11 9h2V7h-2v2z',
 'menu':'M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z',
 'eye':'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7.5a3 3 0 100 6 3 3 0 000-6z',
 'download':'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
 'mail':'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
 'phone':'M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
 'qr':'M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm7-4h3v3h-3v-3zm4 0h2v2h-2v-2zm3 0h2v4h-2v-4zm-7 4h2v5h-2v-5zm3 0h3v2h-3v-2zm4 2h2v3h-5v-2h3v-1z',
}
def icon(name):
    viewbox = '0 -960 960 960' if name == 'box' else '0 0 24 24'
    return f'<svg class="icon" viewBox="{viewbox}" aria-hidden="true" focusable="false"><path d="{ICONS[name]}"/></svg>'

PUBLIC_NAV = '<a href="../So funktionierts/code.html">So funktioniert’s</a><a href="../Services/code.html">Services</a><a href="../Startseite/code.html#preise">Preise</a><a href="../FAQ/code.html">FAQ</a><a href="../Services/code.html#kontakt">Kontakt</a>'
def header(account):
    actions = f'<a class="account-link" href="code.html" aria-label="Mein Kundenkonto">{icon("person")} Konto</a>' if account else f'<a class="login-link" href="login.html">Login</a><a class="btn small" href="registrierung.html">Kostenlos registrieren {icon("arrow")}</a>'
    return f'<a class="skip" href="#inhalt">Zum Inhalt springen</a><header class="site-header"><div class="container header-inner"><a href="../Startseite/code.html" aria-label="CHASKI Startseite"><img class="logo" src="assets/logo-0.png" alt="CHASKI" width="145" height="38"></a><nav class="desktop-nav" aria-label="Hauptnavigation">{PUBLIC_NAV}</nav><div class="header-actions">{actions}<details class="mobile-menu"><summary aria-label="Hauptmenü öffnen">{icon("menu")}</summary><nav aria-label="Mobile Hauptnavigation">{PUBLIC_NAV}<a href="login.html">Login</a><a href="registrierung.html">Registrierung</a></nav></details></div></div></header>'

def footer():
    return '<footer class="site-footer"><div class="container footer-inner"><span>© 2026 CHASKI · Deine Lieferadresse in Konstanz</span><nav class="footer-links" aria-label="Rechtliches und Hilfe"><a href="../FAQ/code.html">Häufige Fragen</a><a href="https://lieferadresse-konstanz.ch/datenschutz/">Datenschutz</a><a href="https://lieferadresse-konstanz.ch/agb/">AGB</a><a href="https://lieferadresse-konstanz.ch/impressum/">Impressum</a></nav></div></footer><div class="toast" role="status" aria-live="polite" hidden></div>'

def shell(filename,title,content,account=False):
    preview = '<div class="draft-bar">Layout-Vorschau · Beispieldaten · <a href="code.html">Kontoübersicht</a><a href="registrierung.html">Registrierung</a><a href="login.html">Login</a></div>'
    html = f'<!doctype html>\n<html lang="de-CH"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#F6F8F3"><title>{title} | CHASKI</title><link rel="icon" href="assets/logo-0.png"><link rel="stylesheet" href="assets/kunden.css"><script src="assets/kunden.js" defer></script></head><body>{preview}{header(account)}{content}{footer()}</body></html>'
    (ROOT / filename).write_text(html,encoding='utf-8')

NAV = [('code.html','dashboard','Übersicht'),('kundenkarte.html','card','Kundenkarte'),('click-collect.html','box','Click & Collect'),(None,'search','Lost & Found'),('support.html','chat','Support'),(None,'person','Profil bearbeiten'),(None,'lock','Passwort ändern'),(None,'delete','Konto löschen'),('login.html','logout','Abmelden')]
def nav_items(current,mobile=False):
    result=''
    for n,(href,glyph,label) in enumerate(NAV):
        if label=='Profil bearbeiten' and not mobile: result+='<div class="nav-label">KONTO VERWALTEN</div>'
        attrs = f'href="{href}"' if href else 'role="link" aria-disabled="true" title="Für diese Ansicht liegt noch keine Vorlage vor."'
        if href==current: attrs+=' aria-current="page"'
        result+=f'<a {attrs} class="{"logout" if label=="Abmelden" else ""}">{icon(glyph)}<span>{escape(label)}</span></a>'
    return result

def account_page(filename,title,subtitle,body):
    sidebar=f'<aside class="sidebar"><div class="identity"><span class="avatar" aria-hidden="true">SN</span><div><strong>Sebastian Niestroj</strong><small>Kundennummer CH-123456</small></div></div><nav class="account-nav" aria-label="Kundenkonto">{nav_items(filename)}</nav><details class="mobile-account"><summary>Kundenkonto · {title}</summary><nav aria-label="Kundenkonto mobil">{nav_items(filename,True)}</nav></details></aside>'
    content=f'<main class="container" id="inhalt"><nav class="breadcrumb" aria-label="Brotkrümelnavigation"><a href="../Startseite/code.html">Startseite</a><span>/</span><a href="code.html">Kundenkonto</a>{"<span>/</span><span aria-current=\"page\">"+title+"</span>" if filename!="code.html" else ""}</nav><div class="portal">{sidebar}<section aria-labelledby="page-title"><div class="page-heading"><div><h1 id="page-title">{title}</h1><p>{subtitle}</p></div><span class="badge">CH-123456</span></div>{body}</section></div></main>'
    shell(filename,title,content,True)

hours='<div class="hours"><span>Montag – Freitag</span><strong>16:00 – 19:00 Uhr</strong><span>Samstag</span><strong>10:00 – 13:00 Uhr</strong></div>'
dashboard=f'''<div class="dashboard-grid"><section class="panel address-card" aria-labelledby="address-title"><div class="panel-title">{icon('pin')}<h2 id="address-title">Deine Lieferadresse in Konstanz</h2></div><p>So adressierst du deine nächste Bestellung:</p><address id="lieferadresse"><strong>CHASKI CH-123456</strong><br>c/o Sebastian Niestroj<br>August-Borsig-Str. 2a<br>78467 Konstanz<br>Deutschland</address><div class="address-foot"><small>Deine Kundennummer bitte immer mit angeben.</small><button class="btn small" data-copy type="button">{icon('copy')} Adresse kopieren</button></div></section><section class="panel card-teaser"><div class="panel-title">{icon('card')}<h2>Deine digitale Kundenkarte</h2></div><p>Bei der Abholung einfach auf dem Handy vorzeigen.</p><div class="mini-pass">{icon('qr')}<div><strong>Sebastian Niestroj</strong><span>CH-123456</span></div></div><a class="btn" href="kundenkarte.html">Kundenkarte öffnen {icon('arrow')}</a></section><section class="panel wide history-line"><div><h2>Sendungshistorie</h2><p>Status vergangener und aktueller Lieferungen verfolgen.</p></div><button class="btn secondary small" disabled title="Für diese Ansicht liegt noch keine Vorlage vor.">Ansehen {icon('arrow')}</button></section></div><div class="utility-grid"><section class="utility"><h3>{icon('clock')} Abholung in der Filiale</h3>{hours}<p>An deutschen Feiertagen bleibt der Paketshop geschlossen.</p><a class="text-link" href="../Services/code.html#kontakt">Anfahrt &amp; Öffnungszeiten {icon('arrow')}</a></section><section class="utility"><h3>{icon('chat')} Eine Frage zu deinem Paket?</h3><p>Unser Team hilft dir gerne. Halte deine Kunden- und Sendungsnummer bereit.</p><a class="text-link" href="support.html">CHASKI-Support kontaktieren {icon('arrow')}</a></section></div>'''
account_page('code.html','Willkommen, Sebastian!','Deine Lieferadresse und Kundenkarte. Alles bereit für deinen nächsten Einkauf.',dashboard)

collect_account = (ASSETS / 'collect-panel.html').read_text(encoding='utf-8')
account_page('click-collect.html','Click & Collect','AGB einreichen, Freischaltung prüfen und den Service verwalten.',collect_account)

card=f'''<div class="pass-layout"><div class="customer-pass"><div class="pass-top"><img src="assets/logo-1.png" alt="CHASKI" width="105" height="28"><span>Digitale Kundenkarte</span></div><div class="pass-body"><h2>Sebastian Niestroj</h2><p>Kundennummer <strong>CH-123456</strong></p><img class="qr" src="assets/demo-qr.svg" width="200" height="200" alt="Beispiel-QR-Code ohne gültige Kundenkennung"></div><div class="pass-bottom">Musterkarte · nicht zur Abholung verwendbar</div></div><div class="pass-help"><h2>Handy zeigen.<br>Paket mitnehmen.</h2><p>Speichere die Kundenkarte auf deinem Handy und zeige sie unserem Team bei deiner nächsten Abholung. So können wir deine Sendung schneller zuordnen.</p><a class="btn" href="assets/kundenkarte-muster.svg" download="CHASKI-Kundenkarte-Muster.svg">{icon('download')} Karte speichern</a><p class="download-hint">Falls der Download nicht startet: Öffne die <a href="assets/kundenkarte-muster.svg">Karte als Bild</a> und speichere sie auf deinem Gerät.</p></div></div><div class="notice">{icon('info')}<p>Halte bei der Abholung zusätzlich ein gültiges Ausweisdokument bereit.</p></div>'''
card_data = base64.b64encode((ASSETS / 'kundenkarte-muster.svg').read_bytes()).decode('ascii')
card = card.replace('href="assets/kundenkarte-muster.svg" download=', f'href="data:image/svg+xml;base64,{card_data}" download=')
account_page('kundenkarte.html','Deine Kundenkarte','Bei jeder Abholung griffbereit – auch ohne Login, wenn du sie vorher speicherst.',card)

support=f'''<div class="support-grid"><section class="panel"><h2>Wie können wir dir helfen?</h2><p>Fragen zu deiner Lieferung oder zur Website? Melde dich über den Kanal, der dir am besten passt.</p><a class="contact-option" href="https://wa.me/4915259480872">{icon('chat')}<div><strong>WhatsApp</strong><span>Schreib uns direkt eine Nachricht</span></div><span class="arrow">{icon('arrow')}</span></a><a class="contact-option" href="mailto:kontakt@chaski-lieferadresse.ch">{icon('mail')}<div><strong>E-Mail</strong><span>kontakt@chaski-lieferadresse.ch</span></div></a><a class="contact-option" href="tel:+4915259480872">{icon('phone')}<div><strong>Anrufen</strong><span>+49 152 59480872</span></div></a></section><section class="panel support-hours"><div class="panel-title">{icon('clock')}<h2>Persönlich für dich da</h2></div>{hours}<p>An allen deutschen Feiertagen bleibt der Paketshop geschlossen.</p><p><strong>CHASKI Konstanz</strong><br>August-Borsig-Str. 2a<br>78467 Konstanz</p><a class="text-link" href="../Services/code.html#kontakt">Anfahrt ansehen {icon('arrow')}</a></section></div><div class="notice">{icon('info')}<p>Bei Fragen zu einer Lieferung: Nenne uns deine <strong>Kundennummer CH-123456</strong> und die Sendungsnummer. So finden wir dein Paket schneller.</p></div><a class="text-link" style="margin-top:18px" href="../FAQ/code.html">Antworten auf häufige Fragen {icon('arrow')}</a>'''
account_page('support.html','CHASKI-Kundensupport','Persönlich für dich da. Wir helfen dir gerne weiter.',support)

def field(name,label,type='text',required=True,full=False,auto='',options=None,hint='',maxlen=None):
    label=escape(label)+(' *' if required else ' <span class="optional">(optional)</span>')
    attrs=f'id="{name}" name="{name}"'+(' required' if required else '')+(f' autocomplete="{auto}"' if auto else '')+(f' maxlength="{maxlen}"' if maxlen else '')+(f' aria-describedby="{name}-hint"' if hint else '')
    if options:
        control=f'<select {attrs}>'+''.join(f'<option value="{escape(v,quote=True)}">{escape(t)}</option>' for v,t in options)+'</select>'
    else:
        control=f'<input type="{type}" {attrs}'+(' inputmode="numeric"' if 'Postleitzahl' in label else '')+'>'
        if type=='password': control=f'<div class="password-wrap">{control}<button type="button" class="reveal" aria-label="Passwort anzeigen" aria-controls="{name}" aria-pressed="false">{icon("eye")}</button></div>'
    return f'<div class="field {"full" if full else ""}"><label for="{name}">{label}</label>{control}'+(f'<small id="{name}-hint">{hint}</small>' if hint else '')+'</div>'

def auth_page(filename,title,intro,form):
    content=f'<main class="container" id="inhalt"><nav class="breadcrumb" aria-label="Brotkrümelnavigation"><a href="../Startseite/code.html">Startseite</a><span>/</span><span aria-current="page">{title}</span></nav><div class="auth-layout"><section class="auth-intro">{intro}</section><section class="form-panel" aria-label="{title}">{form}</section></div></main>'
    shell(filename,title,content)

intro=f'''<div class="eyebrow">DEINE LIEFERADRESSE IN KONSTANZ</div><h1>Schön, dass du<br><span>wieder da bist.</span></h1><p>Deine Lieferadresse, deine Kundenkarte und der direkte Draht zu uns. Alles an einem Ort.</p><figure class="auth-image"><img src="assets/filiale-13.jpg" alt="Die CHASKI-Filiale in Konstanz" width="640" height="480"><figcaption>Dein Paket. Unser Service. CHASKI Konstanz.</figcaption></figure><a class="text-link" href="../So funktionierts/code.html">Neu bei CHASKI? So funktioniert’s {icon('arrow')}</a>'''
form=f'''<h2>In dein Kundenkonto einloggen</h2><p>Willkommen zurück bei CHASKI.</p><form data-demo="login" method="post" onsubmit="return false"><div class="field-grid">{field('username','E-Mail-Adresse','email',full=True,auto='username')}{field('password','Passwort','password',full=True,auto='current-password')}</div><div class="remember-row"><label class="check"><input type="checkbox" name="rememberme" id="rememberme" value="forever">Angemeldet bleiben</label><a href="https://lieferadresse-konstanz.ch/lost-password/">Passwort vergessen?</a></div><div class="form-actions stack"><button class="btn" type="submit">Einloggen {icon('arrow')}</button><p>Noch kein Konto? <a href="registrierung.html"><strong>Kostenlos registrieren</strong></a></p></div><div class="form-feedback" role="status" tabindex="-1" hidden></div></form>'''
auth_page('login.html','Login',intro,form)

intro=f'''<div class="eyebrow">KOSTENLOS REGISTRIEREN</div><h1>Dein Einkauf.<br><span>Deine deutsche<br>Lieferadresse.</span></h1><p>Eröffne dein CHASKI-Konto und lass deine Bestellungen einfach nach Konstanz liefern.</p><ul class="benefits"><li>{icon('check')}24/7-Abholung via CHASKI Click &amp; Collect möglich</li><li>{icon('check')}Gegenüber von Kaufland Konstanz und OBI</li><li>{icon('check')}Parkplätze direkt vor der Filiale</li><li>{icon('check')}Paletten &amp; Sperrgut nach Absprache</li></ul><figure class="auth-image"><img src="assets/filiale-13.jpg" alt="Einblick in deine CHASKI-Filiale" width="640" height="480"><figcaption>Persönlich vor Ort. Einfach abgeholt.</figcaption></figure><a class="text-link" href="login.html">Schon registriert? Zum Login {icon('arrow')}</a>'''
access=field('user_email','E-Mail-Adresse','email',full=True,auto='email')+field('user_pass','Passwort','password',auto='new-password')+field('user_confirm_password','Passwort bestätigen','password',auto='new-password')
person=field('select_1677437825','Anrede',options=[('Frau','Frau'),('Herr','Herr'),('Divers','Divers')],full=True,auto='honorific-prefix')+field('first_name','Vorname',auto='given-name')+field('last_name','Nachname',auto='family-name')+field('input_box_1685480790','Firma',required=False,full=True,auto='organization',maxlen=50)
address=field('input_box_1677437939','Strasse',auto='address-line1',maxlen=50)+field('input_box_1677437943','Hausnummer',maxlen=50)+field('number_box_1677437972','Postleitzahl',auto='postal-code')+field('input_box_1677437985','Stadt',auto='address-level2',maxlen=50)+field('country_1759830968','Land',options=[('CH','Schweiz')],auto='country',full=True)
extras=field('phone_1685480996','Mobilnummer','tel',required=False,full=True,auto='tel')+field('input_box_1677438359','Autorisierte Personen',required=False,full=True,hint='Personen, die Pakete in deinem Namen abholen dürfen, z. B. Familienangehörige oder Partner.')+field('select_1689280150','Wie hast du von uns erfahren?',required=False,full=True,options=[('','Bitte auswählen'),('Suchmaschine/Google','Suchmaschine/Google'),('Internet','Internet'),('Social Media','Social Media'),('Freunde & Bekannte','Freunde & Bekannte'),('Außenwerbung','Aussenwerbung'),('KI-Chatbot (ChatGPT, Claude, Gemini, etc)','KI-Chatbot (ChatGPT, Claude, Gemini, etc)')])+field('input_box_1710094287','Name deines Freundes oder Bekannten',required=False,full=True)
form=f'''<h2>Dein Kundenkonto eröffnen</h2><p>Felder mit * sind erforderlich.</p><form data-demo="registration" method="post" onsubmit="return false"><fieldset class="form-section"><legend>Deine Zugangsdaten</legend><div class="field-grid">{access}</div><p class="error-text" id="password-error" hidden>Die Passwörter stimmen nicht überein.</p></fieldset><fieldset class="form-section"><legend>Über dich</legend><div class="field-grid">{person}</div></fieldset><fieldset class="form-section"><legend>Deine Wohnadresse</legend><p>Hier trägst du deine eigene Adresse in der Schweiz ein.</p><div class="field-grid">{address}</div></fieldset><fieldset class="form-section"><legend>Weitere Angaben</legend><div class="field-grid">{extras}</div></fieldset><fieldset class="form-section"><legend>Fast geschafft</legend><label class="check"><input type="checkbox" name="check_box_1676414304[]" id="privacy" value="Datenschutzerklärung akzeptieren" required><span>Ich habe die <a href="https://lieferadresse-konstanz.ch/datenschutz/">Datenschutzerklärung</a> gelesen und akzeptiere diese. *</span></label><label class="check"><input type="checkbox" name="check_box_1689019888217[]" id="terms" value="AGB akzeptieren" required><span>Ich habe die <a href="https://lieferadresse-konstanz.ch/agb/">AGB</a> gelesen und akzeptiere diese. *</span></label></fieldset><div class="honeypot" aria-hidden="true"><label for="honeypot">Phone</label><input type="text" name="honeypot" id="honeypot" tabindex="-1" autocomplete="off"></div><div class="form-actions stack"><button type="submit" class="btn">Kundenkonto eröffnen {icon('arrow')}</button><p>Bereits ein Konto? <a href="login.html"><strong>Hier einloggen</strong></a></p></div><div class="form-feedback" role="status" tabindex="-1" hidden></div></form>'''
auth_page('registrierung.html','Registrierung',intro,form)
print('Created: code.html, click-collect.html, kundenkarte.html, support.html, login.html, registrierung.html')
