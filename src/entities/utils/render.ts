import { config } from '@entities/config/gameConfig.ts'

export const render = (delta?: number) => {
  const shapes = Object.values(config.objects)
  shapes.forEach((shape) => {
    shape.delta = delta ?? 1
    shape.render()
  })
}
