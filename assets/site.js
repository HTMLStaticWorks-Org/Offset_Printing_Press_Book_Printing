
(() => {
 const body=document.body, root=document.documentElement;
 const theme=localStorage.getItem('bt-theme')||'light';
 const dir=localStorage.getItem('bt-dir')||'ltr';
 body.classList.toggle('dark',theme==='dark'); root.setAttribute('dir',dir);
 const themeBtns=document.querySelectorAll('[data-theme-toggle]');
 themeBtns.forEach(b=>b.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('bt-theme',body.classList.contains('dark')?'dark':'light');b.setAttribute('aria-label',body.classList.contains('dark')?'Switch to light theme':'Switch to dark theme')}));
 document.querySelectorAll('[data-rtl-toggle]').forEach(b=>b.addEventListener('click',()=>{const next=root.getAttribute('dir')==='rtl'?'ltr':'rtl';root.setAttribute('dir',next);localStorage.setItem('bt-dir',next)}));
 const menu=document.querySelector('.menu-toggle'), links=document.querySelector('.nav-links');
 if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}))}
 const current=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.nav-links a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active')});
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll('main section').forEach(section=>{
   const candidates=section.querySelectorAll('.section-head,.split-copy,.split-media,.activity-card,.feature,.feature-img-card,.price-card,.testimonial,.stat,.safety-row,.gallery-grid,.gallery-grid img,.gallery-photo-card,.booking-form,.contact-grid>div,.panorama-visual,.panorama-copy,.marquee-heading,.safety-image-stack,.safety-visual-copy,.grid > *, .banner-inner,.about-approach-heading,.about-approach-photo,.approach-item,.home2-story-image,.home2-story-copy,.activity-guide-copy,.activity-guide-visual,.contact-map-heading,.map-frame,.faq-intro,.faq-item');
   candidates.forEach(el=>{el.classList.add('reveal');observer.observe(el)});
 });
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

 const filterBtns=document.querySelectorAll('[data-gallery-filter]');
 const galleryCards=document.querySelectorAll('.gallery-photo-card');
 if(filterBtns.length&&galleryCards.length){
   filterBtns.forEach(btn=>{
     btn.addEventListener('click',()=>{
       filterBtns.forEach(b=>b.classList.remove('active'));
       btn.classList.add('active');
       const cat=btn.getAttribute('data-gallery-filter');
       galleryCards.forEach(card=>{
         const cardCat=card.getAttribute('data-category')||'';
         if(cat==='all'||cardCat.includes(cat)){
           card.style.display='';
           setTimeout(()=>card.classList.add('visible'),50);
         } else {
           card.style.display='none';
         }
       });
     });
   });
 }

 const faqItems=[...document.querySelectorAll('.faq-item')];
 faqItems.forEach(item=>item.addEventListener('toggle',()=>{
   if(item.open)faqItems.forEach(other=>{if(other!==item)other.open=false});
 }));
 const form=document.querySelector('#quote-form')||document.querySelector('#booking-form');
 if(form)form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=form.elements.name?form.elements.name.value.trim():'Valued Client';const msg=form.querySelector('.form-message')||document.querySelector('.form-message');if(msg){msg.textContent=`Thank you, ${name}! Your print quote request has been received. Our prepress estimating team will review your specifications and contact you shortly with a detailed proposal.`}form.reset()});
 const track=document.querySelector('.marquee-track');
 if(track&&track.children.length){
   const clones=Array.from(track.children).map(c=>c.cloneNode(true));
   clones.forEach(c=>track.appendChild(c));
 }
 const top=document.querySelector('.back-top');if(top)top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();
