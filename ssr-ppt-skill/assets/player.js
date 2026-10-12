(() => {
  const deck = document.getElementById('ssr-deck');
  if (!deck) throw new Error('SSR player requires #ssr-deck.');
  const player = deck.closest('.ssr-player');
  const stage = deck.closest('.ssr-stage');
  const slides = Array.from(deck.children).filter(el => el.classList.contains('ssr-slide'));
  if (!player || !stage || !slides.length) throw new Error('SSR player requires a stage and slides.');
  const prev = player.querySelector('[data-ssr-prev]');
  const next = player.querySelector('[data-ssr-next]');
  const count = player.querySelector('[data-ssr-count]');
  const fullscreen = player.querySelector('[data-ssr-fullscreen]');
  const status = player.querySelector('[data-ssr-status]');
  if (!prev || !next || !count || !fullscreen || !status) {
    throw new Error('SSR player controls are incomplete.');
  }
  const width = Number(deck.dataset.width || 1280);
  const height = Number(deck.dataset.height || 720);
  if (!(width > 0 && height > 0 && Number.isFinite(width) && Number.isFinite(height))) {
    throw new Error('SSR canvas dimensions must be positive finite numbers.');
  }
  player.style.setProperty('--ssr-width', `${width}px`);
  player.style.setProperty('--ssr-height', `${height}px`);
  let current = 0;
  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.hidden = !active;
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    count.textContent = `${current + 1} / ${slides.length}`;
  }
  function resize() {
    const scale = Math.min(stage.clientWidth / width, stage.clientHeight / height);
    player.style.setProperty('--ssr-scale', String(scale));
  }
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey ||
        event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
    const moves = { ArrowRight: 1, PageDown: 1, ArrowLeft: -1, PageUp: -1 };
    if (event.key in moves) {
      event.preventDefault();
      show(current + moves[event.key]);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      show(event.key === 'Home' ? 0 : slides.length - 1);
    }
  });
  fullscreen.disabled = !document.fullscreenEnabled;
  fullscreen.addEventListener('click', async () => {
    status.textContent = '';
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await player.requestFullscreen();
    } catch (error) {
      status.textContent = '当前浏览器无法进入全屏，可使用浏览器演示模式。';
    }
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement ? '退出全屏' : '全屏';
    resize();
  });
  new ResizeObserver(resize).observe(stage);
  show(0);
  resize();
})();
