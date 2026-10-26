async function loadProducts(){
 const r=await fetch('data/products.json'); const all=await r.json();
 const grid=document.getElementById('grid'), search=document.getElementById('search'), catEl=document.getElementById('cat');
 const cats=['All',...new Set(all.map(p=>p.category))];
 if(catEl) cats.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;catEl.appendChild(o)});
 function render(){
  const q=(search?.value||'').toLowerCase(), cat=catEl?.value||'All';
  const list=all.filter(p=>(cat==='All'||p.category===cat)&&(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));
  grid.innerHTML=list.length?list.map(p=>`<article class="card">${p.image?`<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">`:`<div style="height:190px;background:#eaf6ee;display:flex;align-items:center;justify-content:center;font-size:48px">🌿</div>`}<div class="pad"><span class="tag">${p.category}</span><h3>${p.name}</h3><p class="price">Rs ${p.price_pkr.toLocaleString('en-PK')} PKR</p><p style="font-size:14px">${p.description||''}</p>${p.price_note?`<p class="warn" style="font-size:13px">${p.price_note}</p>`:''}<p style="font-size:13px;color:#5b6b60">Price as listed on ${p.source}, checked ${p.price_checked}. Final price is confirmed by the branch.</p><button class="btn" onclick="orderProduct('${p.name.replace(/'/g,"\'")}')">Order / Enquire</button></div></article>`).join(''):'<p>No products match your search.</p>';
  document.getElementById('count').textContent=list.length+' of '+all.length+' products';
 }
 search?.addEventListener('input',render); catEl?.addEventListener('change',render);
 const pre=new URLSearchParams(location.search).get('product'); if(pre&&search){search.value=pre}
 render();
}
loadProducts();
