export const CONFIRM = 1, PAUSE = 2, MUTE = 4, DASH = 8, CONTINUE = 16;
const moves = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD']);
export function createInput(canvas) {
  const held = new Set();
  let actions = 0, pointer = null, choice = 0;
  window.addEventListener('keydown', e => {
    if (moves.has(e.code) || ['Space','ShiftLeft','ShiftRight','Escape','KeyP','KeyM','KeyC','Digit1','Digit2','Digit3'].includes(e.code)) e.preventDefault(); else return;
    held.add(e.code);
    if (e.repeat) return;
    if (e.code === 'Space') actions |= CONFIRM | DASH;
    if (e.code.startsWith('Shift')) actions |= DASH;
    if (e.code === 'Escape' || e.code === 'KeyP') actions |= PAUSE;
    if (e.code === 'KeyC') actions |= CONTINUE;
    if (e.code === 'KeyM') actions |= MUTE;
    if (e.code.startsWith('Digit')) choice = Number(e.code.slice(-1));
  });
  window.addEventListener('keyup', e => held.delete(e.code));
  window.addEventListener('blur', () => held.clear());
  canvas.addEventListener('pointerdown', e => {
    const r = canvas.getBoundingClientRect();
    const scale=Math.min(r.width/1280,r.height/720);
    pointer = { x: (e.clientX-r.left-(r.width-1280*scale)/2)/scale, y: (e.clientY-r.top-(r.height-720*scale)/2)/scale };
    actions |= CONFIRM;
  });
  return {
    direction() { return { x: Number(held.has('ArrowRight')||held.has('KeyD'))-Number(held.has('ArrowLeft')||held.has('KeyA')), y: Number(held.has('ArrowDown')||held.has('KeyS'))-Number(held.has('ArrowUp')||held.has('KeyW')) }; },
    take() { const v = actions; actions = 0; return v; },
    takeChoice() { const v = choice; choice = 0; return v; },
    takePointer() { const v = pointer; pointer = null; return v; },
  };
}
