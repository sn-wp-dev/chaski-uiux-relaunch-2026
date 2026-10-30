"""Build a separate static redesign from the original content DOM."""
from bs4 import BeautifulSoup, Tag, NavigableString
from pathlib import Path
from hashlib import sha256
import json, re, copy, shutil

root = Path(__file__).resolve().parents[1]
source = root/'code.html'
original = source.read_text(encoding='utf-8')
soup = BeautifulSoup(original, 'html.parser')
output = BeautifulSoup('<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CHASKI – Deine deutsche Lieferadresse in Konstanz</title><link rel="stylesheet" href="assets-syn-cora/fonts.css"><link rel="stylesheet" href="alternative-syncora.css"><script src="alternative-syncora.js" defer></script></head><body></body></html>', 'html.parser')

def mark(node, name):
    if node is not None: node['data-ui'] = name
    return node

def direct(node):
    return [c for c in node.children if isinstance(c, Tag)]

def fresh(name, attrs=None, content=None):
    node = output.new_tag(name,attrs=attrs or {})
    if content: node.string = content
    return node

def clean(node):
    # Remove styling only, while retaining semantic/content attributes.
    for element in [node]+list(node.find_all(True)):
        old_classes = element.get('class', [])
        if 'material-symbols-outlined' in old_classes or 'icon' in old_classes:
            element['class'] = ['icon']
            element['aria-hidden'] = 'true'
        else: element.attrs.pop('class',None)
        element.attrs.pop('style',None)
        for key in list(element.attrs):
            if key.startswith('on'): del element.attrs[key]
    for element in node.select('script,style'):
        element.decompose()
    return node

def section_heading(section):
    heading = section.find(['h1','h2'])
    group = heading.parent
    mark(group,'section-heading')
    badge = group.find('span',recursive=False)
    if badge: mark(badge,'eyebrow')

sections = soup.select('main > section')
for section in sections:
    # Empty positioned layers are decorative, not content.
    for div in list(section.select('div.absolute')):
        if not div.get_text(strip=True) and not div.find(['img','svg']): div.decompose()

# Navigation keeps all original links and logo.
header = soup.header.extract()
mark(header,'header')
mark(direct(header)[0],'nav-inner')
mark(header.find('nav'),'nav')
mark(direct(direct(header)[0])[-1],'nav-actions')
mark(header.find('a'),'brand')
toggle = fresh('button', {'type':'button','data-ui':'menu-toggle','aria-expanded':'false','aria-controls':'main-navigation','aria-label':'Navigation öffnen'})
toggle.append(fresh('span',{'class':'icon','aria-hidden':'true'},'menu'))
direct(header)[0].append(toggle)
header.nav['id']='main-navigation'
header.nav['aria-label']='Hauptnavigation'
clean(header)
output.body.append(fresh('a',{'href':'#main-content','data-ui':'skip'},'Zum Inhalt'))
output.body.append(header)
main = fresh('main',{'id':'main-content','tabindex':'-1'})
output.body.append(main)

# Hero: central reference typography with landscape and three glass panels.
hero = sections[0]
hero['id']='start'
mark(hero,'hero')
hero_grid = hero.select_one('.grid')
hero_copy, hero_media = direct(hero_grid)
mark(hero_copy,'hero-copy')
copy_parts = direct(hero_copy)
mark(copy_parts[0],'eyebrow')
mark(copy_parts[3],'hero-actions')
benefits = copy_parts[4].extract()
mark(benefits,'hero-benefits')
for benefit in direct(benefits):
    mark(benefit,'benefit-row')
    mark(direct(benefit)[0],'icon-tile')
hero_image = hero_media.find('img')
image_box = hero_image.parent
mark(image_box,'hero-photo')
image_parts = direct(image_box)
status = next(part for part in image_parts if 'Geöffnet' in part.get_text())
mark(status,'photo-status')
review = image_parts[-1].extract()
mark(review,'hero-rating')
mark(review.find('img').parent,'rating-thumb')
mark(direct(review)[-1],'rating-copy')
mark(direct(direct(review)[-1])[0],'rating-stars')
hero.clear()
hero.append(hero_copy)
dashboard = fresh('div',{'data-ui':'hero-dashboard'})
dashboard.extend([benefits,image_box,review])
hero.append(dashboard)

# Process: reference's workflow showcase + 3 existing process cards.
process = sections[1]
mark(process,'process')
wrap = direct(process)[0]
mark(wrap,'container')
section_heading(process)
grid = wrap.select_one('.grid')
mark(grid,'process-grid')
illustration = fresh('div',{'data-ui':'workflow-visual'})
illustration.append(fresh('img',{'src':'assets-syn-cora/parcel-network.png','alt':'','loading':'lazy','width':'1536','height':'1024'}))
grid.insert_before(illustration)
for card in direct(grid):
    mark(card,'process-card')
    mark(direct(card)[-1],'card-note')
    mark(card.find('span',class_='material-symbols-outlined').parent,'icon-tile')
mark(direct(wrap)[-1],'section-actions')

# Comparison.
comparison = sections[2]
comparison['id']='vergleich'
mark(comparison,'comparison')
section_heading(comparison)
grid = comparison.select_one('.grid')
mark(grid,'comparison-grid')
for index,card in enumerate(direct(grid)):
    mark(card,'comparison-card-featured' if index else 'comparison-card')
    mark(direct(direct(card)[0])[0],'comparison-card-heading')
    mark(direct(card)[-1],'card-note')

# Calculator and complete original tariffs.
prices = sections[3]
mark(prices,'prices')
wrap=direct(prices)[0]
mark(wrap,'container')
section_heading(prices)
grid = wrap.select_one('.grid')
mark(grid,'price-grid')
calculator,tariffs = direct(grid)
mark(calculator,'calculator')
mark(tariffs,'tariffs')
mark(direct(calculator)[0],'calculator-media')
mark(direct(calculator)[1],'calculator-heading')
mark(calculator.find(id='calc-mode-std').parent,'calc-tabs')
mark(calculator.find(id='inp-l').parent.parent.parent,'calc-inputs')
mark(calculator.find(id='calc-sum-val').parent,'calc-sum')
mark(calculator.find(id='calc-result-price').parent.parent,'calc-result')
mark(calculator.find(id='calc-result-price').parent.parent.find_next_sibling('div'),'calc-benefits')
mark(tariffs.table.parent,'table-scroll')
tariffs.table.parent['role']='region'
tariffs.table.parent['aria-label']='Tariftabelle: auf kleinen Bildschirmen horizontal scrollbar'
tariffs.table.parent['tabindex']='0'
mark(direct(tariffs)[0],'tariff-heading')
mark(direct(tariffs)[-1],'tariff-notes')
for input_el in prices.select('input'):
    label = input_el.find_previous('label')
    if label: label['for']=input_el['id']
prices.find(id='calc-mode-std')['type']='button'
prices.find(id='calc-mode-sp')['type']='button'
prices.find(id='calc-mode-std')['aria-pressed']='true'
prices.find(id='calc-mode-sp')['aria-pressed']='false'
for element_id in ['calc-result-price','calc-result-cat']:
    prices.find(id=element_id)['aria-live']='polite'

# Existing service photos and all their captions become dark image-first cards.
services=sections[4]
mark(services,'services')
section_heading(services)
grid=services.select_one('.grid')
mark(grid,'service-grid')
for card in direct(grid):
    mark(card,'service-card')
    mark(direct(card)[0],'service-media')
    mark(direct(card)[1],'service-copy')
    for badge in direct(direct(card)[0])[1:]: mark(badge,'media-badge')
    mark(direct(direct(card)[1])[-1],'card-note')
mark(direct(services)[-1],'new-customer')

# About.
about=sections[5]
mark(about,'about')
mark(direct(about)[0],'about-grid')
mark(about.figure,'about-media')
mark(direct(direct(about)[0])[-1],'about-copy')
section_heading(about)

# Reviews keep original excerpts and native horizontal scroll controls.
reviews=sections[6]
mark(reviews,'reviews')
mark(reviews.select_one('.chaski-reviews__inner'),'container')
mark(reviews.select_one('.chaski-reviews__heading'),'reviews-heading')
mark(reviews.select_one('.chaski-reviews__track'),'reviews-track')
for card in reviews.select('.chaski-review'):
    mark(card,'review-card')
    for name,newname in [('chaski-review__stars','review-stars'),('chaski-review__person','review-person'),('chaski-review__avatar','review-avatar')]:
        mark(card.select_one('.'+name),newname)
mark(reviews.select_one('.chaski-reviews__footer'),'reviews-bottom')
mark(reviews.select_one('.chaski-reviews__controls'),'review-controls')

# Branch block, keep all source copy and image.
branch=sections[7]
mark(branch,'branch')
for original_class,newname in [('chaski-branch-cta__frame','branch-frame'),('chaski-branch-cta__station','branch-visual'),('chaski-branch-cta__status','eyebrow'),('chaski-branch-cta__distance','branch-distance'),('chaski-branch-cta__content','branch-copy'),('chaski-branch-cta__route','branch-route'),('chaski-branch-cta__actions','branch-actions'),('chaski-branch-cta__label','eyebrow')]:
    mark(branch.select_one('.'+original_class),newname)

# FAQ native details, retained source text.
faq=sections[8]
mark(faq,'faq')
mark(direct(faq)[0],'container')
section_heading(faq)
mark(faq.details.parent,'faq-list')
mark(direct(direct(faq)[0])[-1],'section-actions')

# Closing conversion region.
register=sections[9]
mark(register,'register')
box=direct(register)[0]
for dec in list(box.select('div.absolute')):
    # Preserve original atmosphere photo but avoid another fake real-world scene.
    if dec.find('img'): mark(dec,'register-atmosphere')
    elif not dec.get_text(strip=True): dec.decompose()
mark(box,'register-box')
content=box.find('h2').parent
mark(content,'register-copy')
mark(direct(content)[0],'eyebrow')
mark(direct(content)[3],'register-actions')
mark(direct(content)[4],'register-benefits')

# Contact: branch photo replaces the source's schematic map while all map labels remain.
contact=sections[10]
mark(contact,'contact')
outer=direct(contact)[0]
mark(outer,'contact-frame')
grid=outer.select_one('.grid')
mark(grid,'contact-grid')
contact_info, map_column=direct(grid)
mark(contact_info,'contact-info')
mark(map_column,'contact-location')
mark(contact_info.select_one('.grid'),'contact-detail-grid')
for group in contact_info.select('h4'):
    mark(group.parent,'contact-detail')
    if group.parent.find('a'): mark(group.parent.find('a').parent,'contact-actions')
mark(direct(contact_info)[-1],'contact-route')
map_frame=direct(map_column)[0]
mark(map_frame,'location-frame')
svg=map_frame.find('svg')
labels=[text.get_text() for text in svg.select('text')]
svg.parent.decompose()
photo=copy.deepcopy(services.select_one('[data-ui="service-media"] img'))
photo['alt']='CHASKI Filiale in Konstanz'
photo['loading']='lazy'
map_frame.insert(0,photo)
context=fresh('div',{'data-ui':'location-context'})
for label in labels: context.append(fresh('span',content=label))
map_frame.append(context)
for index,child in enumerate(direct(map_frame)):
    if child.name=='div' and child.get('data-ui')!='location-context': mark(child,'location-label-'+str(index))

for section in sections:
    clean(section)
    main.append(section.extract())

# Highlight selected original words with the reference's italic display serif.
accents={
    'start': 'in Konstanz.',
    'so-funktionierts': 'deutschen Adresse',
    'vergleich': 'CHASKI',
    'preise': 'Größenrechner',
    'services': 'für dich da.',
    'ueber-chaski': 'CHASKI?',
    'kundenbewertungen': 'unsere Kunden',
    'lieferadresse-konstanz': 'in Konstanz',
    'faq': 'auf den Punkt',
    'registrieren': 'Lieferadresse anlegen'
}
for section_id, phrase in accents.items():
    section=output.find(id=section_id)
    heading=section.find(['h1','h2'])
    for textnode in list(heading.find_all(string=True)):
        if phrase in textnode:
            before,after=str(textnode).split(phrase,1)
            emphasis=fresh('em',content=phrase)
            textnode.replace_with(NavigableString(before),emphasis,NavigableString(after))
            break
    if section_id=='start':
        heading.em.insert_before(fresh('br'))

footer=soup.footer.extract()
mark(footer,'footer')
mark(direct(footer)[0],'container')
mark(footer.select_one('.grid'),'footer-grid')
mark(direct(direct(footer)[0])[-1],'footer-bottom')
clean(footer)
output.body.append(footer)
wordmark=fresh('div',{'data-ui':'footer-wordmark','aria-hidden':'true'},'CHASKI')
footer.append(wordmark)

# Normalize all ordinary CTA styles to this design system.
for link in output.select('a'):
    if link.find_parent(['nav','footer']) or link.get('data-ui') in ['brand','skip']: continue
    if link.find('span',class_='icon') or link.find_parent(attrs={'data-ui':'hero-actions'}) or link.find_parent(attrs={'data-ui':'register-actions'}):
        link['data-button']='secondary' if 'preise' in link.get('href','') or 'kontakt' in link.get('href','') else 'primary'
for image in output.select('img'):
    if not image.find_parent(attrs={'data-ui':'hero'}): image['loading']='lazy'
    image['decoding']='async'

# Localize pre-existing image assets for the standalone preview.
manifest={}
for image in output.select('img'):
    src=image.get('src','')
    if src.startswith('http'):
        filename='source-'+sha256(src.encode()).hexdigest()[:12]+'.png'
        manifest[filename]=src
        image['src']='assets-syn-cora/'+filename
    elif src and not src.startswith('assets-syn-cora/'):
        local=(root/src).resolve()
        if local.is_file():
            filename='source-'+sha256(src.encode()).hexdigest()[:12]+local.suffix
            shutil.copyfile(local,root/'assets-syn-cora'/filename)
            manifest[filename]=src
            image['src']='assets-syn-cora/'+filename
(root/'qa-syn-cora/source-images.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
(root/'code-alternative-syncora.html').write_text(str(output),encoding='utf-8')
baseline=root/'qa-syn-cora/original-sha256.txt'
if not baseline.exists(): baseline.write_text(sha256(source.read_bytes()).hexdigest(),encoding='utf-8')
print(f'Created alternative with {len(sections)} source sections and {len(manifest)} source photos.')
