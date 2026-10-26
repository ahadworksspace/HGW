document.addEventListener('DOMContentLoaded',()=>{
 const b=document.querySelector('.burger'), n=document.querySelector('#mainnav');
 if(b&&n) b.onclick=()=>n.classList.toggle('open');
 const c=window.HGW_CONFIG||{};
 document.querySelectorAll('[data-hgw="phone"]').forEach(e=>{e.textContent=c.phoneDisplay||''; e.href='tel:'+(c.phoneLink||'')});
 document.querySelectorAll('[data-hgw="email"]').forEach(e=>{e.textContent=c.businessEmail||''; e.href='mailto:'+(c.businessEmail||'')});
 document.querySelectorAll('[data-hgw="address"]').forEach(e=>{e.textContent=c.address||''});
 document.querySelectorAll('[data-hgw="whatsapp"]').forEach(e=>{e.href=c.whatsappLink||'#'});
 // Reveal animations (subtle, no layout shift)
 const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in')}),{threshold:.1});
 document.querySelectorAll('.card').forEach(el=>io.observe(el));
});
function orderProduct(name){ try{localStorage.setItem('hgw_product',name)}catch(e){} window.location.href='products.html?product='+encodeURIComponent(name)+'#order-form'; }
