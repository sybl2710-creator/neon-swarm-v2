# NEON SWARM — a top-down arena survivor

[![make.fun · best-game-01](https://make.fun/badge/best-game-01.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![rank](https://make.fun/badge/best-game-01/sybl2710-creator/neon-swarm/rank.svg)](https://make.fun/bounty/best-game-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![reward](https://make.fun/badge/best-game-01/sybl2710-creator/neon-swarm/reward.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)

NEON SWARM is an original top-down arena survivor. One ship, endless swarm:
dodge the drifters, darters and brutes, let the auto-fire seek the nearest
enemy, collect XP gems, pick an upgrade on every level-up, and hold the arena
through wave after wave. Elites appear from wave 5; a boss — the Hive Lord —
arrives every 5th wave. Survive as long as you can; the swarm does not stop.

## Play

Open `game/index.html` in a browser (or `node serve.ts --port 8080` and visit
http://localhost:8080).

- **Move:** WASD or arrow keys
- **Dash:** Space or Shift (2.5 s cooldown, brief invulnerability)
- **Pause:** P or Esc
- **Mute:** M
- **Level up:** press 1 / 2 / 3 or click a card

Auto-fire is always on. XP gems level you up; each level offers a choice of
three upgrades (damage, fire rate, projectiles, speed, hull, dash, magnet,
orbiting blade). Hull at zero ends the run — best score is saved locally.

## Tech

Plain JavaScript, no dependencies, no build step. The game code lives in
`game/src/` (world, render, input, config, audio, shots) and is loaded as ES
modules from `game/index.html`. A deterministic seed (`?seed=1`) plus the
`?shot=start|play|levelup|end` staging mode reproduce the four screenshots in
`screenshots/` exactly. Audio is synthesized with WebAudio — no audio files.

## License

MIT. See `LICENSE`.
