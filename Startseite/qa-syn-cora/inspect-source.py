from bs4 import BeautifulSoup
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1]
soup = BeautifulSoup((root / 'code.html').read_text(encoding='utf-8'), 'html.parser')
sections = soup.select('main > section')
lines = []
inventory = []
for index, section in enumerate(sections):
    lines.append(f'\nSECTION {index} #{section.get("id", "hero")}\n')
    for child in section.children:
        if getattr(child, 'name', None):
            lines.append(f'DIRECT {child.name} {child.get("class", [])}')
    clone = BeautifulSoup(str(section), 'html.parser')
    for tag in clone.select('script,style,.material-symbols-outlined,svg'):
        tag.decompose()
    lines.append(clone.get_text(' ', strip=True))
    inventory.append({'index': index, 'id': section.get('id', ''),
                      'headings': [h.get_text(' ', strip=True) for h in section.select('h1,h2,h3,h4')],
                      'images': [{'alt': i.get('alt'), 'src': i.get('src')} for i in section.select('img')],
                      'text': clone.get_text(' ', strip=True)})
(root/'qa-syn-cora/content-inventory.txt').write_text('\n'.join(lines), encoding='utf-8')
(root/'qa-syn-cora/content-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2),encoding='utf-8')
refs = ['c73816ef-a282-4de8-b500-a2b06b81ccf1','6838d144-dbf1-4ff9-afa0-03d778a10cf0','16d007d9-d902-4fcc-b9cf-51f0869bf9a2','bea85231-9ff5-4d0a-9bc5-f6fb352cd6be','3a09ab37-aee0-42f9-b036-1b75d88e5ee2','b76f28ab-fc82-4715-8d49-3e13a3343767','80981b57-9ca2-4cd6-9307-198aefbb619c','5e31ab88-3860-4614-9564-eb4ba7da8d24']
for index, name in enumerate(refs,1):
    source = Path('C:/Users/Megaport/AppData/Local/Temp')/f'codex-clipboard-{name}.png'
    im = Image.open(source).transpose(Image.Transpose.ROTATE_270)
    im.thumbnail((1600,1600))
    im.save(root/f'qa-syn-cora/reference-{index}.png')
print('\n'.join(lines))
