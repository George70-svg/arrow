import { Player } from '../objects/Player.ts'
import type { Shape } from '@entities/objects/Shape.ts'

type Config = {
  objects: Record<string, Shape>
}

export const config: Config = {
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
      startPosition: { x: 200, y: 630 },
      width: 20,
      height: 20,
      speed: 2,
      delta: 1,
    }),
  }
}
