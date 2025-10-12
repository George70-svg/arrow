import { getDrawParams } from '@entities/utils/render.ts'
import { playerSprites } from '@entities/config/spriteConfig.ts'
import controller from '@entities/game/Conroller.ts'
import { Shape } from './Shape.ts'
import type { Coordinate, Direction, DrawImageParams, SpriteConfig } from '../types.ts'

type PlayerProps = {
  id: string
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  width: number
  height: number
  speed: number
  startDirection: Direction
}

export class Player extends Shape {
  currentSprite: SpriteConfig = playerSprites.idle
  speed: number = 0
  frame: number = 0
  frameDelayCount: number = 0 // Счетчик для проверки показа следующего кадра
  isMoving = false
  direction: Direction = 'right'
  scaleWidth = 1
  scaleHeight = 1

  constructor(props: PlayerProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      width: props.width,
      height: props.height,
    })

    this.speed = props.speed
    this.direction = props.startDirection
  }

  private getCurrentImage(sprite: HTMLImageElement, framesInSprite: number): DrawImageParams {
    if (this.frame >= framesInSprite) {
      this.frame = 0
    }

    return getDrawParams(sprite, this.frame, framesInSprite, this.position.x, this.position.y)
  }

  private getRotatedDrawParams(): DrawImageParams {
    this.context.translate(this.position.x, this.position.y) // Настраиваем точку вращения (центр объекта)

    if (this.direction === 'left') {
      this.context.scale(-1, 1)
    } // Отразить по оси X

    const [sprite, sx, sy, sWidth, sHeight, , , frameWidth, frameHeight] = this.getCurrentImage(this.currentSprite.image, 8)
    this.scaleWidth = this.width / frameWidth
    this.scaleHeight = this.height / frameHeight

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

  // Устанавливаем задержку между сменами кадров
  private updateAnimationDelay() {
    this.frameDelayCount += 1

    if (this.frameDelayCount >= this.currentSprite.frameDelay) {
      this.frame++
      this.frameDelayCount = 0
    }
  }

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

    this.currentSprite = this.isMoving ? playerSprites.run : playerSprites.idle
  }

  public render() {
    this.updateAnimationDelay()
    this.context.save() // Сохраняем текущее состояние Canvas
    const params = this.getRotatedDrawParams()
    this.context.drawImage(...params) // Теперь рисуем относительно новой системы координат, dx и dy будут равны 0 (центр от translate)
    this.context.restore() // Восстанавливаем состояние (отменяем translate, rotate и т.д.)
  }
}
