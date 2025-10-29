import type { SpriteConfig } from '@entities/types.ts'

export class FrameDelay {
  acc: number = 0
  currentFrame: number = 0

  update(delta: number, spriteConfig: SpriteConfig) {
    this.acc += delta

    if (this.acc >= spriteConfig.frameDelay) {
      if (this.currentFrame < spriteConfig.frames) {
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
