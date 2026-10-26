function setupForm(formId, type){
 const f=document.getElementById(formId); if(!f) return;
 const msg=document.getElementById(formId+'-msg'), btn=f.querySelector('button[type=submit]');
 const cfg=window.HGW_CONFIG||{};
 const fallback = type==='order'?cfg.orderFormUrl:cfg.careerFormUrl;
 const fb=document.getElementById(formId+'-fallback');
 if(!cfg.appsScriptUrl && fb){ fb.innerHTML = fallback?`<p class="notice">Direct submission is not configured yet. Please use the secure Google Form: <a href="${fallback}" target="_blank" rel="noopener">Open ${type==='order'?'Order / Inquiry':'Career'} Form</a></p>`:`<p class="warn">Direct submission is not configured yet. The owner must complete docs/GOOGLE-SETUP.md and add the Apps Script URL to assets/js/config.js. No submission has been saved.</p>`; }
 f.addEventListener('submit', async e=>{
  e.preventDefault();
  if(f.querySelector('[name=website]')?.value){ msg.textContent='Submission blocked.'; return; } // honeypot
  if(!f.checkValidity()){ f.reportValidity(); return; }
  if(!f.consent?.checked){ msg.textContent='Please tick the privacy consent box.'; return; }
  if(btn.disabled) return; btn.disabled=true; btn.textContent='Sending…';
  const data=Object.fromEntries(new FormData(f).entries()); data.type=type; delete data.consent; delete data.website;
  if(!cfg.appsScriptUrl){ msg.textContent='Direct submission is not configured yet — please use the Google Form fallback above. Nothing has been saved.'; btn.disabled=false; btn.textContent='Submit'; return; }
  try{
   const r=await fetch(cfg.appsScriptUrl,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)});
   const j=await r.json();
   if(j.ok){ msg.className='ok'; msg.textContent='Thank you. Your '+ (type==='order'?'order request / inquiry':'application') +' was received. This is a request only — it is not a confirmed order or job offer until the business verifies it.'; f.reset(); }
   else { msg.className='warn'; msg.textContent='Could not save: '+(j.error||'unknown error')+'. Please use the Google Form fallback.'; btn.disabled=false; }
  }catch(err){ msg.className='warn'; msg.textContent='Could not reach the submission service. Please use the Google Form fallback. Nothing was confirmed as saved.'; btn.disabled=false; }
  btn.textContent='Submit';
 });
}
document.addEventListener('DOMContentLoaded',()=>{setupForm('order-form','order'); setupForm('career-form','career');});
