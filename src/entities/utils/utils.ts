import config from '@entities/config/gameConfig.ts'
import type { DrawImageParams } from '@entities/types.ts'

export const render = () => {
  const shapes = Object.values(config.objects)
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

export const getDrawParams = (
  sprite: HTMLImageElement,
  currentFrame: number,
  framesInSprite: number,
  nextPositionX: number,
  nextPositionY: number,
): DrawImageParams => {
  const fullWidth = sprite.width
  const fullHeight = sprite.height
  const frameWidth = fullWidth / framesInSprite
  const frameHeight = fullHeight

  return [
    sprite,
    frameWidth * currentFrame, // sx — смещение по X в спрайте
    0, // sy — смещение по Y в спрайте
    frameWidth, // sWidth — ширина кадра
    frameHeight, // sHeight — высота кадра
    nextPositionX, // dx — куда рисовать по X
    nextPositionY, // dy — куда рисовать по Y
    frameWidth, // dWidth — ширина отрисовки
    frameHeight, // dHeight — высота отрисовки
  ]
}
