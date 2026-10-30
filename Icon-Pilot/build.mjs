// Regenerate the portable preview and animated SVGs from the three source icons.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
const root = dirname(fileURLToPath(import.meta.url));
const motion = readFileSync(join(root, 'motion.css'), 'utf8');
const items = [
  { file:'chaski-paket', prefix:'pkg-', name:'Paket', number:'01', action:'Deckel anheben', part:'lid', description:'Helle Flächen, moosgrüne Seiten und ein Deckel, der sich sanft hebt.' },
  { file:'chaski-brief-bestaetigt', prefix:'mail-', name:'Brief bestätigt', number:'02', action:'Bestätigung zeigen', part:'check', description:'Ein gefalteter Umschlag mit einem plastischen, federnden Häkchen.' },
  { file:'chaski-download', prefix:'dl-', name:'Download', number:'03', action:'Pfeil bewegen', part:'arrow', description:'Runde Kanten und ein kurzer Impuls in Richtung Ablage.' }
];
mkdirSync(join(root,'animated'),{recursive:true});
mkdirSync(join(root,'assets'),{recursive:true});
for (let index = 0; index < 4; index++) copyFileSync(join(root,`../SEO-Landingpage/assets/jakarta-${index}.woff2`), join(root,`assets/jakarta-${400+index*100}.ttf`));
function inline(svg, prefix, instance) {
  return svg.replaceAll(prefix,`${instance}-${prefix}`).replace(/role="img" aria-labelledby="[^"]+"/,'aria-hidden="true" focusable="false"');
}
let cards = '', samples = '';
for(const item of items) {
  const svg = readFileSync(join(root,'icons',`${item.file}.svg`),'utf8');
  const animated = svg.replace(/class="([^"]+)"/, 'class="$1 is-playing"').replace('</title>',`</title>\n<style>${motion}</style>`);
  writeFileSync(join(root,'animated',`${item.file}-animated.svg`),animated);
  cards += `<article class="icon-card"><div class="card-meta"><span>${item.number}</span><span>CHASKI / SOFT VOLUME</span></div>
    <button class="stage" aria-label="${item.name}: Animation abspielen" data-part="${item.part}">${inline(svg,item.prefix,'main')}</button>
    <div class="card-copy"><h2>${item.name}</h2><p>${item.description}</p></div>
    <div class="card-links"><a href="icons/${item.file}.svg" download>SVG laden <span aria-hidden="true">↓</span></a><a href="animated/${item.file}-animated.svg" download>Animiert <span aria-hidden="true">↓</span></a></div></article>`;
  samples += `<div class="size-sample"><h3>${item.name}</h3><div class="sample-row">${[32,48,64,96].map(size=>`<div><span class="sample-icon" style="width:${size}px;height:${size}px">${inline(svg,item.prefix,`size${size}`)}</span><small>${size} px</small></div>`).join('')}</div></div>`;
}
const css = readFileSync(join(root,'preview.css'),'utf8');
const js = readFileSync(join(root,'preview.js'),'utf8');
const template = readFileSync(join(root,'preview.template.html'),'utf8');
writeFileSync(join(root,'index.html'),template.replace('<!-- CSS -->',`<style>${css}\n${motion}</style>`).replace('<!-- CARDS -->',cards).replace('<!-- SAMPLES -->',samples).replace('<!-- JS -->',`<script>${js}</script>`));
console.log('Built index.html and 3 animated SVGs. Static SVGs remain the editable source.');
