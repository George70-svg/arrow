import type { EnemyType } from '@entities/config/enemyConfig.ts'

export type Level = {
  minScore: number
  spawnTime: [number, number]
  enemies: { type: EnemyType; percent: number }[]
}

export const levelConfig: Level[] = [
  {
    minScore: 5,
    spawnTime: [3000, 5000],
    enemies: [{ type: 'zombie', percent: 100 }],
  },
  {
    minScore: 10,
    spawnTime: [3000, 5000],
    enemies: [
      { type: 'zombie', percent: 70 },
      { type: 'orc', percent: 30 },
    ],
  },
  {
    minScore: 20,
    spawnTime: [3000, 5000],
    enemies: [
      { type: 'zombie', percent: 50 },
      { type: 'orc', percent: 50 },
    ],
  },
  {
    minScore: 30,
    spawnTime: [3000, 5000],
    enemies: [
      { type: 'zombie', percent: 40 },
      { type: 'orc', percent: 40 },
      { type: 'goblin', percent: 20 },
    ],
  },
  {
    minScore: 40,
    spawnTime: [2000, 4000],
    enemies: [
      { type: 'zombie', percent: 90 },
      { type: 'orc', percent: 5 },
      { type: 'goblin', percent: 5 },
    ],
  },
  {
    minScore: 50,
    spawnTime: [2500, 4500],
    enemies: [
      { type: 'zombie', percent: 70 },
      { type: 'orc', percent: 20 },
      { type: 'goblin', percent: 10 },
    ],
  },
  {
    minScore: 60,
    spawnTime: [2500, 4500],
    enemies: [
      { type: 'zombie', percent: 60 },
      { type: 'orc', percent: 30 },
      { type: 'goblin', percent: 10 },
    ],
  },
]
