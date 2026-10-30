(() => {
  const tools = document.querySelector('.tools');
  if (tools) {
    tools.hidden = false;
    const input = document.querySelector('#blog-search');
    const buttons = [...document.querySelectorAll('[data-filter]')];
    const posts = [...document.querySelectorAll('#post-grid .post-card')];
    let category = 'all';
    const normalize = text => text.toLocaleLowerCase('de-CH').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss');
    function update() {
      const words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
      let count = 0;
      posts.forEach(post => {
        const match = (category === 'all' || post.dataset.category === category) && words.every(word => normalize(post.textContent).includes(word));
        post.hidden = !match;
        if (match) count++;
      });
      document.querySelector('#post-grid').classList.toggle('is-filtered', category !== 'all' || words.length > 0);
      document.querySelector('#result-count').textContent = count + (count === 1 ? ' Beitrag' : ' Beiträge') + (category === 'all' && !words.length ? ' für deinen Einkauf' : ' gefunden');
      document.querySelector('.empty').hidden = count !== 0;
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    }
    buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; update(); }));
    input.addEventListener('input', update);
    document.querySelector('#reset-filter').addEventListener('click', () => {category = 'all'; input.value = ''; update(); input.focus();});
  }
  const toc = document.querySelector('.toc details');
  if (toc) {
    const media = matchMedia('(max-width: 767px)');
    toc.open = !media.matches;
    media.addEventListener('change', event => {toc.open = !event.matches;});
    const links = [...toc.querySelectorAll('a')];
    const sections = links.map(link => document.querySelector(link.getAttribute('href')));
    const updateCurrent = () => {
      let current = sections[0];
      for (const section of sections) if (section.getBoundingClientRect().top <= 180) current = section;
      links.forEach(link => { if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    };
    let scheduled = false;
    window.addEventListener('scroll', () => { if (!scheduled) {scheduled = true; requestAnimationFrame(() => {updateCurrent(); scheduled = false;});} }, {passive:true});
    links.forEach(link => link.addEventListener('click', () => {if(media.matches) toc.open = false;}));
    updateCurrent();
  }
  const menu = document.querySelector('.mobile-menu');
  if (menu) {
    document.addEventListener('keydown', event => { if(event.key === 'Escape' && menu.open){menu.open = false; menu.querySelector('summary').focus();} });
    document.addEventListener('click', event => {if(menu.open && !menu.contains(event.target)) menu.open = false;});
  }
})();
