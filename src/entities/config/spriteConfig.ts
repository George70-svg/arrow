import type { SpriteConfig } from '@entities/types.ts'
import playerRun from '@images/player/Run.png'
import playerIdle from '@images/player/Idle2.png'
import playerWalk from '@images/player/Walk2.png'
import playerJump from '@images/player/Jump.png'

import goblinIdle from '@images/goblin/Idle.png'
import goblinWalk from '@images/goblin/Walk.png'
import goblinRun from '@images/goblin/Run.png'
import goblinAttack from '@images/goblin/Attack.png'

import zombieWalk from '@images/zombie/Walk.png'
import zombieAttack from '@images/zombie/Attack.png'

import orcWalc from '@images/orc/Walk.png'
import orcAttack from '@images/orc/Attack.png'

import explosion from '@images/finish/finish.png'

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

export const goblinSprites: Record<string, SpriteConfig> = {
  idle: {
    image: new Image(),
    frames: 8,
    frameDelay: 100,
  },
  walk: {
    image: new Image(),
    frames: 10,
    frameDelay: 100,
  },
  run: {
    image: new Image(),
    frames: 12,
    frameDelay: 100,
  },
  attack: {
    image: new Image(),
    frames: 4,
    frameDelay: 50,
  },
  died: {
    image: new Image(),
    frames: 7,
    frameDelay: 70,
  },
}

export const zombieSprites: Record<string, SpriteConfig> = {
  walk: {
    image: new Image(),
    frames: 7,
    frameDelay: 100,
  },
  attack: {
    image: new Image(),
    frames: 4,
    frameDelay: 50,
  },
  died: {
    image: new Image(),
    frames: 7,
    frameDelay: 70,
  },
}

export const orcSprites: Record<string, SpriteConfig> = {
  walk: {
    image: new Image(),
    frames: 7,
    frameDelay: 100,
  },
  attack: {
    image: new Image(),
    frames: 7,
    frameDelay: 50,
  },
  died: {
    image: new Image(),
    frames: 7,
    frameDelay: 70,
  },
}

playerSprites.idle.image.src = playerIdle
playerSprites.walk.image.src = playerWalk
playerSprites.run.image.src = playerRun
playerSprites.jump.image.src = playerJump

goblinSprites.idle.image.src = goblinIdle
goblinSprites.walk.image.src = goblinWalk
goblinSprites.run.image.src = goblinRun
goblinSprites.attack.image.src = goblinAttack
goblinSprites.died.image.src = explosion

zombieSprites.walk.image.src = zombieWalk
zombieSprites.attack.image.src = zombieAttack
zombieSprites.died.image.src = explosion

orcSprites.walk.image.src = orcWalc
orcSprites.attack.image.src = orcAttack
orcSprites.died.image.src = explosion
