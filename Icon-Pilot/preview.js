const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const stages = [...document.querySelectorAll('.stage')];
const timers = new Map();
let mode = 'static';
function stop(stage) {
  clearTimeout(timers.get(stage));
  timers.delete(stage);
  stage.querySelector('svg').classList.remove('is-playing');
}
function play(stage, once = false) {
  stop(stage);
  if (reducedMotion.matches) return;
  const svg = stage.querySelector('svg');
  void svg.getBoundingClientRect();
  svg.classList.add('is-playing');
  if (once) timers.set(stage,setTimeout(()=>stop(stage),2300));
}
function applyMode() {
  stages.forEach(stop);
  document.querySelectorAll('[data-mode]').forEach(button=>{
    button.setAttribute('aria-pressed',String(button.dataset.mode===mode));
    button.disabled = reducedMotion.matches && button.dataset.mode!=='static';
  });
  document.body.dataset.motion = mode;
  document.getElementById('motion-status').textContent = reducedMotion.matches
    ? '„Bewegung reduzieren“ ist aktiv. Alle Icons werden statisch angezeigt.'
    : mode==='loop' ? 'Die Animationen laufen mit einer kurzen Ruhephase. Mit „Statisch“ stoppst du sie.'
    : mode==='hover' ? 'Bewege den Zeiger auf ein Icon, nutze die Tab-Taste oder tippe es an.'
    : 'Klicke ein Icon an, um seine Animation einmal abzuspielen.';
  if(mode==='loop') stages.forEach(stage=>play(stage));
}
document.querySelectorAll('[data-bg]').forEach(button=>button.addEventListener('click',()=>{
  document.body.dataset.background = button.dataset.bg;
  document.querySelectorAll('[data-bg]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
}));
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  mode = button.dataset.mode;
  applyMode();
}));
document.getElementById('icon-size').addEventListener('change',event=>{
  document.documentElement.style.setProperty('--icon-size',`${event.target.value}px`);
});
stages.forEach(stage=>{
  stage.addEventListener('click',()=>play(stage,mode!=='loop'));
  stage.addEventListener('pointerenter',()=>{if(mode==='hover') play(stage,true);});
  stage.addEventListener('focus',()=>{if(mode==='hover') play(stage,true);});
  stage.addEventListener('pointerleave',()=>{if(mode==='hover') stop(stage);});
  stage.addEventListener('blur',()=>{if(mode==='hover') stop(stage);});
});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches) mode='static';applyMode();});
document.addEventListener('visibilitychange',()=>{if(document.hidden) stages.forEach(stop);else applyMode();});
applyMode();
