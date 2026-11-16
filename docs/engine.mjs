export const WIDTH = 960, HEIGHT = 540, DURATION = 45;
export function freshGame(best = 0) {
  return {phase: 'ready', score: 0, best, lives: 3, time: DURATION, x: WIDTH / 2,
    items: [], particles: [], spawn: 0, elapsed: 0, combo: 0, flash: 0, caught: 0};
}
export function startGame(best = 0) { return {...freshGame(best), phase: 'playing'}; }
export function togglePause(game) {
  if (game.phase === 'playing') game.phase = 'paused';
  else if (game.phase === 'paused') game.phase = 'playing';
}
export function tick(game, dt, direction = 0, random = Math.random) {
  if (game.phase !== 'playing') return;
  dt = Math.max(0, Math.min(dt, 0.05));
  game.elapsed += dt;
  game.time = Math.max(0, DURATION - game.elapsed);
  game.x = Math.max(34, Math.min(WIDTH - 34, game.x + direction * 580 * dt));
  game.flash = Math.max(0, game.flash - dt);
  game.spawn -= dt;
  if (game.spawn <= 0) {
    const type = random() < .28 ? 'bug' : 'commit';
    game.items.push({x: 40 + random() * (WIDTH - 80), y: -25,
      speed: 150 + game.elapsed * 3 + random() * 60, type, spin: random() * 6});
    game.spawn = Math.max(.26, .64 - game.elapsed * .007);
  }
  for (const item of game.items) {
    item.y += item.speed * dt;
    if (!item.dead && Math.abs(item.x - game.x) < 35 && Math.abs(item.y - (HEIGHT - 66)) < 27) {
      item.dead = true;
      if (item.type === 'bug') {
        game.lives = Math.max(0, game.lives - 1); game.combo = 0; game.flash = .22;
      } else {
        game.caught++; game.combo++;
        game.score += 10 * Math.min(4, 1 + Math.floor(game.combo / 5));
      }
      for (let p = 0; p < 10; p++) game.particles.push({x: item.x, y: item.y,
        vx: (random() - .5) * 220, vy: (random() - .5) * 220,
        life: .5, color: item.type === 'bug' ? '#ff808e' : '#9effbb'});
    } else if (item.y > HEIGHT + 25 && item.type === 'commit' && !item.dead) game.combo = 0;
    if (game.lives === 0) break;
  }
  game.items = game.items.filter(item => !item.dead && item.y < HEIGHT + 30);
  for (const p of game.particles) {p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;}
  game.particles = game.particles.filter(p => p.life > 0);
  game.best = Math.max(game.best, game.score);
  if (game.lives === 0 || game.time <= 0) game.phase = 'over';
}
