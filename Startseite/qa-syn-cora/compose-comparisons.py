from pathlib import Path
from PIL import Image,ImageDraw
import json

p=Path(__file__).resolve().parent
page=Image.open(p/'full-desktop.png')
bounds={row['id']:row for row in json.loads((p/'section-bounds.json').read_text())}

def region(section):
    row=bounds[section]
    return page.crop((0,row['top'],page.width,row['top']+row['height']))

def compare(filename,left,right,caption):
    canvas=Image.new('RGB',(1440,1100),'#f5f5ee')
    draw=ImageDraw.Draw(canvas)
    draw.text((12,8),'Referenz, Screenshot-Ausschnitt',fill='black')
    draw.text((732,8),caption,fill='black')
    for i,im in enumerate([left.copy(),right.copy()]):
        im.thumbnail((708,1056))
        canvas.paste(im,(12+i*720,30))
    bottom=max(int(left.height*min(708/left.width,1056/left.height)),int(right.height*min(708/right.width,1056/right.height)))+42
    canvas.crop((0,0,1440,bottom)).save(p/filename)

ref8=Image.open(p/'reference-8.png').crop((128,128,1472,1280))
hero=region('start')
hero.save(p/'hero-desktop.png')
compare('compare-hero-2.png',ref8,hero,'CHASKI Hero, final')
compare('compare-hero-detail.png',ref8.crop((60,140,1284,580)),hero.crop((60,150,1365,620)),'CHASKI Typografie, Abstaende und Aktionen')
ref2=Image.open(p/'reference-2.png').crop((128,0,1472,1280))
compare('compare-prices.png',ref2,region('preise'),'CHASKI Preise und vollstaendige Tarife')
ref4=Image.open(p/'reference-4.png').crop((128,0,1472,1280))
compare('compare-workflow.png',ref4,region('so-funktionierts'),'CHASKI Workflow und drei Schritte')
ref1=Image.open(p/'reference-1.png').crop((108,475,1242,1080))
compare('compare-footer.png',ref1,region('footer'),'CHASKI Footer und Markenwort')
page.resize((600,round(page.height*600/page.width))).save(p/'overview-desktop.png')
for section in ['vergleich','services','ueber-chaski','kundenbewertungen','lieferadresse-konstanz','kontakt']:
    region(section).save(p/(section+'-desktop.png'))
print('Saved normalized comparison inputs and source-content region captures.')
