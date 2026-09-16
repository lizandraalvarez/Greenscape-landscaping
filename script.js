const servicesData=[
{id:1,title:'Lawn Mowing',rate:.12,category:'lawn',text:'Routine mowing and edging for a neat, healthy lawn.'},
{id:2,title:'Garden Design',rate:.18,category:'garden',text:'Plant selection and garden layouts designed for your space.'},
{id:3,title:'Tree Maintenance',rate:.15,category:'tree',text:'Seasonal trimming and basic tree-care planning.'}
];
function renderServiceCards(category='all'){
 const box=document.getElementById('serviceCards'); if(!box)return;
 box.innerHTML=servicesData.filter(s=>category==='all'||s.category===category).map(s=>`<article class="card service-card"><h3>${s.title}</h3><p>${s.text}</p></article>`).join('');
}
function calculateEstimate(){
 const service=document.getElementById('service'), sqft=document.getElementById('sqft'), total=document.getElementById('total'); if(!service||!sqft||!total)return;
 const rates={lawn:.12,garden:.18,tree:.15}; let amount=Math.max(parseFloat(sqft.value)||0,0)*rates[service.value];
 if(document.getElementById('organic').checked)amount+=35;if(document.getElementById('sprinkler').checked)amount+=45;
 total.textContent=`$${amount.toFixed(2)}`;
}
function saveUserPreferences(){
 const data={service:document.getElementById('service').value,sqft:parseInt(document.getElementById('sqft').value)||1000,organic:document.getElementById('organic').checked,sprinkler:document.getElementById('sprinkler').checked};
 localStorage.setItem('greenscape_quote_pref',JSON.stringify(data));document.getElementById('saveMessage').textContent='Preference saved for your next visit.';
}
function loadUserPreferences(){
 const raw=localStorage.getItem('greenscape_quote_pref');if(!raw)return;try{const d=JSON.parse(raw);
 if(document.getElementById('service'))document.getElementById('service').value=d.service||'lawn';
 if(document.getElementById('sqft'))document.getElementById('sqft').value=parseInt(d.sqft)||1000;
 if(document.getElementById('organic'))document.getElementById('organic').checked=!!d.organic;
 if(document.getElementById('sprinkler'))document.getElementById('sprinkler').checked=!!d.sprinkler;
 calculateEstimate();}catch(e){}}
document.addEventListener('DOMContentLoaded',()=>{renderServiceCards();loadUserPreferences();
 document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderServiceCards(b.dataset.category)}));
 ['service','sqft','organic','sprinkler'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('input',calculateEstimate)});
 const save=document.getElementById('savePreference');if(save)save.addEventListener('click',saveUserPreferences);
});