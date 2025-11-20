import { playerSprites } from '@entities/config/spriteConfig.ts'
import { FrameDelay } from '@entities/game/FrameDelay.ts'
import { SpriteFrame } from '@entities/game/SpriteFrame.ts'
import { Collision } from '@entities/game/Collision.ts'
import type { Controller } from '@entities/game/Conroller.ts'
//import { ObjectRect } from '@entities/game/ObjectRect.ts'
import { Shape } from './Shape.ts'
import type { Coordinate, Direction, SpriteConfig } from '../types.ts'

type PlayerProps = {
  id: string
  context: CanvasRenderingContext2D
  imgWidth: number
  imgHeight: number
  startPosition: Coordinate
  startDirection: Direction
  speed: number
  controller: Controller
}

export class Player extends Shape {
  speed: number = 0
  direction: Direction
  currentSprite: SpriteConfig = playerSprites.idle
  frame: number = 0
  isMoving = false
  controller: Controller

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
    this.controller = props.controller
  }

  private spriteFrame = new SpriteFrame(this.currentSprite, this.imgWidth, this.imgHeight)
  private frameDelay = new FrameDelay()
  private collision = new Collision()
  //private rect = new ObjectRect(this.context, 'blue')

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

  public update(delta: number) {
    const pressedKeys = this.controller.getPressedKeys()
    const distance = this.speed * delta
    this.isMoving = false

    // Если есть коллизия с границами экрана, то нужна "отматать" движение назад, иначе двигаться дальше
    if (this.hasFrameCollision || this.hasWallCollision) {
      this.position.x = this.direction === 'left' ? this.position.x + 1 : this.position.x - 1
      return
    } else {
      if (pressedKeys['KeyA']) {
        this.position.x -= distance
        this.isMoving = true
        this.direction = 'left'
      } else if (pressedKeys['KeyD']) {
        this.position.x += distance
        this.isMoving = true
        this.direction = 'right'
      }
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
    const [img, sx, sy, sw, sh, dx, dy, dw, dh] = params

    //this.rect.draw(dx, dy, dw, dh)

    this.context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) // теперь рисуем относительно новой системы координат, dx и dy будут равны 0 (центр от translate)
    this.context.restore() // восстанавливаем состояние (отменяем translate, rotate и т.д.)
  }
}
