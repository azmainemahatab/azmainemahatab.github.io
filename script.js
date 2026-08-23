(() => {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuButton = document.getElementById('menuButton');
  const navLinks = document.getElementById('navLinks');
  const year = document.getElementById('year');
  const storageKey = 'mahatab-portfolio-theme';

  if (year) year.textContent = new Date().getFullYear();

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(storageKey); } catch (_) {}
  const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.textContent = '☀';
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
      }
    } else {
      root.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.textContent = '◐';
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }

  applyTheme(savedTheme || systemTheme);

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(storageKey, next); } catch (_) {}
  });

  function closeMenu() {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
  }

  menuButton?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('in-view'));
  }

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    const finePointer = window.matchMedia?.('(hover:hover) and (pointer:fine)').matches;
    if (finePointer) {
      document.querySelectorAll('.info-card,.feature-card,.edu-card').forEach(card => {
        card.addEventListener('pointermove', event => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
          card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
        });
      });
    }
  }
})();
