// scheduler.js - Practical 11: basic countdown example (exported as module)
let id = null;
export function startCountdown(seconds, onTick, onEnd){
  let remaining = seconds;
  onTick(remaining);
  id = setInterval(()=>{
    remaining -= 1;
    onTick(remaining);
    if(remaining <= 0){
      clearInterval(id);
      onEnd && onEnd();
    }
  }, 1000);
}
export function stopCountdown(){ clearInterval(id); }
