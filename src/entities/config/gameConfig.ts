import { Player } from '../objects/Player.ts'
import type { Shape } from '@entities/objects/Shape.ts'

type Config = {
  width: number
  height: number
  objects: Record<string, Shape>
}

export const config: Config = {
  width: 0,
  height: 0,
  objects: {},
}

export const initializeObjects = (context: CanvasRenderingContext2D | null) => {
  if (!context) {
    return
  }

  config.objects = {
    player: new Player({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: 40, y: config.height },
      width: 200,
      height: 200,
      speed: 0.15,
      startDirection: 'right',
    }),
  }
}
