const { chromium } = require('C:/Users/Megaport/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
(async () => {
 const browser = await chromium.launch({headless:true,executablePath:'C:/Users/Megaport/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
 const page = await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const dir=path.join(__dirname,'review');fs.mkdirSync(dir,{recursive:true});
 for(const width of [1440,768,390,320]) {
  await page.setViewportSize({width,height:1000});
  for(const file of ['code.html','kundenkarte.html','support.html','registrierung.html','login.html']){
   await page.goto(pathToFileURL(path.join(__dirname,file)).href);
   await page.evaluate(()=>document.fonts.ready);
   const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),font:document.fonts.check('14px "Plus Jakarta Sans"'),h1:document.querySelectorAll('h1').length}));
   if(result.overflow||result.images.length||!result.font||result.h1!==1)throw new Error(file+' '+width+' '+JSON.stringify(result));
   if(width===1440||width===390)await page.screenshot({path:path.join(dir,file.replace('.html','')+'-'+width+'.png'),fullPage:true});
   console.log('PASS',file,width,JSON.stringify(result));
  }
 }
 await page.goto(pathToFileURL(path.join(__dirname,'registrierung.html')).href);
 const required=await page.locator('input[required],select[required]').count();
 if(required!==13)throw new Error('Expected 13 mandatory fields, got '+required);
 await page.locator('#user_pass').fill('Example-only-123');await page.locator('#user_confirm_password').fill('Different-123');
 if(await page.locator('#user_confirm_password').evaluate(e=>e.validity.valid))throw new Error('Password mismatch not caught');
 await page.locator('#user_confirm_password').fill('Example-only-123');
 if(!await page.locator('#user_confirm_password').evaluate(e=>e.validity.valid))throw new Error('Password mismatch did not clear');
 await page.locator('[aria-controls=user_pass]').click();
 if(await page.locator('#user_pass').getAttribute('type')!=='text')throw new Error('Password visibility failed');
 for(const [id,value] of Object.entries({user_email:'demo@example.com',first_name:'Demo',last_name:'Beispiel',input_box_1677437939:'Musterstrasse',input_box_1677437943:'1',number_box_1677437972:'8000',input_box_1677437985:'Zürich'}))await page.locator('#'+id).fill(value);
 await page.locator('#privacy').check();await page.locator('#terms').check();
 await page.locator('button[type=submit]').click();
 if(!await page.locator('.form-feedback').isVisible())throw new Error('Registration feedback missing');
 await page.goto(pathToFileURL(path.join(__dirname,'login.html')).href);
 await page.locator('#username').fill('demo@example.com');await page.locator('#password').fill('Example-only-123');await page.locator('button[type=submit]').click();
 if(!await page.locator('.form-feedback').isVisible())throw new Error('Login feedback missing');
 await page.goto(pathToFileURL(path.join(__dirname,'code.html')).href);
 await page.locator('[data-copy]').click();
 await page.locator('.toast').waitFor({state:'visible'});
 await page.locator('.mobile-account summary').click();await page.locator('.mobile-account a[href="support.html"]').click();
 if(!page.url().endsWith('/support.html'))throw new Error('Mobile navigation failed');
 await page.goto(pathToFileURL(path.join(__dirname,'kundenkarte.html')).href);
 const downloadPromise=page.waitForEvent('download');await page.locator('a[download]').click();const download=await downloadPromise;
 if(await download.failure())throw new Error('Card download failed');
 if(errors.length)throw new Error(errors.join('\n'));
 console.log('PASS required fields, mismatch, password visibility, registration, login, copy feedback, mobile navigation, card download; no JS errors');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
