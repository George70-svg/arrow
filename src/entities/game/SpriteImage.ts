import type { SpriteFrameParams } from '@entities/types.ts'

export class SpriteImage {
  sprite: HTMLImageElement
  x: number
  y: number
  width: number
  height: number

  constructor(sprite: HTMLImageElement, x: number, y: number, imgWidth: number, imgHeight: number) {
    this.sprite = sprite
    this.x = x
    this.y = y
    this.width = imgWidth
    this.height = imgHeight
  }

  imageFromSprite(): SpriteFrameParams {
    return {
      image: this.sprite,
      sx: this.x,
      sy: this.y,
      sw: this.width,
      sh: this.height,
    }
  }
}
