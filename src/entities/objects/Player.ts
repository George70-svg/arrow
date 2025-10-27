import { getDrawParams } from '@entities/utils/utils.ts'
import { playerSprites } from '@entities/config/spriteConfig.ts'
import controller from '@entities/game/Conroller.ts'
import { FrameDelay } from '@entities/game/FrameDelay.ts'
import { Shape } from './Shape.ts'
import type { Coordinate, Direction, DrawImageParams, SpriteConfig } from '../types.ts'

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
  scaleWidth = 1
  scaleHeight = 1

  constructor(props: PlayerProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
    })

    this.speed = props.speed
    this.direction = props.startDirection
  }

  private getCurrentImageFromSprite(sprite: HTMLImageElement, framesInSprite: number): DrawImageParams {
    if (this.frame >= framesInSprite) {
      this.frame = 0
    }

    return getDrawParams(sprite, this.frame, framesInSprite, this.position.x, this.position.y)
  }

  private getRotatedDrawParams(): DrawImageParams {
    if (this.direction === 'left') {
      this.context.scale(-1, 1)
    } // отразить по оси X

    const [sprite, sx, sy, sWidth, sHeight, , , frameWidth, frameHeight] = this.getCurrentImageFromSprite(this.currentSprite.image, 8)
    this.scaleWidth = this.imgWidth / frameWidth
    this.scaleHeight = this.imgHeight / frameHeight

    return [
      sprite,
      sx, // sx — смещение по X в спрайте
      sy, // sy — смещение по Y в спрайте
      sWidth, // sWidth — ширина кадра
      sHeight, // sHeight — высота кадра
      (-sWidth * this.scaleWidth) / 2, // dx — куда рисовать по X
      -sprite.height * this.scaleHeight, // dy — куда рисовать по Y
      frameWidth * this.scaleWidth, // dWidth — ширина отрисовки
      frameHeight * this.scaleHeight, // dHeight — высота отрисовки
    ]
  }

  private frameDelay = new FrameDelay(this.currentSprite)

  public update(delta: number) {
    const pressedKeys = controller.getPressedKeys()
    const distance = this.speed * delta
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
    this.frameDelay.update(delta)
    this.frame = this.frameDelay.frame
  }

  public render() {
    this.context.save() // сохраняем текущее состояние Canvas
    this.context.translate(this.position.x, this.position.y) // настраиваем точку вращения (центр объекта)
    const params = this.getRotatedDrawParams()
    this.context.drawImage(...params) // теперь рисуем относительно новой системы координат, dx и dy будут равны 0 (центр от translate)
    this.context.restore() // восстанавливаем состояние (отменяем translate, rotate и т.д.)
  }
}
