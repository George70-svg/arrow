import config from '@entities/config/gameConfig.ts'
import { Cloud } from '@entities/objects/Cloud.ts'

const minSpeed = 0.025
const maxSpeed = 0.05

export const createCloud = (context: CanvasRenderingContext2D) => {
  if (!config.dayPeriod) {
    return
  }

  if (config.objects.clouds.length < 6) {
    const x = 1
    const y = (Math.random() * config.height) / 4 + 100
    const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed

    config.objects.clouds.push(
      new Cloud({
        context: context,
        id: crypto.randomUUID(),
        imgWidth: 0,
        imgHeight: 0,
        speed,
        position: { x, y },
        dayPeriod: config.dayPeriod,
      }),
    )
  }
}

export const initializeClouds = (context: CanvasRenderingContext2D) => {
  for (let i = 0; i < 1; i += 0.2) {
    const x = config.width * i + 100
    const y = (Math.random() * config.height) / 2
    const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed

    if (!config.dayPeriod) {
      return
    }

    config.objects.clouds.push(
      new Cloud({
        context,
        id: crypto.randomUUID(),
        imgWidth: 0,
        imgHeight: 0,
        speed,
        position: { x, y },
        dayPeriod: config.dayPeriod,
      }),
    )
  }
}
