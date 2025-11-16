// jobs.js - Practical 10: load jobs.json and render cards; simple search & filter
const jobList = document.getElementById('job-list');
const search = document.getElementById('search');
const filter = document.getElementById('filter');
let jobs = [];

async function loadJobs(){
  try{
    const res = await fetch('data/jobs.json');
    jobs = await res.json();
    populateLocations();
    renderJobs(jobs);
  }catch(err){
    console.error('Could not load jobs.json', err);
    jobList.innerHTML = '<p class="muted">Failed to load job listings.</p>';
  }
}

function populateLocations(){
  const locations = Array.from(new Set(jobs.map(j => j.location))).sort();
  locations.forEach(loc => {
    const opt = document.createElement('option');
    opt.value = loc;
    opt.textContent = loc;
    filter.appendChild(opt);
  });
}

function renderJobs(list){
  jobList.innerHTML = '';
  if(!list.length){
    jobList.innerHTML = '<p class="muted">No jobs found.</p>';
    return;
  }
  list.forEach(j => {
    const div = document.createElement('div');
    div.className = 'job-card';
    div.innerHTML = `
      <h4>${j.title}</h4>
      <div class="job-meta">${j.company} • ${j.location} • ${j.salary || ''}</div>
      <p>${j.description || ''}</p>
      <div style="margin-top:10px"><button class="btn btn-primary apply" data-id="${j.id}">Apply</button></div>
    `;
    jobList.appendChild(div);
  });
}

search.addEventListener('input', ()=>{
  const q = search.value.toLowerCase().trim();
  const filtered = jobs.filter(j => (j.title + ' ' + j.company + ' ' + j.location).toLowerCase().includes(q));
  renderJobs(filtered);
});

filter.addEventListener('change', ()=>{
  const loc = filter.value;
  const filtered = loc ? jobs.filter(j => j.location === loc) : jobs.slice();
  renderJobs(filtered);
});

// delegate apply click -> open apply page and prefill jobTitle via URL param
jobList.addEventListener('click', (e)=>{
  if(e.target.matches('.apply')){
    const id = e.target.dataset.id;
    const job = jobs.find(x => String(x.id) === String(id));
    const params = new URLSearchParams();
    if(job) params.set('title', job.title);
    window.location.href = 'apply.html?' + params.toString();
  }
});

loadJobs();
