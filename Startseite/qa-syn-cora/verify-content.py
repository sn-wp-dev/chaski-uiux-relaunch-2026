"""Verify preserved editorial text, link destinations, sections and source file."""
from bs4 import BeautifulSoup
from pathlib import Path
from collections import Counter
from hashlib import sha256
import re, json, unicodedata

root=Path(__file__).resolve().parents[1]
source=BeautifulSoup((root/'code.html').read_text(encoding='utf-8'),'html.parser')
result=BeautifulSoup((root/'code-alternative-syncora.html').read_text(encoding='utf-8'),'html.parser')

def text(node):
    clone=BeautifulSoup(str(node),'html.parser')
    for tag in clone.select('script,style,.material-symbols-outlined,.icon,[data-ui="footer-wordmark"]'):
        tag.decompose()
    return unicodedata.normalize('NFKC',clone.get_text(' ',strip=True))

def words(node):
    return Counter(re.findall(r'\w+',text(node)))

def links(node):
    return Counter((a.get('href',''),text(a)) for a in node.select('a'))

report={'source_unchanged':sha256((root/'code.html').read_bytes()).hexdigest()==(root/'qa-syn-cora/original-sha256.txt').read_text().strip(),'sections':[]}
before=source.select('main>section');after=result.select('main>section')
assert len(before)==len(after)==11
for old,new in zip(before,after):
    missing=words(old)-words(new)
    added=words(new)-words(old)
    missing_links=links(old)-links(new)
    report['sections'].append({'id':new['id'],'missing_words':dict(missing),'added_words':dict(added),'missing_links':[{'href':key[0],'label':key[1],'count':count} for key,count in missing_links.items()]})
report['footer_missing_words']=dict(words(source.footer)-words(result.footer))
report['footer_missing_links']=[str(key) for key in links(source.footer)-links(result.footer)]
report['header_missing_links']=[str(key) for key in links(source.header)-links(result.header)]
report['passed']=report['source_unchanged'] and all(not row['missing_words'] and not row['missing_links'] for row in report['sections']) and not report['footer_missing_words'] and not report['footer_missing_links'] and not report['header_missing_links']
(root/'qa-syn-cora/content-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=True,indent=2))
assert report['passed'], 'Content preservation failed; see report.'
