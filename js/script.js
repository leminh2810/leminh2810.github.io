document.addEventListener('DOMContentLoaded',()=>{
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click',()=>{
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  });

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Simple project detail modal
  document.querySelectorAll('.card .btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.getAttribute('data-project')||'?';
      const modal = document.createElement('div');
      modal.style.position='fixed';modal.style.inset=0;modal.style.display='grid';modal.style.placeItems='center';
      modal.style.background='rgba(2,6,23,0.7)';modal.style.zIndex=9999;padding='2rem';
      modal.innerHTML = `<div style="max-width:720px;background:#071226;border-radius:12px;padding:1.2rem;color:#e6eef8">`+
        `<h3>Project ${id}</h3><p>This is a short summary of project ${id}. Replace this with real details, links, and images.</p>`+
        `<div style="margin-top:1rem;text-align:right"><button id='closeModal' style='padding:.5rem .8rem;border-radius:8px;background:#7c3aed;color:white;border:0'>Close</button></div></div>`;
      document.body.appendChild(modal);
      document.getElementById('closeModal').addEventListener('click',()=>modal.remove());
    });
  });
});
