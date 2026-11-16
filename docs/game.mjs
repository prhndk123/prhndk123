import {WIDTH, HEIGHT, freshGame, startGame, togglePause, tick} from './engine.mjs';
const $ = id => document.getElementById(id);
const canvas = $('game'), ctx = canvas.getContext('2d');
let best = 0;
try {best = Math.max(0, Number(localStorage.getItem('prhndk-commit-catcher-best')) || 0);} catch {}
let game = freshGame(best), previous = 0, clock = 0, touchDirection = 0;
const keys = new Set();
const stars = Array.from({length:65}, (_,i) => ({x:(i*173+79)%WIDTH,y:(i*71+13)%360,r:i%4===0?2:1}));
const skyline = Array.from({length:24}, (_,i) => ({x:i*44,h:30+(i*37)%100}));
function readBest() {try {localStorage.setItem('prhndk-commit-catcher-best', String(game.best));} catch {}}
function reset() {game = startGame(game.best); keys.clear(); touchDirection=0; $('announcement').textContent=''; update(); canvas.focus({preventScroll:true});}
function pause() {togglePause(game);keys.clear();touchDirection=0;update();}
function update() {
  $('score').textContent = String(game.score).padStart(4,'0');
  $('best').textContent = String(game.best).padStart(4,'0');
  $('timer').innerHTML = Math.ceil(game.time) + '<span>s</span>';
  $('lives').textContent = '♥ '.repeat(game.lives) + '♡ '.repeat(3-game.lives);
  $('lives').setAttribute('aria-label',game.lives + ' lives remaining');
  $('pause').disabled = !['playing','paused'].includes(game.phase);
  $('pause').textContent = game.phase==='paused'?'▶':'Ⅱ';
  $('pause').setAttribute('aria-label',game.phase==='paused'?'Resume game':'Pause game');
  $('overlay').hidden = game.phase==='playing';
  $('combo').textContent = game.phase==='playing' && game.combo>=5 ? `${Math.min(4,1+Math.floor(game.combo/5))}× MULTIPLIER  /  ${game.combo} COMMIT STREAK` : '';
  if(game.phase==='paused') {
    $('overlay-label').textContent='TAKE YOUR TIME';
    $('overlay-title').innerHTML='Coffee break.';
    $('overlay-copy').textContent='Your run is waiting right here.';
    $('play').innerHTML='RESUME RUN <span aria-hidden="true">→</span>';
    $('overlay-hint').textContent='or press SPACE to resume';
  } else if(game.phase==='over') {
    $('overlay-label').textContent=game.score>0&&game.score>=game.best?'HIGH SCORE ENERGY':'RUN COMPLETE';
    $('overlay-title').textContent=game.lives===0?'Bug happens.':'Nice shipping.';
    $('overlay-copy').textContent=`${game.score} points · ${game.caught} commits caught. Ready for another run?`;
    $('play').innerHTML='PLAY AGAIN <span aria-hidden="true">↺</span>';
    $('overlay-hint').textContent='or press SPACE for another run';
    $('announcement').textContent=`Run complete. ${game.score} points. ${game.caught} commits caught.`;
  }
}
function pixelShip(x,y) {
  ctx.fillStyle='#132b2e';ctx.fillRect(x-27,y+8,54,15);
  ctx.fillStyle='#9effbb';ctx.fillRect(x-22,y,44,15);ctx.fillRect(x-14,y-10,28,12);ctx.fillRect(x-8,y-17,16,9);
  ctx.fillStyle='#c3afff';ctx.fillRect(x-32,y+11,12,10);ctx.fillRect(x+20,y+11,12,10);
  ctx.fillStyle='#203a40';ctx.fillRect(x-7,y-7,14,12);
  ctx.fillStyle='#f5c28a';ctx.fillRect(x-16,y+21,9,5+Math.sin(clock*15)*3);ctx.fillRect(x+7,y+21,9,5+Math.cos(clock*15)*3);
}
function pixelBug(x,y) {
  ctx.fillStyle='#ff899e';ctx.fillRect(x-12,y-9,24,20);ctx.fillRect(x-17,y-4,34,10);
  for(const side of [-1,1]){ctx.fillRect(x+side*17-2,y-12,5,5);ctx.fillRect(x+side*20-2,y+9,5,5);}
  ctx.fillStyle='#221b33';ctx.fillRect(x-8,y-2,5,5);ctx.fillRect(x+3,y-2,5,5);
}
function draw() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  const gradient=ctx.createLinearGradient(0,0,0,HEIGHT);gradient.addColorStop(0,'#101221');gradient.addColorStop(1,'#242039');ctx.fillStyle=gradient;ctx.fillRect(0,0,WIDTH,HEIGHT);
  for(const s of stars){ctx.fillStyle=`rgba(203,194,246,${.3+.4*(.5+.5*Math.sin(clock+s.x))})`;ctx.fillRect(s.x,(s.y+clock*3)%360,s.r,s.r);}
  ctx.fillStyle='#d5c3ee';ctx.fillRect(811,55,27,27);ctx.fillStyle='#101221';ctx.fillRect(820,49,25,25);
  ctx.strokeStyle='#a8b7d510';ctx.lineWidth=1;
  for(let x=-WIDTH;x<WIDTH*2;x+=80){ctx.beginPath();ctx.moveTo(WIDTH/2,370);ctx.lineTo(x,HEIGHT);ctx.stroke();}
  for(let y=388;y<HEIGHT;y+=28){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(WIDTH,y);ctx.stroke();}
  for(const [i,b] of skyline.entries()){
    ctx.fillStyle=i%2?'#222239':'#1d2034';ctx.fillRect(b.x,380-b.h,40,b.h);
    for(let wx=0;wx<3;wx++)for(let wy=0;wy<Math.floor(b.h/15);wy++){if((i+wx+wy)%3===0)continue;ctx.fillStyle=(i+wy)%4===0?'#c79c6950':'#7e729e35';ctx.fillRect(b.x+7+wx*10,389-b.h+wy*15,3,5);}
  }
  ctx.fillStyle='#a3ffbd22';ctx.fillRect(0,HEIGHT-29,WIDTH,1);
  if(game.phase==='ready') {
    for(let i=0;i<7;i++){const x=90+i*130,y=80+(i*71+clock*30)%270;ctx.fillStyle=i%3===0?'#ff899e44':'#a3ffbd44';ctx.fillRect(x,y,15,15);}
  }
  for(const item of game.items){
    if(item.type==='bug')pixelBug(item.x,item.y);
    else {ctx.shadowColor='#a3ffbd';ctx.shadowBlur=13;ctx.fillStyle='#a3ffbd';ctx.fillRect(item.x-10,item.y-10,20,20);ctx.shadowBlur=0;ctx.fillStyle='#45735c';ctx.fillRect(item.x-5,item.y-5,5,5);}
  }
  for(const p of game.particles){ctx.globalAlpha=Math.max(0,p.life*2);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,4,4);}ctx.globalAlpha=1;
  pixelShip(game.x,HEIGHT-66);
  if(game.flash>0){ctx.fillStyle=`rgba(255,112,138,${game.flash*.6})`;ctx.fillRect(0,0,WIDTH,HEIGHT);}
}
function frame(timestamp) {
  const dt=previous?Math.min((timestamp-previous)/1000,.05):0;previous=timestamp;
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches || game.phase==='playing')clock+=dt;
  const direction=touchDirection || ((keys.has('ArrowRight')||keys.has('d')?1:0)-(keys.has('ArrowLeft')||keys.has('a')?1:0));
  const oldPhase=game.phase;tick(game,dt,direction);
  if(oldPhase!==game.phase&&game.phase==='over')readBest();
  update();draw();requestAnimationFrame(frame);
}
$('play').addEventListener('click',()=>game.phase==='paused'?pause():reset());
$('pause').addEventListener('click',pause);
$('restart').addEventListener('click',reset);
document.addEventListener('keydown',event=>{
  const key=event.key.length===1?event.key.toLowerCase():event.key;
  if(!['ArrowLeft','ArrowRight','a','d',' '].includes(key)||event.metaKey||event.ctrlKey||event.altKey)return;
  if(event.target instanceof HTMLButtonElement && key===' ')return;
  event.preventDefault();
  if(key===' '&&!event.repeat){if(game.phase==='ready'||game.phase==='over')reset();else pause();}
  else keys.add(key);
});
document.addEventListener('keyup',event=>keys.delete(event.key.length===1?event.key.toLowerCase():event.key));
window.addEventListener('blur',()=>{keys.clear();touchDirection=0;if(game.phase==='playing')pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&game.phase==='playing')pause();});
function movePointer(event){if(game.phase!=='playing')return;const box=canvas.getBoundingClientRect();game.x=Math.max(34,Math.min(WIDTH-34,(event.clientX-box.left)/box.width*WIDTH));}
canvas.addEventListener('pointerdown',event=>{canvas.setPointerCapture(event.pointerId);movePointer(event);});
canvas.addEventListener('pointermove',event=>{if(event.buttons || event.pointerType==='touch')movePointer(event);});
for(const [id,dir] of [['left',-1],['right',1]]){
  const button=$(id);button.addEventListener('pointerdown',event=>{event.preventDefault();button.setPointerCapture(event.pointerId);touchDirection=dir;});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,()=>touchDirection=0);
}
update();requestAnimationFrame(frame);
