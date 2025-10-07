import { Shape } from './Shape.ts'
import type { Coordinate } from '../types.ts'
import eventBus from '@entities/game/EventBus.ts'

export type TankProps = {
  id: string
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  width: number
  height: number
  delta: number
  speed: number
}

export class Player extends Shape {
  speed: number = 0

  constructor(props: TankProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      width: props.width,
      height: props.height,
      delta: props.delta,
    })

    this.speed = props.speed

    eventBus.on('KeyW', this.moveUp.bind(this))
    eventBus.on('KeyA', this.moveRight.bind(this))
    eventBus.on('KeyS', this.moveDown.bind(this))
    eventBus.on('KeyD', this.moveLeft.bind(this))
  }

  moveUp() {
    this.position.y = this.position.y - this.speed * this.delta
  }

  moveRight() {
    this.position.x = this.position.x - this.speed * this.delta
  }

  moveDown() {
    this.position.y = this.position.y + this.speed * this.delta
  }

  moveLeft() {
    this.position.x = this.position.x + this.speed * this.delta
  }

  render() {
    console.log('position', this.position)
    this.context.fillStyle = '#62f35c'
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
