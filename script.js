(function(){'use strict';
const menuButton=document.getElementById('menuButton');
const navLinks=document.getElementById('navLinks');
if(menuButton&&navLinks){
  menuButton.addEventListener('click',()=>{
    const open=navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open navigation');
  }));
}
const root=document.documentElement;
const themeToggle=document.getElementById('themeToggle');
const key='theme-preference';
let saved=null;
try{saved=localStorage.getItem(key)}catch(e){}
const preferred=saved||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
function applyTheme(theme){
  if(theme==='dark'){root.setAttribute('data-theme','dark');if(themeToggle)themeToggle.textContent='☀';}
  else{root.removeAttribute('data-theme');if(themeToggle)themeToggle.textContent='◐';}
}
applyTheme(preferred);
if(themeToggle){themeToggle.addEventListener('click',()=>{
  const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
  applyTheme(next);try{localStorage.setItem(key,next)}catch(e){}
});}
const reveal=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}
  }),{threshold:.12});
  reveal.forEach(el=>observer.observe(el));
}else{reveal.forEach(el=>el.classList.add('in-view'));}
})();
