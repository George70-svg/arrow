import type { SpriteConfig } from '@entities/types.ts'
import runImg from '@images/player/Run.png'
import idleImg from '@images/player/Idle2.png'
import walkImg from '@images/player/Walk2.png'
import jumpImg from '@images/player/Jump.png'

export const playerSprites: Record<string, SpriteConfig> = {
  idle: {
    image: new Image(),
    frames: 8,
    frameDelay: 150,
  },
  walk: {
    image: new Image(),
    frames: 8,
    frameDelay: 150,
  },
  run: {
    image: new Image(),
    frames: 8,
    frameDelay: 150,
  },
  jump: {
    image: new Image(),
    frames: 8,
    frameDelay: 150,
  },
}

playerSprites.idle.image.src = idleImg
playerSprites.walk.image.src = walkImg
playerSprites.run.image.src = runImg
playerSprites.jump.image.src = jumpImg
