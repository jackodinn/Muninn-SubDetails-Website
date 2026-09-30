// Page behavior: fade-in on scroll, and the table of contents on the Terms/Privacy pages.
document.addEventListener('DOMContentLoaded', () => {
  // Table of contents from the <h2> headings in .prose (ids are generated from the text).
  const toc = document.querySelector('.toc ol');
  const headings = [...document.querySelectorAll('.prose h2')];
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
    // Highlight the section being read.
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

  // Fade sections in as they scroll into view.
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
});
