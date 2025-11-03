import config from '@entities/config/gameConfig.ts'
import type { Coordinate } from '@entities/types.ts'
import { Arrow } from '@entities/objects/Arrow.ts'

export const render = () => {
  // Вахен порядок деструктуризация, т.к. от этого завист порядок наложения элементов друг на друга
  const shapes = [config.background, ...config.decorations, ...Object.values(config.objects)]
  shapes.forEach((shape) => {
    if (shape) {
      shape.render()
    }
  })
}

export const update = (delta: number) => {
  const shapes = Object.values(config.objects)
  const dayPeriod = config.dayPeriod

  shapes.forEach((shape) => {
    if (shape && shape.update) {
      shape.update(delta)
    }
  })

  if (dayPeriod) {
    dayPeriod.update()
  }
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
