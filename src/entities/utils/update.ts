import { config } from '@entities/config/gameConfig.ts'

export const update = (delta: number) => {
  const shapes = Object.values(config.objects)
  shapes.forEach((shape) => {
    if (shape.update) {
      shape.update(delta)
    }
  })
}
