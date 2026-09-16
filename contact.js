function setError(input,id,msg){document.getElementById(id).textContent=msg;input.classList.toggle('input-error',!!msg)}
function loadSaved(){const raw=localStorage.getItem('greenscape_quote_pref');if(!raw)return;try{const d=JSON.parse(raw);document.getElementById('contact-service').value=d.service||'lawn';document.getElementById('welcome').hidden=false}catch(e){}}
function handleFormValidation(e){e.preventDefault();let ok=true;const name=document.getElementById('name'),email=document.getElementById('client-email'),message=document.getElementById('message');const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(!name.value.trim()){setError(name,'name-error','Please enter your name.');ok=false}else setError(name,'name-error','');
 if(!emailRegex.test(email.value.trim())){setError(email,'email-error','Please enter a valid email address (e.g., name@domain.com).');ok=false}else setError(email,'email-error','');
 if(message.value.trim().length<10){setError(message,'message-error','Please enter at least 10 characters.');ok=false}else setError(message,'message-error','');
 document.getElementById('formStatus').textContent=ok?'Form validated successfully. This demo does not send data to a server.':'';return ok}
document.addEventListener('DOMContentLoaded',()=>{loadSaved();document.getElementById('contactForm').addEventListener('submit',handleFormValidation)});