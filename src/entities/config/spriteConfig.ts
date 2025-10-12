import type { SpriteConfig } from '@entities/types.ts'
import runImg from '@images/player/Run.png'
import idleImg from '@images/player/Idle.png'
import walkImg from '@images/player/Walk.png'
import jumpImg from '@images/player/Jump.png'

export const playerSprites: Record<string, SpriteConfig> = {
  idle: {
    image: new Image(),
    frames: 8,
    frameDelay: 20,
  },
  walk: {
    image: new Image(),
    frames: 8,
    frameDelay: 20,
  },
  run: {
    image: new Image(),
    frames: 8,
    frameDelay: 20,
  },
  jump: {
    image: new Image(),
    frames: 8,
    frameDelay: 20,
  },
}

playerSprites.idle.image.src = idleImg
playerSprites.walk.image.src = walkImg
playerSprites.run.image.src = runImg
playerSprites.jump.image.src = jumpImg
