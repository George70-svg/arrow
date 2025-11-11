import { playerSprites } from '@entities/config/spriteConfig.ts'
import controller from '@entities/game/Conroller.ts'
import { FrameDelay } from '@entities/game/FrameDelay.ts'
import { Shape } from './Shape.ts'
import type { Coordinate, Direction, SpriteConfig } from '../types.ts'
import { SpriteFrame } from '@entities/game/SpriteFrame.ts'
import { Collision } from '@entities/game/Collision.ts'

type PlayerProps = {
  id: string
  context: CanvasRenderingContext2D
  imgWidth: number
  imgHeight: number
  startPosition: Coordinate
  startDirection: Direction
  speed: number
}

export class Player extends Shape {
  speed: number = 0
  direction: Direction
  currentSprite: SpriteConfig = playerSprites.idle
  frame: number = 0
  isMoving = false

  constructor(props: PlayerProps) {
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
  }

  private spriteFrame = new SpriteFrame(this.currentSprite, this.imgWidth, this.imgHeight)
  private frameDelay = new FrameDelay()
  private collision = new Collision()

  get hasFrameCollision() {
    return this.collision.checkFrameCollision(
      {
        x: this.position.x,
        y: this.position.y,
        width: this.imgWidth,
        height: this.imgHeight,
      },
      'noBottom',
    )
  }

  public update(delta: number) {
    const pressedKeys = controller.getPressedKeys()
    const length = this.speed * delta
    // Если есть коллизия с границами экрана, то нужна "отматать" движение назад, иначе двигаться дальше
    const distance = !this.hasFrameCollision ? length : -(length + 1)
    this.isMoving = false

    if (pressedKeys['KeyA']) {
      this.position.x -= distance
      this.isMoving = true
      this.direction = 'left'
    }

    if (pressedKeys['KeyD']) {
      this.position.x += distance
      this.isMoving = true
      this.direction = 'right'
    }

    this.currentSprite = this.isMoving ? playerSprites.walk : playerSprites.idle
    this.spriteFrame.setSprite(this.currentSprite)
    this.frameDelay.update(delta, this.currentSprite)
    this.frame = this.frameDelay.frame
  }

  public render() {
    this.context.save() // сохраняем текущее состояние Canvas
    this.context.translate(this.position.x, this.position.y) // настраиваем точку вращения (центр объекта)
    if (this.direction === 'left') this.context.scale(-1, 1) // отразить по оси X
    const params = this.spriteFrame.frameParams(this.frame)
    this.context.drawImage(...params) // теперь рисуем относительно новой системы координат, dx и dy будут равны 0 (центр от translate)
    this.context.restore() // восстанавливаем состояние (отменяем translate, rotate и т.д.)
  }
}
