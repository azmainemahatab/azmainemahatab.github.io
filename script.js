(function(){'use strict';
const responsiveLink=document.createElement('link');
responsiveLink.rel='stylesheet';
responsiveLink.href='responsive.css';
document.head.appendChild(responsiveLink);

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

/* Subtle premium interaction: depth + restrained cursor glow on mouse devices only. */
const interactionStyle=document.createElement('style');
interactionStyle.textContent=`
.edu-card,.work-card,.skill-row,.recognition-item,.timeline-item{position:relative;isolation:isolate;transition:transform .28s cubic-bezier(.2,.7,.2,1),border-color .28s ease,box-shadow .28s ease,background .28s ease}
.edu-card::after,.work-card::after,.skill-row::after,.recognition-item::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(184,255,98,.075),transparent 36%);transition:opacity .28s ease;z-index:-1}
.edu-card:hover,.work-card:hover,.skill-row:hover,.recognition-item:hover{transform:translateY(-4px);border-color:rgba(184,255,98,.28);box-shadow:0 18px 42px rgba(0,0,0,.14),0 0 0 1px rgba(184,255,98,.04)}
.edu-card:hover::after,.work-card:hover::after,.skill-row:hover::after,.recognition-item:hover::after{opacity:1}
.edu-card:hover h3,.work-card:hover h3,.skill-row:hover h3,.recognition-item:hover strong{transform:translateX(2px)}
.edu-card h3,.work-card h3,.skill-row h3,.recognition-item strong{transition:transform .28s ease}
.edu-card,.work-card,.skill-row,.recognition-item,.timeline-item,a,.btn,.theme-toggle,.menu{cursor:pointer}
.timeline-item{border-radius:16px;padding-left:14px;padding-right:14px;margin-left:-14px;margin-right:-14px}
.timeline-item:hover{background:color-mix(in srgb,var(--surface) 82%,transparent);transform:translateX(5px);box-shadow:-2px 0 0 var(--accent)}
.work-card a,.contact-links a,.btn,.nav-cta{position:relative;overflow:hidden}
.work-card a::after,.contact-links a::after,.btn::after,.nav-cta::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 20%,rgba(255,255,255,.12) 48%,transparent 76%);transform:translateX(-120%);transition:transform .55s ease;pointer-events:none}
.work-card a:hover::after,.contact-links a:hover::after,.btn:hover::after,.nav-cta:hover::after{transform:translateX(120%)}
.work-card a:hover,.contact-links a:hover{transform:translateY(-2px)}
.pill-row span{transition:transform .22s ease,border-color .22s ease,background .22s ease,color .22s ease;cursor:default}
.pill-row span:hover{transform:translateY(-2px);border-color:rgba(184,255,98,.36);background:color-mix(in srgb,var(--accent) 7%,transparent);color:var(--text)}
@media (hover:hover) and (pointer:fine){
  .interactive-cursor-ready .edu-card,.interactive-cursor-ready .work-card,.interactive-cursor-ready .skill-row,.interactive-cursor-ready .recognition-item{cursor:pointer}
}
@media (prefers-reduced-motion:reduce){.edu-card,.work-card,.skill-row,.recognition-item,.timeline-item,.btn,.work-card a,.contact-links a{transition:none!important}.edu-card:hover,.work-card:hover,.skill-row:hover,.recognition-item:hover,.timeline-item:hover{transform:none!important}}
`;
document.head.appendChild(interactionStyle);

const finePointer=window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches;
if(finePointer)document.documentElement.classList.add('interactive-cursor-ready');
const interactiveCards=document.querySelectorAll('.edu-card,.work-card,.skill-row,.recognition-item');
if(finePointer){
  interactiveCards.forEach(card=>card.addEventListener('pointermove',event=>{
    const rect=card.getBoundingClientRect();
    card.style.setProperty('--mx',`${((event.clientX-rect.left)/rect.width)*100}%`);
    card.style.setProperty('--my',`${((event.clientY-rect.top)/rect.height)*100}%`);
  }));
}
})();
