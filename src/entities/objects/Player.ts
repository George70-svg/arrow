import { getFrameFromSprite } from '@entities/utils/utils.ts'
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

  // TODO: Этот метод должен стать классом
  private getRotatedDrawParams(): DrawImageParams {
    // 1) Разворот картинки
    if (this.direction === 'left') {
      this.context.scale(-1, 1)
    } // отразить по оси X

    // 2) Смена кадров из спрайта
    if (this.frame >= this.currentSprite.frames) {
      this.frame = 0
    }

    // 3) Получение парамтров для рисования
    //const [sprite, sx, sy, sWidth, sHeight, , , frameWidth, frameHeight] = this.getCurrentImageFromSprite(this.currentSprite.image, 8)
    const frameFromSprite = getFrameFromSprite(this.currentSprite.image, this.currentSprite.frames, this.frame)

    // 4) Масштабирование исходного изображение под настроенное для объекта
    this.scaleWidth = this.imgWidth / frameFromSprite.sw
    this.scaleHeight = this.imgHeight / frameFromSprite.sh

    // 5) Возвращение параметров с учетом передвижения и направления для рисования
    return [
      frameFromSprite.image,
      frameFromSprite.sx, // sx — смещение по X в спрайте
      frameFromSprite.sy, // sy — смещение по Y в спрайте
      frameFromSprite.sw, // sWidth — ширина кадра
      frameFromSprite.sw, // sHeight — высота кадра
      (-frameFromSprite.sw * this.scaleWidth) / 2, // dx — куда рисовать по X
      -frameFromSprite.sh * this.scaleHeight, // dy — куда рисовать по Y
      frameFromSprite.sw * this.scaleWidth, // dWidth — ширина отрисовки
      frameFromSprite.sh * this.scaleHeight, // dHeight — высота отрисовки
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
