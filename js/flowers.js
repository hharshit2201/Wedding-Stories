const CONFIG={laneWidthPct:25,showerSpeed:2.5,density:2,minSize:18,maxSize:44,spawnIntervalMs:700,minFallDuration:6,maxFallDuration:12,removeAfterMs:22000,speed:1,};

const laneEls=document.querySelectorAll('.lane');
function updateLanesHeight(){const h=document.documentElement.scrollHeight;laneEls.forEach(l=>{l.style.height=h+'px';l.style.width=CONFIG.laneWidthPct+'%'});}
updateLanesHeight();window.addEventListener('resize',updateLanesHeight);window.addEventListener('scroll',updateLanesHeight);

const lanes=laneEls;

const flowerSVG=`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 200 200'><defs><radialGradient id='petalGrad' cx='50%' cy='40%' r='65%'><stop offset='0%' stop-color='#ff8fa3'/><stop offset='100%' stop-color='#ff4d6d'/></radialGradient><radialGradient id='centerGrad' cx='50%' cy='50%' r='70%'><stop offset='0%' stop-color='#fff4a3'/><stop offset='100%' stop-color='#ffb703'/></radialGradient></defs><g transform='translate(100,100)'><path d='M0,-65 C30,-75 60,-35 45,-5 C35,20 5,35 0,20 C-5,35 -35,20 -45,-5 C-60,-35 -30,-75 0,-65 Z' fill='url(#petalGrad)'/><g transform='rotate(60)'><path d='M0,-65 C30,-75 60,-35 45,-5 C35,20 5,35 0,20 C-5,35 -35,20 -45,-5 C-60,-35 -30,-75 0,-65 Z' fill='url(#petalGrad)'/></g><g transform='rotate(120)'><path d='M0,-65 C30,-75 60,-35 45,-5 C35,20 5,35 0,20 C-5,35 -35,20 -45,-5 C-60,-35 -30,-75 0,-65 Z' fill='url(#petalGrad)'/></g><g transform='rotate(180)'><path d='M0,-65 C30,-75 60,-35 45,-5 C35,20 5,35 0,20 C-5,35 -35,20 -45,-5 C-60,-35 -30,-75 0,-65 Z' fill='url(#petalGrad)'/></g><g transform='rotate(240)'><path d='M0,-65 C30,-75 60,-35 45,-5 C35,20 5,35 0,20 C-5,35 -35,20 -45,-5 C-60,-35 -30,-75 0,-65 Z' fill='url(#petalGrad)'/></g><g transform='rotate(300)'><path d='M0,-65 C30,-75 60,-35 45,-5 C35,20 5,35 0,20 C-5,35 -35,20 -45,-5 C-60,-35 -30,-75 0,-65 Z' fill='url(#petalGrad)'/></g><circle cx='0' cy='0' r='26' fill='url(#centerGrad)'/></g></svg>`;

function rand(min,max){return Math.random()*(max-min)+min}

function spawnFlower(lane){
  const flower=document.createElement('div');
  flower.className='flower';
  flower.innerHTML=flowerSVG;
  const docH=document.documentElement.scrollHeight;
  const y=Math.round(Math.random()*(docH+400)-200);
  flower.style.top=y+'px';
  flower.style.left=Math.random()*85+'%';
  const size=Math.round(rand(CONFIG.minSize,CONFIG.maxSize));
  flower.style.width=size+'px';
  const rot=Math.round(rand(0,360));
  flower.style.transform=`rotate(${rot}deg)`;
  const duration=rand(CONFIG.minFallDuration,CONFIG.maxFallDuration).toFixed(2);
  flower.style.animationDuration=(parseFloat(duration)*CONFIG.showerSpeed)+'s';
  lane.appendChild(flower);
  const removeDelay=Math.max(CONFIG.removeAfterMs,(parseFloat(duration)*1000)+800);
  setTimeout(()=>{flower.classList.add('fade-out');setTimeout(()=>{if(flower.parentNode)flower.parentNode.removeChild(flower)},700)},removeDelay);
}

let spawnTimer=null;
function startSpawning(){if(spawnTimer)clearInterval(spawnTimer);spawnTimer=setInterval(()=>{lanes.forEach(lane=>spawnFlower(lane))},CONFIG.spawnIntervalMs*CONFIG.speed/CONFIG.density)}
function stopSpawning(){if(spawnTimer)clearInterval(spawnTimer);spawnTimer=null}

// mobile-safe tuning
if (/Mobi|Android/i.test(navigator.userAgent)) {
  CONFIG.density = Math.max(1, CONFIG.density * 0.5);
  CONFIG.showerSpeed = CONFIG.showerSpeed * 1.2;
}
// pause spawning when tab inactive for performance
let hidden = false;
document.addEventListener('visibilitychange',()=>{
  if (document.hidden){stopSpawning();hidden=true;} else if(hidden){startSpawning();hidden=false;}
});
startSpawning();