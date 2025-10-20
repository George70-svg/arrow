import type { Shape } from '@entities/objects/Shape.ts'
import { Player } from '../objects/Player.ts'
import { Bow } from '@entities/objects/Bow.ts'

type Config = {
  width: number
  height: number
  objects: Record<string, Shape | null>
  arrow: {
    heightCoeff: number
    widthCoeff: number
    speed: number
  }
}

const config: Config = {
  width: 0,
  height: 0,
  objects: {},
  arrow: {
    heightCoeff: 4, // коэффициент высоты полета
    widthCoeff: 0.4, // коэффициент длины полета
    speed: 0.25,
  },
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
      imgWidth: 150,
      imgHeight: 150,
      speed: 0.15,
      startDirection: 'right',
    }),
    bow: new Bow({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: 70, y: config.height - 40 },
      imgWidth: 45,
      imgHeight: 45,
      speed: 0.15,
      startDirection: 'right',
      startAngle: -0.75,
      maxAngle: -85,
      minAngle: -20,
    }),
    arrow: null,
  }
}

export default config
