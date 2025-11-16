// utils.js - Practical 4 & 6: helper utilities for text processing
export function cleanText(raw){
  if(!raw) return '';
  // remove extra whitespace and weird symbols, remove hashtags
  return raw.replace(/#\w+/g, '').replace(/[\u2000-\u206F\u2E00-\u2E7F\uFEFF]/g,'').replace(/\s{2,}/g,' ').trim();
}

export function extractContactInfo(text){
  const emailMatch = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  const phoneMatch = text.match(/(?:\+?\d{1,3}[ -]?)?(?:\d{10}|\d{3}[ -]\d{3}[ -]\d{4}|\d{5}[ -]\d{5})/g) || [];
  return { email: emailMatch ? emailMatch[0] : null, phones: phoneMatch };
}

// small additional utilities
export function isPalindrome(s){ const c = (s||'').toLowerCase().replace(/[^a-z0-9]/g,''); return c === c.split('').reverse().join(''); }
export function isPrime(n){ n = Number(n); if(n<2 || !Number.isInteger(n)) return false; for(let i=2;i<=Math.floor(Math.sqrt(n)); i++) if(n % i === 0) return false; return true; }
