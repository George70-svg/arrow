import config from '@entities/config/gameConfig.ts'
import type { SpriteFrame } from '@entities/types.ts'

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

// Метод для спрайтов, когда все изображения в спрайте идут в одну строку
export const getFrameFromSprite = (sprite: HTMLImageElement, framesInSprite: number, currentFrame: number): SpriteFrame => {
  const fullWidth = sprite.width
  const fullHeight = sprite.height
  const frameWidth = fullWidth / framesInSprite
  const frameHeigth = fullHeight

  return {
    image: sprite,
    sx: frameWidth * currentFrame, // sx — смещение по X в спрайте
    sy: 0, // sy — смещение по Y в спрайте
    sw: frameWidth, // sWidth — ширина кадра
    sh: frameHeigth, // sHeight — высота кадра
  }
}
