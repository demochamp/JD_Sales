// small interactions: hover lift + smooth scroll for anchor
document.addEventListener('DOMContentLoaded', () => {
  // card hover lift effect via class toggle for keyboard accessibility
  document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('mouseenter', ()=> c.style.transform = 'translateY(-8px)');
    c.addEventListener('mouseleave', ()=> c.style.transform = '');
    c.addEventListener('focusin', ()=> c.style.transform = 'translateY(-8px)');
    c.addEventListener('focusout', ()=> c.style.transform = '');
  });

  // smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // simple fade-in for hero elements
  const hero = document.querySelector('.hero-inner');
  if(hero){
    hero.style.opacity = 0;
    setTimeout(()=> hero.style.transition = 'opacity 550ms ease-in-out', 50);
    setTimeout(()=> hero.style.opacity = 1, 100);
  }
});

// mobile panel toggle
(function(){
  const toggle = document.getElementById('mobileToggle');
  const panel = document.getElementById('mobilePanel');
  const closeBtn = document.getElementById('mobileClose');
  const backdrop = panel?.querySelector('.mobile-panel-backdrop');

  function openPanel(){
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden'; // lock background scroll
    if(toggle) toggle.setAttribute('aria-expanded','true');
    // focus the close button for easier keyboard navigation
    setTimeout(()=> closeBtn?.focus(), 220);
  }
  function closePanel(){
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(toggle) toggle.setAttribute('aria-expanded','false');
    if(toggle) toggle.focus();
  }

  if(toggle) toggle.addEventListener('click', (e)=>{
    if(panel.classList.contains('open')) closePanel(); else openPanel();
  });
  if(closeBtn) closeBtn.addEventListener('click', closePanel);
  if(backdrop) backdrop.addEventListener('click', closePanel);

  // close with Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });
})();
