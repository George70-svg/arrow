import type { SpriteConfig } from '@entities/types.ts'

export class FrameDelay {
  acc: number = 0
  currentFrame: number = 0
  spriteConfig: SpriteConfig

  constructor(spriteConfig: SpriteConfig) {
    this.spriteConfig = spriteConfig
  }

  update(delta: number) {
    this.acc += delta

    if (this.acc >= this.spriteConfig.frameDelay) {
      if (this.currentFrame < this.spriteConfig.frames) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }

      this.acc = 0
    }
  }

  get frame() {
    return this.currentFrame
  }
}
