// Smooth scrolling, nav active highlighting, hamburger menu, back-to-top
document.addEventListener('DOMContentLoaded',()=>{
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.getElementById('backToTop');

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(!href || href === '#') return; // placeholder links
      if(href.startsWith('#') && href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth'});
        if(window.innerWidth<900 && navLinks) navLinks.style.display='none';
      }
    })
  })

  // Toggle nav (mobile)
  if(navToggle){
    navToggle.addEventListener('click',()=>{
      if(!navLinks) return;
      const isOpen = navLinks.style.display==='flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    })
  }

  // Active link on scroll
  const observer = new IntersectionObserver((entries)=>{
    // process entries and mark the most-visible section
    let activeId = null;
    entries.forEach(entry=>{ if(entry.isIntersecting) activeId = entry.target.id; });
    if(activeId){
      links.forEach(l=>{ l.classList.remove('active'); l.removeAttribute('aria-current'); });
      const link = document.querySelector('.nav-links a[href="#'+activeId+'"]');
      if(link){ link.classList.add('active'); link.setAttribute('aria-current','page'); }
    }
  },{root:null,threshold:0.45});
  sections.forEach(s=>observer.observe(s));

  // Back to top
  window.addEventListener('scroll',()=>{
    if(backToTop) backToTop.style.display = window.scrollY>300 ? 'block' : 'none';
  })
  if(backToTop) backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Contact form basic UI (no backend)
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      // basic client-side validation
      const nameEl = form.querySelector('#name');
      const emailEl = form.querySelector('#email');
      const subjectEl = form.querySelector('#subject');
      const messageEl = form.querySelector('#message');
      [nameEl,emailEl,subjectEl,messageEl].forEach(el=>el.removeAttribute('aria-invalid'));
      if(!nameEl.value.trim() || !emailEl.value.trim() || !subjectEl.value.trim() || !messageEl.value.trim()){
        formStatus.textContent = 'Please complete all required fields.';
        [nameEl,emailEl,subjectEl,messageEl].forEach(el=>{ if(!el.value.trim()) el.setAttribute('aria-invalid','true') });
        return;
      }
      formStatus.textContent = 'Sending...';
      const data = new FormData(form);
      const body = {name:data.get('name'), email:data.get('email'), subject:data.get('subject'), message:data.get('message')};
      try{
        const res = await fetch(form.action, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
        const json = await res.json();
        if(res.ok){ formStatus.textContent = 'Message sent — thank you.'; form.reset(); }
        else { formStatus.textContent = json.error || 'Failed to send message.' }
      }catch(err){ console.error(err); formStatus.textContent = 'Network error — try again later.' }
      setTimeout(()=>{ if(formStatus) formStatus.textContent=''; },4000);
    })
  }

  // Lazy-load project images
  const lazyImgs = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const img = entry.target; img.src = img.dataset.src; img.removeAttribute('data-src'); obs.unobserve(img);
      }
    })
  },{root:null,threshold:0.1});
  lazyImgs.forEach(i=>imgObserver.observe(i));
});