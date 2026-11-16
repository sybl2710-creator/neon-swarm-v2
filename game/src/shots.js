import { BEST_KEY, STEP } from './config.js';
export function stageShot(name,world){world.reset();const s=world.state;let saved=0;try{saved=Number(localStorage.getItem(BEST_KEY))||0;}catch{}if(name==='start'){s.phase='play';for(let i=0;i<16/STEP;i++){s.spawnClock+=STEP*1.25;world.step(STEP,{},false,s.phase==='level'?1:0,true);}s.phase='title';return {screen:'title',best:saved};}
  const target=name==='play'?52:name==='levelup'?35:180;for(let i=0;i<target/STEP+1800;i++){if(name==='play'&&s.time>=target)break;const weak=name==='end',move=weak?{x:Math.sin(i*.019),y:Math.cos(i*.013)}:{};if(name!=='end'&&s.phase==='play')s.spawnClock+=STEP*1.25;world.step(STEP,move,false,name==='levelup'?0:(s.phase==='level'?1:0),!weak);if(name==='levelup'&&s.phase==='level')break;if(name==='end'&&s.phase==='over')break;}
  if(name==='levelup'&&s.phase!=='level'){while(s.phase!=='level'&&s.phase!=='over')world.step(STEP,{},false,0,true);}
  if(name==='play'&&s.phase==='level')world.chooseUpgrade(s.levelChoices[0]);
  if(name==='end'&&s.phase!=='over'){for(let i=0;i<18000&&s.phase!=='over';i++)world.step(STEP,{x:Math.sin(i*.019),y:Math.cos(i*.013)},false,s.phase==='level'?1:0,false);}
  const screen=name==='levelup'&&s.phase==='level'?'level':s.phase==='over'?'over':'play';return {screen,best:Math.max(saved,s.score)};}
