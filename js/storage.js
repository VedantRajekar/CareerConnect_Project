// storage.js - Practical 9: localStorage helpers
const APP_KEY = 'cc_applications';
const THEME_KEY = 'cc_theme';

export function saveApplication(app){
  const arr = JSON.parse(localStorage.getItem(APP_KEY) || '[]');
  arr.push(app);
  localStorage.setItem(APP_KEY, JSON.stringify(arr));
}

export function loadApplications(){
  return JSON.parse(localStorage.getItem(APP_KEY) || '[]');
}

export function clearApplications(){
  localStorage.removeItem(APP_KEY);
}

export function saveTheme(name){
  localStorage.setItem(THEME_KEY, name);
}

export function loadTheme(){
  return localStorage.getItem(THEME_KEY) || 'light';
}
