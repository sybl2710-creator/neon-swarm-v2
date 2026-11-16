// NEON SWARM boots an original fixed-step arena survivor with seeded screenshot staging.
import { BEST_KEY, STEP } from './config.js';
import { createRandom } from './random.js';
import { createWorld, EVENT_SHOT, EVENT_HIT, EVENT_GEM, EVENT_LEVEL, EVENT_WAVE, EVENT_OVER, EVENT_WIN } from './world.js';
import { createInput, CONFIRM, PAUSE, MUTE, DASH, CONTINUE } from './input.js';
import { createRenderer } from './render.js';
import { createAudio } from './audio.js';
import { stageShot } from './shots.js';
const q=new URLSearchParams(location.search),seed=Number.parseInt(q.get('seed')||'',10),random=createRandom(Number.isInteger(seed)?seed:Math.random()*4294967296|0),canvas=document.getElementById('game'),status=document.getElementById('status');
const world=createWorld(random),renderer=createRenderer(canvas),audio=createAudio();
function bestRead(){try{return Number(localStorage.getItem(BEST_KEY))||0;}catch{return 0;}}
function bestWrite(n){try{localStorage.setItem(BEST_KEY,String(n));}catch{}}
function stage(){const out=stageShot(q.get('shot'),world);let paints=0;const paint=()=>{renderer.draw(world.state,out.screen,out.best);if(++paints<2)requestAnimationFrame(paint);else window.__shotReady=true;};requestAnimationFrame(paint);}
function game(){stageShot('start',world);world.state.phase='play';const input=createInput(canvas);let screen='title',best=bestRead(),acc=0,last=performance.now();function start(){world.reset();screen='play';audio.start();status.textContent='NEON SWARM. Defeat Hive Lord Prime at wave 10.';}
function over(){audio.stop();screen='over';if(world.state.score>best){best=world.state.score;bestWrite(best);}audio.play('over');status.textContent=`Ship lost. Score ${world.state.score}.`}
function win(){screen='win';audio.stop();if(world.state.score>best){best=world.state.score;bestWrite(best);}status.textContent='Swarm purged. Victory! Press C for endless.';}
function update(){const flags=input.take(),choice=input.takeChoice(),point=input.takePointer();if(flags&MUTE)audio.toggle();if(screen==='title'&&(flags&CONFIRM))start();else if((screen==='over'||screen==='win')&&(flags&CONFIRM))start();else if(screen==='win'&&(flags&CONTINUE)){world.state.phase='play';screen='play';audio.start();}else if(screen==='play'&&(flags&PAUSE))screen='paused';else if(screen==='paused'&&(flags&(PAUSE|CONFIRM)))screen='play';if(screen==='level'&&point){const ix=Math.floor((point.x-178)/320);if(point.y>=290&&point.y<=520&&ix>=0&&ix<3)world.chooseUpgrade(world.state.levelChoices[ix]);}
if(screen==='win'){world.step(STEP);return;}if(screen==='title'){world.step(STEP,{},false,world.state.phase==='level'?1:0,true);return;}if(screen==='play'||screen==='level'){const ev=world.step(STEP,input.direction(),!!(flags&DASH),choice);if(ev&EVENT_SHOT)audio.play('shot');if(ev&EVENT_HIT)audio.play('hit');if(ev&EVENT_GEM)audio.play('gem');if(ev&EVENT_LEVEL){screen='level';audio.play('level');}if(ev&EVENT_WAVE)audio.play('wave');if(ev&EVENT_OVER)over();if(ev&EVENT_WIN)win();if(world.state.phase==='play'&&screen==='level')screen='play';}}
function frame(now){requestAnimationFrame(frame);acc+=Math.min((now-last)/1000,.25);last=now;if(screen==='play'||screen==='title'||screen==='level'){while(acc>=STEP){update();acc-=STEP;}}else{update();acc=0;}renderer.draw(world.state,screen,best);}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&screen==='play')screen='paused';});status.textContent='NEON SWARM. Press Space to start.';requestAnimationFrame(frame);}
if(q.has('shot'))stage();else game();
