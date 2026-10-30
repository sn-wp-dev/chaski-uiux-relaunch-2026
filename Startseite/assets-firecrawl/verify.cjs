const { chromium } = require('C:/Users/Megaport/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const out = __dirname;
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const failures = [];
  page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
  const results = [];
  for (const width of [1440, 1050, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto('http://127.0.0.1:8773/Startseite/code-alternative-firecrawl.html');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.shop-photo img').scrollIntoViewIfNeeded();
    await page.locator('.shop-photo img').evaluate(img => img.decode());
    await page.evaluate(() => window.scrollTo(0,0));
    const layout = await page.evaluate(() => ({width: innerWidth, scrollWidth: document.documentElement.scrollWidth, h1:document.querySelectorAll('h1').length, brokenImages:[...document.images].filter(i => !i.complete || !i.naturalWidth).map(i=>i.src), overflows:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1 && getComputedStyle(e).position!=='absolute').map(e=>e.className).slice(0,8)}));
    layout.switchWorks = await page.locator('.price-teaser').getAttribute('href') === '#preise';
    layout.priceWorks = (await page.locator('#price-result').innerText()).includes('5,00');
    await page.locator('[data-address="checkout"]').click();
    layout.addressWorks = (await page.locator('#address-output').innerText()).includes('Firma:');
    await page.locator('.copy-button').click();
    layout.copyWorks = (await page.evaluate(() => navigator.clipboard.readText())).includes('CHASKI [Kundennummer]');
    const faq = page.locator('.faq-group summary').first();
    await faq.focus(); await page.keyboard.press('Enter');
    layout.faqKeyboardWorks = await page.locator('.faq-group details').first().getAttribute('open') !== null;
    if (width < 901) {
      await page.locator('.menu-button').click();
      layout.menuOpens = await page.locator('.menu-button').getAttribute('aria-expanded') === 'true';
      await page.keyboard.press('Escape');
      layout.menuCloses = await page.locator('.menu-button').getAttribute('aria-expanded') === 'false';
    }
    await page.goto('http://127.0.0.1:8773/Startseite/code-alternative-firecrawl.html');
    await page.locator('.shop-photo img').scrollIntoViewIfNeeded();
    await page.locator('.shop-photo img').evaluate(img => img.decode());
    await page.evaluate(() => window.scrollTo(0,0));
    if(width===1440||width===390) await page.screenshot({ path:path.join(out,`preview-${width}.png`), fullPage:true });
    if(width===390) await page.screenshot({path:path.join(out,'preview-mobile.png')});
    results.push(layout);
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:path.join(out,'preview-desktop.png')});
  await page.locator('.pricing-layout').screenshot({path:path.join(out,'preview-prices.png')});
  await page.locator('.location-section').screenshot({path:path.join(out,'preview-location.png')});
  await page.locator('#bewertungen').screenshot({path:path.join(out,'preview-reviews.png')});
  const localLinks = await page.locator('a[href]').evaluateAll(es=>[...new Set(es.map(e=>e.href).filter(u=>u.startsWith(location.origin) && !u.includes('#')))]);
  const links=[];
  for(const url of localLinks){const response=await context.request.get(url);links.push({url,status:response.status()});}
  await page.emulateMedia({reducedMotion:'reduce'});
  const reducedMotion = await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior);
  const nojs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback = await nojs.newPage();await fallback.goto('http://127.0.0.1:8773/Startseite/code-alternative-firecrawl.html');
  await fallback.locator('.faq-group summary').first().click();
  const noJsWorks = await fallback.locator('.faq-group details').first().getAttribute('open') !== null;
  await page.goto('http://127.0.0.1:8773/Startseite/code-alternative-firecrawl.html');
  const calculatorChecks=[];
  async function calc(mode, dims, count, expected){
    await page.locator('[data-mode="'+mode+'"]').click();
    for(let i=0;i<3;i++) await page.locator(['#measure-length','#measure-width','#measure-height'][i]).fill(String(dims[i]));
    await page.locator('#parcel-count').fill(String(count));
    const actual=await page.locator('#price-result').innerText();
    const passed=actual.includes(expected);calculatorChecks.push({mode,dims,count,expected,passed});
    if(!passed)throw new Error(JSON.stringify({mode,dims,count,expected,actual}));
  }
  for(const [sum,price] of [[35,'3,00'],[35.01,'4,00'],[50,'4,00'],[50.01,'5,00'],[80,'5,00'],[80.01,'7,00'],[120,'7,00'],[120.01,'10,00'],[150,'10,00'],[150.01,'15,00'],[200,'15,00'],[200.01,'Sperrgut prüfen']]) await calc('parcel',[sum-10,10,10],1,price);
  await calc('parcel',[20,40,30],3,'15,00');
  await calc('parcel',[0,40,30],1,'gültige Maße');
  await calc('parcel',[20,40,30],1.5,'gültige Maße');
  await calc('bulky',[150,50,50],1,'20,00');
  await calc('bulky',[150.01,50,50],1,'25,00');
  await calc('bulky',[300,50,50],2,'50,00');
  await calc('bulky',[300.01,50,50],1,'Preis auf Anfrage');
  const schedule=[];
  for(const [date,open] of [['2026-10-30T15:00:00Z','1'],['2026-10-30T18:00:00Z','0'],['2026-10-31T09:00:00Z','1'],['2026-10-31T12:00:00Z','0'],['2026-11-01T11:00:00Z','0'],['2027-01-06T16:00:00Z','0'],['2027-03-26T16:00:00Z','0']]){
    const testPage=await context.newPage();await testPage.clock.install({time:new Date(date)});
    await testPage.goto('http://127.0.0.1:8773/Startseite/code-alternative-firecrawl.html');
    const actual=await testPage.locator('[data-chaski-shop-status]').first().getAttribute('data-open');
    if(actual!==open)throw new Error('Schedule '+date+' '+actual);
    schedule.push({date,open,passed:true});await testPage.close();
  }
  await page.locator('.announcement-close').click();
  await page.reload();
  const dismissWorks=await page.locator('.announcement').isHidden();
  const report={results,calculatorChecks,schedule,dismissWorks,errors,failures,links,reducedMotion,noJsWorks};
  fs.writeFileSync(path.join(out,'qa-results.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  await browser.close();
  if(results.some(r=>r.scrollWidth>r.width ||r.h1!==1 || r.brokenImages.length ||!r.switchWorks ||!r.addressWorks ||!r.copyWorks||!r.faqKeyboardWorks)||errors.length||failures.length||links.some(l=>l.status!==200)||!noJsWorks)process.exitCode=1;
})().catch(error=>{console.error(error);process.exit(1)});
