// apply.js - Practical 6 & 8: process raw text, validate, and save application (Prac 9 storage)
import { cleanText, extractContactInfo } from './utils.js';
import { saveApplication } from './storage.js';

const raw = document.getElementById('raw');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const result = document.getElementById('result');
const processBtn = document.getElementById('processBtn');
const clearBtn = document.getElementById('clearBtn');

// Prefill job title from URL if present
const urlParams = new URLSearchParams(window.location.search);
const jobTitleParam = urlParams.get('title');
if(jobTitleParam){
  const jt = document.getElementById('jobTitle');
  if(jt) jt.value = jobTitleParam;
}

// Process action
processBtn.addEventListener('click', ()=>{
  const rawText = raw.value.trim();
  if(!rawText && !nameField.value){
    alert('Please paste application text or enter your name.');
    return;
  }

  const cleaned = cleanText(rawText || '');
  const contact = extractContactInfo(cleaned + '\n' + (emailField.value || '') + '\n' + (phoneField.value || ''));
  const name = nameField.value || (contact.name || '');
  const email = emailField.value || contact.email || '';
  const phones = contact.phones || [];

  // Simple validation
  if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    alert('Please enter a valid email.');
    return;
  }

  const app = {
    name: name || 'Unknown',
    email: email || '',
    phones,
    cleaned,
    date: new Date().toISOString()
  };

  saveApplication(app);
  result.innerHTML = '<pre>' + JSON.stringify(app, null, 2) + '</pre>';
  alert('Application processed and saved.');
});

clearBtn.addEventListener('click', ()=>{
  raw.value = '';
  nameField.value = '';
  emailField.value = '';
  phoneField.value = '';
  result.innerHTML = '';
});
