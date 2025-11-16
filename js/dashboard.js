// dashboard.js - Practical 9: display saved applications and theme toggling
import { loadApplications, clearApplications } from './storage.js';

const appsContainer = document.getElementById('applications');
const clearBtn = document.getElementById('clearAll');
const toggleTheme = document.getElementById('toggleTheme');

function render(){
  const list = loadApplications();
  appsContainer.innerHTML = '';
  if(!list.length){
    appsContainer.innerHTML = '<div class="app-item">No saved applications yet.</div>';
    return;
  }
  list.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'app-item';
    div.innerHTML = `<strong>${a.name}</strong> <div class="muted">${a.email || ''} • ${new Date(a.date).toLocaleString()}</div><pre style="margin-top:8px">${a.cleaned}</pre>`;
    appsContainer.appendChild(div);
  });
}

clearBtn.addEventListener('click', ()=>{
  if(confirm('Clear all saved applications?')){
    clearApplications();
    render();
  }
});

toggleTheme.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('cc_theme', next);
  alert('Theme: ' + next);
});

render();
