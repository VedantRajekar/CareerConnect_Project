// main.js - small starter for theme (Prac 9) and common helpers
import { loadApplications } from './storage.js';

// load apps (for example use)
const apps = loadApplications();
console.log('Loaded applications:', apps);

// keyboard shortcut for quick demo: press 's' to toggle theme (dev convenience)
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 's') {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cc_theme', next);
    alert('Theme toggled to ' + next);
  }
});
