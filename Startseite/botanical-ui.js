(() => {
  'use strict';
  // Regular hours verified against the CHASKI website and site-core defaults.
  // This local prototype does not receive exceptional closures from WordPress.
  function getShopStatus(now = new Date()) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
      timeZone:'Europe/Berlin', year:'numeric', month:'2-digit', day:'2-digit',
      hour:'2-digit', minute:'2-digit', hourCycle:'h23'
    }).formatToParts(now).map(part => [part.type,part.value]));
    const year = Number(parts.year), month = Number(parts.month), day = Number(parts.day);
    const date = `${parts.year}-${parts.month}-${parts.day}`;
    const weekday = new Date(Date.UTC(year,month-1,day)).getUTCDay();
    const minutes = Number(parts.hour)*60 + Number(parts.minute);
    // Gregorian Easter, same movable holidays as the existing shop-hours module.
    const a=year%19, b=Math.floor(year/100), c=year%100, d=Math.floor(b/4), e=b%4;
    const f=Math.floor((b+8)/25), g=Math.floor((b-f+1)/3), h=(19*a+b-d-g+15)%30;
    const i=Math.floor(c/4), k=c%4, l=(32+2*e+2*i-h-k)%7, m=Math.floor((a+11*h+22*l)/451);
    const easterMonth=Math.floor((h+l-7*m+114)/31), easterDay=(h+l-7*m+114)%31+1;
    const easter=Date.UTC(year,easterMonth-1,easterDay);
    const holidays = new Set(['01-01','01-06','05-01','10-03','11-01','12-25','12-26'].map(value=>`${year}-${value}`));
    [-2,1,39,50,60].forEach(offset => holidays.add(new Date(easter+offset*86400000).toISOString().slice(0,10)));
    const window = weekday===6 ? [600,780] : weekday>=1 && weekday<=5 ? [960,1140] : null;
    const open = !holidays.has(date) && window !== null && minutes>=window[0] && minutes<window[1];
    return {open,holiday:holidays.has(date),date,label:open ? 'Laden geöffnet' : 'Laden geschlossen'};
  }
  if (typeof module === 'object' && module.exports) module.exports = {getShopStatus};
  if (typeof document === 'undefined') return;
  const status = document.getElementById('footer-shop-status');
  const updateStatus = () => {
    if (!status) return;
    const result = getShopStatus();
    status.textContent = result.label;
    status.dataset.open = String(result.open);
  };
  updateStatus();
  setInterval(updateStatus,60000);
  document.addEventListener('visibilitychange',() => {if (!document.hidden) updateStatus();});

  const track = document.getElementById('kundenbewertungen-liste');
  if (!track) return;
  const buttons = document.querySelectorAll('[data-review-direction]');
  const position = document.getElementById('review-position');
  const step = () => track.firstElementChild.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).gap)||0);
  const update = () => {
    const max = Math.max(0,track.scrollWidth-track.clientWidth);
    buttons[0].disabled = track.scrollLeft<=2;
    buttons[1].disabled = track.scrollLeft>=max-2;
    const first=Math.round(track.scrollLeft/step())+1;
    const visible=Math.max(1,Math.round((track.clientWidth+(parseFloat(getComputedStyle(track).gap)||0))/step()));
    if (position) position.textContent = `${first}${visible>1?'–'+Math.min(track.children.length,first+visible-1):''} von ${track.children.length}`;
  };
  const move = left => track.scrollTo({left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  buttons.forEach(button => button.addEventListener('click',()=>move(track.scrollLeft+Number(button.dataset.reviewDirection)*step())));
  track.addEventListener('keydown',event => {
    const actions={ArrowLeft:track.scrollLeft-step(),ArrowRight:track.scrollLeft+step(),Home:0,End:track.scrollWidth};
    if (!(event.key in actions)) return;
    event.preventDefault(); move(actions[event.key]);
  });
  track.addEventListener('scroll',update,{passive:true});
  new ResizeObserver(update).observe(track);
  update();
})();
