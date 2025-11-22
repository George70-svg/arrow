import config from '@entities/config/gameConfig.ts'
import type { Shape } from '@entities/objects/Shape.ts'
import type { Coordinate } from '@entities/types.ts'
import { Arrow } from '@entities/objects/Arrow.ts'

export const render = () => {
  const shapes = Object.values(config.objects).flat(Infinity) as Shape[]

  shapes.forEach((shape) => {
    if (shape) {
      shape.render()
    }
  })
}

export const update = (delta: number) => {
  const shapes = Object.values(config.objects).flat(Infinity) as Shape[]
  const dayPeriod = config.dayPeriod

  // TODO: ОЧЕНЬ ПЛОХО для 60 FPS
  // config.objects.background.forEach(o => o.update(delta));

  shapes.forEach((shape) => {
    if (shape && shape.update) {
      shape.update(delta)
    }
  })

  if (dayPeriod) {
    dayPeriod.update()
  }
}

export const deleteObjects = () => {
  const shapes = Object.values(config.objects).flat(Infinity) as Shape[]
  const markedShapes = shapes.filter((shape) => shape.markForDelete)
  const objectKeys = Object.keys(config.objects) as (keyof typeof config.objects)[]

  if (markedShapes.length) {
    for (const key of objectKeys) {
      config.objects[key] = config.objects[key].filter((shape) => !shape.markForDelete)
    }
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
  if (config.objects.arrows.length) {
    return
  }

  config.objects.arrows = [
    new Arrow({
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
    }),
  ]
}
