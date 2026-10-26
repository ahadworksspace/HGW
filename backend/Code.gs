// Health Green World — Google Apps Script backend (owner: ahadworksspace@gmail.com)
// Deploy as Web App, Execute as: Me, Access: Anyone (see docs/GOOGLE-SETUP.md).
// Spreadsheet names are read from Script Properties (do NOT hard-code sheet IDs in the site).
// Properties to set: ORDERS_SHEET_NAME = "HGW Orders", CAREERS_SHEET_NAME = "HGW Careers",
// NOTIFY_EMAIL = "ahadworksspace@gmail.com"
const ORDER_FIELDS = ['Timestamp','Full name','Phone/WhatsApp','Email','Product name','Quantity','Delivery city','Delivery address','Message','Source'];
const CAREER_FIELDS = ['Timestamp','Full name','Phone','Email','Position/Department','Education','Experience','Skills','City','Message','Source'];
function sheetByName_(name){ const ss = SpreadsheetApp.getActiveSpreadsheet(); let sh = ss.getSheetByName(name); if(!sh){ sh = ss.insertSheet(name); sh.appendRow(name.indexOf('Orders')>-1?ORDER_FIELDS:CAREER_FIELDS); } return sh; }
function valid_(v, max){ return typeof v==='string' && v.trim().length>0 && v.length<=max; }
function rateLimit_(key){
  const c = CacheService.getScriptCache(); const k='rl_'+key;
  const n = parseInt(c.get(k)||'0',10); if(n>=10) return false; c.put(k,String(n+1),3600); return true;
}
function doGet(){ return ContentService.createTextOutput(JSON.stringify({ok:true,service:'HGW submissions'})).setMimeType(ContentService.MimeType.JSON); }
function doPost(e){
  try{
    const d = JSON.parse(e.postData.contents);
    if(d.website) return json_({ok:false,error:'Spam blocked'});
    const ip = (e.parameter && e.parameter.ip) || 'unknown';
    if(!rateLimit_(ip)) return json_({ok:false,error:'Too many submissions. Please try later.'});
    const props = PropertiesService.getScriptProperties();
    const notify = props.getProperty('NOTIFY_EMAIL') || 'ahadworksspace@gmail.com';
    if(d.type==='order'){
      if(!valid_(d.full_name,100)||!valid_(d.phone,30)||!valid_(d.product_name,150)) return json_({ok:false,error:'Missing required order fields'});
      const q = parseInt(d.quantity||'1',10); if(isNaN(q)||q<1||q>100) return json_({ok:false,error:'Invalid quantity'});
      sheetByName_(props.getProperty('ORDERS_SHEET_NAME')||'HGW Orders').appendRow([new Date(),d.full_name,d.phone,d.email||'',d.product_name,q,d.delivery_city||'',d.delivery_address||'',d.message||'','Website']);
      MailApp.sendEmail(notify,'New HGW order request: '+d.product_name,'Name: '+d.full_name+'\nPhone: '+d.phone+'\nProduct: '+d.product_name+' x'+q+'\nCity: '+(d.delivery_city||'')+'\nMessage: '+(d.message||''));
      return json_({ok:true});
    }
    if(d.type==='career'){
      if(!valid_(d.full_name,100)||!valid_(d.phone,30)||!valid_(d.email,150)||!valid_(d.position,100)||!valid_(d.education,300)||!valid_(d.city,100)) return json_({ok:false,error:'Missing required application fields'});
      sheetByName_(props.getProperty('CAREERS_SHEET_NAME')||'HGW Careers').appendRow([new Date(),d.full_name,d.phone,d.email,d.position,d.education,d.experience||'',d.skills||'',d.city,d.message||'','Website']);
      MailApp.sendEmail(notify,'New HGW career application: '+d.position,'Name: '+d.full_name+'\nPhone: '+d.phone+'\nEmail: '+d.email+'\nPosition: '+d.position+'\nCity: '+d.city);
      return json_({ok:true});
    }
    return json_({ok:false,error:'Unknown submission type'});
  }catch(err){ return json_({ok:false,error:'Server error. Please use the Google Form fallback.'}); }
}
function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
