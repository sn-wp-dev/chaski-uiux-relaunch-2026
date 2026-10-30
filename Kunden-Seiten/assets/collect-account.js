(() => {
 const root=document.querySelector('#click-collect'); if(!root)return;
 const form=root.querySelector('#cc-sign-form'), canvas=root.querySelector('canvas'), ctx=canvas.getContext('2d');
 const badge=root.querySelector('[data-cc-badge]'), statusNote=root.querySelector('[data-cc-status-note]');
 let drawing=false, ink=false, last=null;
 const labels={new:'Noch nicht freigeschaltet',pending:'Prüfung ausstehend',active:'Aktiv'};
 function state(value,focus=false){
   const current=labels[value]?value:'new';
   root.querySelectorAll('[data-cc-view]').forEach(x=>x.hidden=x.dataset.ccView!==current);
   badge.textContent=labels[current];
   statusNote.textContent=current==='active'?'Click & Collect ist aktiv.':current==='pending'?'Unterlagen bei CHASKI in Prüfung.':'Noch nicht freigeschaltet.';
   if(focus)root.querySelector('[data-cc-view="'+current+'"]').focus();
 }
 state(root.dataset.ccStatus||'new');
 const point=e=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height};};
 canvas.addEventListener('pointerdown',e=>{drawing=true;last=point(e);canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!drawing)return;const next=point(e);ctx.strokeStyle='#2D351B';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(next.x,next.y);ctx.stroke();ink=true;last=next;});
 const stop=()=>{drawing=false;last=null;};canvas.addEventListener('pointerup',stop);canvas.addEventListener('pointercancel',stop);
 root.querySelector('#cc-clear').addEventListener('click',()=>{ctx.clearRect(0,0,canvas.width,canvas.height);ink=false;});
 root.querySelectorAll('[name=cc-sign-method]').forEach(input=>input.addEventListener('change',()=>{const typed=input.value==='type';root.querySelector('#cc-draw-wrap').hidden=typed;root.querySelector('#cc-type-wrap').hidden=!typed;if(typed)root.querySelector('#cc-typed-signature').focus();}));
 form.addEventListener('submit',e=>{e.preventDefault();const error=root.querySelector('#cc-error');const selected=root.querySelector('[name=cc-sign-method]:checked');const typed=selected&&selected.value==='type';const name=root.querySelector('#cc-signer').value.trim();const signature=root.querySelector('#cc-typed-signature').value.trim();if(!name||(typed?!signature:!ink)){error.textContent='Bitte deinen vollständigen Namen und deine Unterschrift ergänzen.';error.hidden=false;return;}if(!form.reportValidity())return;error.hidden=true;state('pending',true);form.reset();ctx.clearRect(0,0,canvas.width,canvas.height);ink=false;root.querySelector('#cc-draw-wrap').hidden=false;root.querySelector('#cc-type-wrap').hidden=true;});
})();
