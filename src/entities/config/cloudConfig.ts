import config from '@entities/config/gameConfig.ts'
import { Cloud } from '@entities/objects/Cloud.ts'

const cloudNumber = 6
const minSpeed = 0.025
const maxSpeed = 0.05

export const createCloud = (context: CanvasRenderingContext2D) => {
  if (!config.dayPeriod) {
    return
  }

  if (config.objects.clouds.length < cloudNumber) {
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
  if (!config.dayPeriod) {
    return
  }

  config.objects.clouds = [
    new Cloud({
      context: context,
      id: crypto.randomUUID(),
      imgWidth: 0,
      imgHeight: 0,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      position: { x: config.width * 0.05, y: config.height * 0.25 },
      dayPeriod: config.dayPeriod,
    }),
    new Cloud({
      context: context,
      id: crypto.randomUUID(),
      imgWidth: 0,
      imgHeight: 0,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      position: { x: config.width * 0.2, y: config.height * 0.15 },
      dayPeriod: config.dayPeriod,
    }),
    new Cloud({
      context: context,
      id: crypto.randomUUID(),
      imgWidth: 0,
      imgHeight: 0,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      position: { x: config.width * 0.35, y: config.height * 0.35 },
      dayPeriod: config.dayPeriod,
    }),
    new Cloud({
      context: context,
      id: crypto.randomUUID(),
      imgWidth: 0,
      imgHeight: 0,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      position: { x: config.width * 0.5, y: config.height * 0.25 },
      dayPeriod: config.dayPeriod,
    }),
    new Cloud({
      context: context,
      id: crypto.randomUUID(),
      imgWidth: 0,
      imgHeight: 0,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      position: { x: config.width * 0.65, y: config.height * 0.15 },
      dayPeriod: config.dayPeriod,
    }),
    new Cloud({
      context: context,
      id: crypto.randomUUID(),
      imgWidth: 0,
      imgHeight: 0,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      position: { x: config.width * 0.8, y: config.height * 0.35 },
      dayPeriod: config.dayPeriod,
    }),
  ]
}
