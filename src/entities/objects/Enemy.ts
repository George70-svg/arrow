//import { ObjectRect } from '@entities/game/ObjectRect.ts'
import { FrameDelay } from '@entities/game/FrameDelay.ts'
import { SpriteFrame } from '@entities/game/SpriteFrame.ts'
import { Collision } from '@entities/game/Collision.ts'
import { Shape } from './Shape.ts'
import type { Coordinate, Direction, SpriteConfig } from '../types.ts'

type EnemyProps = {
  id: string
  context: CanvasRenderingContext2D
  imgWidth: number
  imgHeight: number
  startPosition: Coordinate
  startDirection: Direction
  speed: number
  spriteConfig: Record<string, SpriteConfig>
  onDied: (value: number) => void
  onGameOver: () => void
}

export class Enemy extends Shape {
  speed: number = 0
  direction: Direction
  spriteConfig: Record<string, SpriteConfig>
  currentSprite: SpriteConfig
  private spriteFrame: SpriteFrame
  frame: number = 0
  isMoving = false
  markForDied = false
  onDied: (value: number) => void
  onGameOver: () => void

  constructor(props: EnemyProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
      markForDelete: false,
    })

    this.speed = props.speed
    this.direction = props.startDirection
    this.spriteConfig = props.spriteConfig
    this.currentSprite = props.spriteConfig.walk
    this.spriteFrame = new SpriteFrame(this.currentSprite, this.imgWidth, this.imgHeight)
    this.onDied = props.onDied
    this.onGameOver = props.onGameOver
  }

  private frameDelay = new FrameDelay()
  private collision = new Collision()
  //private rect = new ObjectRect(this.context, 'blue')

  get hasWallCollision() {
    return this.collision.checkWallCollision(
      {
        x: this.position.x,
        y: this.position.y,
        width: this.imgWidth,
        height: this.imgHeight,
      },
      'notStrict',
    )
  }

  get hasArrowCollision() {
    return this.collision.checkArrowCollision({
      x: this.position.x,
      y: this.position.y,
      width: this.imgWidth,
      height: this.imgHeight,
    })
  }

  public update(delta: number) {
    const distance = this.speed * delta
    this.isMoving = true

    if (this.hasArrowCollision) {
      this.currentSprite = this.spriteConfig.died
      this.spriteFrame.setSprite(this.currentSprite)
      this.position.x += 0

      if (!this.markForDied) {
        this.onDied(1)
      }

      this.markForDied = true

      setTimeout(() => {
        this.setMarkForDelete()
      }, 360)
    }

    if (this.hasWallCollision) {
      this.currentSprite = this.spriteConfig.attack
      this.spriteFrame.setSprite(this.currentSprite)

      setTimeout(() => {
        this.onGameOver()
      }, 500)
    }

    if (!this.hasArrowCollision && !this.hasWallCollision && !this.markForDied) {
      this.position.x -= distance
    }

    this.frameDelay.update(delta, this.currentSprite)
    this.frame = this.frameDelay.frame
  }

  public render() {
    this.context.save() // сохраняем текущее состояние Canvas
    this.context.translate(this.position.x, this.position.y) // настраиваем точку вращения (центр объекта)
    if (this.direction === 'left') this.context.scale(-1, 1) // отразить по оси X
    const params = this.spriteFrame.frameParams(this.frame)
    const [img, sx, sy, sw, sh, dx, dy, dw, dh] = params

    //this.rect.draw(dx, dy, dw, dh)

    this.context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) // теперь рисуем относительно новой системы координат, dx и dy будут равны 0 (центр от translate)
    this.context.restore() // восстанавливаем состояние (отменяем translate, rotate и т.д.)
  }
}
