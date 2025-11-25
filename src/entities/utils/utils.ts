import config from '@entities/config/gameConfig.ts'
import type { Coordinate } from '@entities/types.ts'
import { Arrow } from '@entities/objects/Arrow.ts'

const objectKeys: (keyof typeof config.objects)[] = ['background', 'clouds', 'decorations', 'arrows', 'enemies', 'player']

export const render = () => {
  for (const key of objectKeys) {
    const group = config.objects[key]
    for (let i = 0; i < group.length; i++) {
      group[i].render()
    }
  }
}

export const update = (delta: number) => {
  const dayPeriod = config.dayPeriod

  for (const key of objectKeys) {
    const group = config.objects[key]
    for (let i = 0; i < group.length; i++) {
      const shape = group[i]
      if (shape.update) {
        shape.update(delta)
      }
    }
  }

  if (dayPeriod) {
    dayPeriod.update()
  }
}

export const deleteObjects = () => {
  for (const key of objectKeys) {
    const group = config.objects[key]
    let hasDeadObjects = false
    for (let i = 0; i < group.length; i++) {
      if (group[i].markForDelete) {
        hasDeadObjects = true
        break
      }
    }

    if (hasDeadObjects) {
      config.objects[key] = group.filter((shape) => !shape.markForDelete)
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
