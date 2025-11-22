import { Enemy } from '@entities/objects/Enemy.ts'
import { zombieSprites } from '@entities/config/spriteConfig.ts'

export const createZombie = (context: CanvasRenderingContext2D, x: number, y: number) => {
  return new Enemy({
    context: context,
    id: crypto.randomUUID(),
    startPosition: { x, y },
    imgWidth: 75,
    imgHeight: 100,
    speed: 0.05,
    startDirection: 'left',
    spriteConfig: zombieSprites,
  })
}
