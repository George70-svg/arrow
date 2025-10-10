import controller from '@entities/game/Conroller.ts'
import runSprite from '@images/player/Run.png'
import { Shape } from './Shape.ts'
import type { Coordinate } from '../types.ts'

export type PlayerProps = {
  id: string
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  width: number
  height: number
  speed: number
}

export class Player extends Shape {
  speed: number = 0
  runSprite: HTMLImageElement = new Image()

  frame: number = 0
  currentRender = 0
  frameRate: number = 30

  constructor(props: PlayerProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      width: props.width,
      height: props.height,
    })

    this.speed = props.speed
    this.runSprite.src = runSprite
  }

  getFrame(positionX: number, positionY: number): [number, number, number, number, number, number, number, number] {
    const fullWidth = this.runSprite.width
    const fullHeight = this.runSprite.height
    const frameWidth = fullWidth / 8
    const frameHeight = fullHeight

    if (this.frame > 7) {
      this.frame = 0
    }

    return [
      frameWidth * this.frame, // sx — смещение по X в спрайте
      0, // sy — смещение по Y в спрайте
      frameWidth, // sWidth — ширина кадра
      frameHeight, // sHeight — высота кадра
      positionX, // dx — куда рисовать по X
      positionY, // dy — куда рисовать по Y
      frameWidth * 1.5, // dWidth — ширина отрисовки
      frameHeight * 1.5, // dHeight — высота отрисовки
    ]
  }

  update(delta: number) {
    const pressedKeys = controller.getPressedKeys()
    const distance = this.speed * delta

    if (pressedKeys['KeyW']) this.position.y -= distance
    if (pressedKeys['KeyA']) this.position.x -= distance
    if (pressedKeys['KeyS']) this.position.y += distance
    if (pressedKeys['KeyD']) this.position.x += distance
  }

  render() {
    if (this.currentRender === 0) {
      this.frame += 1
    }

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    this.context.drawImage(this.runSprite, ...this.getFrame(this.position.x, this.position.y))
    this.currentRender++

    if (this.currentRender > this.frameRate) {
      this.currentRender = 0
    }
  }
}
