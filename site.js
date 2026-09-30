// Page behavior: header, hero effects, tabs, flip cards, chess ladder, timeline, FAQ, reveals,
// and the "On this page" list on the Terms/Privacy pages. Everything still works (without motion)
// for visitors who prefer reduced motion.
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Headline words rise in one by one.
  for (const h of $$('[data-split]')) {
    const words = h.textContent.trim().split(/\s+/);
    h.innerHTML = words.map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' ');
  }
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  // Header shrinks after scrolling; the line under it shows reading progress.
  const nav = $('.nav');
  const bar = $('.nav-progress');
  const onScroll = () => {
    nav?.classList.toggle('stuck', window.scrollY > 24);
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    }
    updateTimeline();
  };

  // Rotating words in the headline.
  const rot = $$('.rot > span');
  if (rot.length > 1 && !RM) {
    let i = 0;
    setInterval(() => {
      const cur = rot[i];
      i = (i + 1) % rot.length;
      cur.classList.replace('on', 'out');
      rot[i].classList.remove('out');
      rot[i].classList.add('on');
      setTimeout(() => cur.classList.remove('out'), 600);
    }, 2600);
  }

  // Mouse parallax: layers move by their data-depth.
  for (const stage of $$('[data-parallax]')) {
    if (RM) break;
    const layers = $$('[data-depth]', stage);
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      for (const l of layers) l.style.translate = `${x * l.dataset.depth * 28}px ${y * l.dataset.depth * 22}px`;
    });
    stage.addEventListener('mouseleave', () => layers.forEach((l) => { l.style.translate = '0 0'; }));
  }

  // Numbers count up when they come into view.
  const countUp = (el) => {
    const to = Number(el.dataset.count);
    if (RM) return;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / 1600);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Feature tabs with a sliding indicator (arrow keys move between tabs).
  const tabList = $('.tab-list');
  if (tabList) {
    const tabs = $$('[role="tab"]', tabList);
    const ind = $('.tab-ind', tabList);
    const moveInd = (tab) => {
      if (!ind) return;
      ind.style.top = `${tab.offsetTop + 8}px`;
      ind.style.height = `${tab.offsetHeight - 16}px`;
    };
    const select = (tab) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.hidden = !on;
        if (on) {
          panel.classList.remove('swap');
          void panel.offsetWidth; // restart the entrance animation
          panel.classList.add('swap');
        }
      }
      moveInd(tab);
    };
    tabs.forEach((t, i) => {
      t.tabIndex = i ? -1 : 0;
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        const next = tabs[(i + d + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
    moveInd(tabs[0]);
    window.addEventListener('resize', () => moveInd(tabs.find((t) => t.getAttribute('aria-selected') === 'true')));
  }

  // Flip cards: hover flips on desktop; tap (or Enter) flips everywhere.
  for (const card of $$('.flip')) card.addEventListener('click', () => card.classList.toggle('flipped'));

  // Chess ladder: advances by itself (pauses on hover); click a level to jump to it.
  const LEVELS = [
    ['250', '🟢 Easy', 'Just learning the moves? This bot blunders often and misses checkmates. A friendly first opponent.', '5 🪙'],
    ['750', '🟡 Intermediate', 'Plays sensible moves but still hangs pieces now and then. Good practice for casual players.', '10 🪙'],
    ['1550', '🟠 Expert', 'A solid club player. It punishes mistakes, so think before you move.', '25 🪙'],
    ['2200', '🔴 Master', 'Candidate Master strength. Beating it unlocks the 🤖 Checkmate the Machine achievement.', '60 🪙'],
    ['2600', '🟣 Grandmaster', 'Strong Grandmaster level. Win once and you earn 👑 Giant Slayer.', '120 🪙'],
  ];
  const ladder = $('.ladder');
  if (ladder) {
    const steps = $$('.ladder-steps button', ladder);
    const panel = $('.ladder-panel', ladder);
    let current = 0;
    const show = (n) => {
      current = n;
      steps.forEach((s, i) => {
        s.setAttribute('aria-selected', i === n);
        s.classList.toggle('done', i < n);
        const fill = $('.bar i', s);
        fill.style.animation = 'none';
        void fill.offsetWidth;
        fill.style.animation = '';
      });
      const [num, title, text, reward] = LEVELS[n];
      $('.ladder-num', panel).textContent = num;
      $('h3', panel).textContent = title;
      $('p', panel).textContent = text;
      $('.reward', panel).innerHTML = `Win: <b>${reward}</b>`;
      panel.classList.remove('swap');
      void panel.offsetWidth;
      panel.classList.add('swap');
    };
    steps.forEach((s, i) => {
      s.addEventListener('click', () => show(i));
      $('.bar i', s).addEventListener('animationend', () => { if (i === current) show((current + 1) % steps.length); });
    });
  }

  // Get-started timeline fills as you scroll past it.
  const tl = $('.timeline');
  const tlFill = $('.tl-fill');
  const tlSteps = $$('.tl-step');
  function updateTimeline() {
    if (!tl) return;
    const r = tl.getBoundingClientRect();
    const mid = window.innerHeight * 0.6;
    const h = Math.max(0, Math.min(r.height - 16, mid - r.top));
    tlFill.style.height = `${h}px`;
    for (const s of tlSteps) s.classList.toggle('on', s.getBoundingClientRect().top < mid);
  }

  // FAQ accordion.
  for (const qa of $$('.qa')) {
    const btn = $('button', qa);
    btn.addEventListener('click', () => {
      const open = qa.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  // Table of contents from the <h2> headings in .prose (Terms and Privacy pages).
  const toc = $('.toc ol');
  const headings = $$('.prose h2');
  if (toc) {
    for (const h of headings) {
      h.id ||= h.textContent.toLowerCase().replace(/^\d+\.\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${h.id}`;
      a.textContent = h.textContent;
      li.append(a);
      toc.append(li);
    }
    const links = new Map([...toc.querySelectorAll('a')].map((a) => [a.hash.slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        for (const a of links.values()) a.classList.remove('active');
        links.get(e.target.id)?.classList.add('active');
      }
    }, { rootMargin: '-90px 0px -70% 0px' });
    headings.forEach((h) => spy.observe(h));
  }

  // Fade sections in as they scroll into view (and start the counters then).
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('visible');
        $$('[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      }
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
});
