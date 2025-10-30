import config from '@entities/config/gameConfig.ts'
import type { Coordinate } from '@entities/types.ts'
import { Arrow } from '@entities/objects/Arrow.ts'

export const render = () => {
  const shapes = [...Object.values(config.objects), ...config.decorations]
  shapes.forEach((shape) => {
    if (shape) {
      shape.render()
    }
  })
}

export const update = (delta: number) => {
  const shapes = Object.values(config.objects)

  shapes.forEach((shape) => {
    if (shape && shape.update) {
      shape.update(delta)
    }
  })
}

export const createArrow = (
  context: CanvasRenderingContext2D,
  startArrowPosition: Coordinate,
  mousePressedTime: number,
  angle: number,
  minAngle: number,
  maxAngle: number,
) => {
  if (config.objects.arrow) {
    return
  }

  config.objects.arrow = new Arrow({
    id: crypto.randomUUID(),
    context: context,
    imgWidth: 45,
    imgHeight: 13,
    startPosition: startArrowPosition,
    speed: config.arrow.speed,
    tensionTimeMs: mousePressedTime,
    startAngle: angle,
    maxAngle: maxAngle,
    minAngle: minAngle,
  })
}
