import { Enemy } from '@entities/objects/Enemy.ts'
import { goblinSprites, orcSprites, zombieSprites } from '@entities/config/spriteConfig.ts'

export const enemies = ['zombie', 'goblin', 'orc']

type EnemyType = (typeof enemies)[number]
type EnemyCallback = (context: CanvasRenderingContext2D, x: number, y: number, setScore: (value: number) => void) => Enemy

const createZombie = (context: CanvasRenderingContext2D, x: number, y: number, setScore: (value: number) => void) => {
  return new Enemy({
    context: context,
    id: crypto.randomUUID(),
    startPosition: { x, y },
    imgWidth: 75,
    imgHeight: 100,
    speed: 0.03,
    startDirection: 'left',
    spriteConfig: zombieSprites,
    onDied: setScore,
  })
}

const createGoblin = (context: CanvasRenderingContext2D, x: number, y: number, setScore: (value: number) => void) => {
  return new Enemy({
    context: context,
    id: crypto.randomUUID(),
    startPosition: { x, y },
    imgWidth: 60,
    imgHeight: 80,
    speed: 0.1,
    startDirection: 'left',
    spriteConfig: goblinSprites,
    onDied: setScore,
  })
}

const createOrc = (context: CanvasRenderingContext2D, x: number, y: number, setScore: (value: number) => void) => {
  return new Enemy({
    context: context,
    id: crypto.randomUUID(),
    startPosition: { x, y },
    imgWidth: 75,
    imgHeight: 100,
    speed: 0.06,
    startDirection: 'left',
    spriteConfig: orcSprites,
    onDied: setScore,
  })
}

export const create: Record<EnemyType, EnemyCallback> = {
  zombie: createZombie,
  goblin: createGoblin,
  orc: createOrc,
  fork: createGoblin,
}
