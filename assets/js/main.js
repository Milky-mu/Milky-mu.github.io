// 站点配置：把这些日期改成你们的
const CONFIG = {
  startDate: '2022-09-10', // 在一起的日期（用于相识天数）
  anniversaryBase: '09-10', // 每年的纪念日（月-日）
  secretCode: '1096'        // 彩蛋暗号
};

function daysBetween(dateStr, baseStr){
  const d1 = new Date(dateStr + 'T00:00:00');
  const d2 = new Date(baseStr + 'T00:00:00');
  const diff = Math.floor((d2 - d1) / (1000*60*60*24));
  return diff;
}

// 更新相识天数
function updateDaysSince(){
  const today = new Date();
  const todayStr = today.toISOString().slice(0,10);
  const days = daysBetween(CONFIG.startDate, todayStr) + 1; // 把第一天算进去
  document.getElementById('days-since').textContent = days;
  document.getElementById('start-date-label').textContent = CONFIG.startDate;
  document.getElementById('year').textContent = String(today.getFullYear());
}

// 计算下一个纪念日日期
function nextAnniversary(){
  const today = new Date();
  const year = today.getFullYear();
  const targetThisYear = new Date(`${year}-${CONFIG.anniversaryBase}T00:00:00`);
  return (targetThisYear >= today) ? targetThisYear : new Date(`${year+1}-${CONFIG.anniversaryBase}T00:00:00`);
}

// 倒计时
let countdownTimer;
function startCountdown(){
  const target = nextAnniversary();
  document.getElementById('target-date-txt').textContent = target.toISOString().slice(0,10);
  function tick(){
    const now = new Date();
    const total = Math.max(0, Math.floor((target - now)/1000));
    const days = Math.floor(total / (24*3600));
    const hours = Math.floor((total % (24*3600))/3600);
    const mins = Math.floor((total % 3600)/60);
    const secs = total % 60;
    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = hours;
    document.getElementById('cd-mins').textContent = mins;
    document.getElementById('cd-secs').textContent = secs;
  }
  tick();
  clearInterval(countdownTimer);
  countdownTimer = setInterval(tick, 1000);
}

// 简单彩蛋（仅前端可见）
function setupSecret(){
  const btn = document.getElementById('secret-btn');
  btn.addEventListener('click', ()=>{
    const val = document.getElementById('secret-input').value.trim();
    const box = document.getElementById('secret-content');
    if(val === CONFIG.secretCode){
      box.hidden = false;
      btn.textContent = '已解锁';
      btn.disabled = true;
    }else{
      alert('暗号不对，再试试 ;)');
    }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  updateDaysSince();
  startCountdown();
  setupSecret();
});
