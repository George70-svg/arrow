import type { DrawImageParams, SpriteConfig, SpriteFrameParams } from '@entities/types.ts'

// Класс для спрайтов, когда все изображения в спрайте идут в одну строку
export class SpriteFrame {
  sprite: SpriteConfig
  imgWidth: number
  imgHeight: number
  scale: { width: number; height: number }

  constructor(sprite: SpriteConfig, imgWidth: number, imgHeight: number) {
    this.sprite = sprite
    this.imgWidth = imgWidth
    this.imgHeight = imgHeight
    this.scale = this.scaleFrame()
  }

  private nextFrame(frame: number) {
    if (frame >= this.sprite.frames) {
      return 0
    } else {
      return frame++
    }
  }

  private scaleFrame() {
    const frameWidth = this.sprite.image.width / this.sprite.frames
    const frameHeight = this.sprite.image.height

    const scaleWidth = this.imgWidth / frameWidth
    const scaleHeight = this.imgHeight / frameHeight

    return {
      width: scaleWidth,
      height: scaleHeight,
    }
  }

  private frameFromSprite(frame: number): SpriteFrameParams {
    const fullWidth = this.sprite.image.width
    const fullHeight = this.sprite.image.height
    const frameWidth = fullWidth / this.sprite.frames
    const frameHeigth = fullHeight

    return {
      image: this.sprite.image,
      sx: frameWidth * this.nextFrame(frame), // sx — смещение по X в спрайте
      sy: 0, // sy — смещение по Y в спрайте
      sw: frameWidth, // sWidth — ширина кадра
      sh: frameHeigth, // sHeight — высота кадра
    }
  }

  setSprite(sprite: SpriteConfig) {
    this.sprite = sprite
    this.scale = this.scaleFrame()
  }

  // Возвращение параметров с учетом передвижения и направления для рисования
  frameParams(frame: number): DrawImageParams {
    const frameFromSprite = this.frameFromSprite(frame)

    return [
      frameFromSprite.image,
      frameFromSprite.sx, // sx — смещение по X в спрайте
      frameFromSprite.sy, // sy — смещение по Y в спрайте
      frameFromSprite.sw, // sWidth — ширина кадра
      frameFromSprite.sh, // sHeight — высота кадра
      (-frameFromSprite.sw * this.scale.width) / 2, // dx — куда рисовать по X
      -frameFromSprite.sh * this.scale.height, // dy — куда рисовать по Y
      frameFromSprite.sw * this.scale.width, // dWidth — ширина отрисовки
      frameFromSprite.sh * this.scale.height, // dHeight — высота отрисовки
    ]
  }
}
