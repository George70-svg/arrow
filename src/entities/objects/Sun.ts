import { Shape } from '@entities/objects/Shape.ts'
import type { Coordinate } from '@entities/types.ts'

type SunProps = {
  id: string
  context: CanvasRenderingContext2D
  imgWidth: number
  imgHeight: number
  startPosition: Coordinate
  radiusX: number
  radiusY: number
}

export class Sun extends Shape {
  angle: number
  speed: number
  orbitRadius: number
  center: Coordinate
  radiusX: number
  radiusY: number

  constructor(props: SunProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
    })

    this.center = { ...props.startPosition }
    this.orbitRadius = 500
    this.angle = Math.PI
    this.speed = 0.005
    this.radiusX = props.radiusX
    this.radiusY = props.radiusY
  }

  get sunPosition(): Coordinate {
    return {
      x: this.center.x + this.radiusX * Math.cos(this.angle),
      y: this.center.y + this.radiusY * Math.sin(this.angle),
    }
  }

  get moonPosition(): Coordinate {
    return {
      x: this.center.x + this.radiusX * Math.cos(this.angle + Math.PI),
      y: this.center.y + this.radiusY * Math.sin(this.angle + Math.PI),
    }
  }

  drawSun(pos: Coordinate) {
    const r = this.imgWidth
    const gradient = this.context.createRadialGradient(pos.x, pos.y, r * 0.3, pos.x, pos.y, r)
    gradient.addColorStop(0, '#fff6b1')
    gradient.addColorStop(1, '#f7c948')

    this.context.beginPath()
    this.context.arc(pos.x, pos.y, r, 0, Math.PI * 2)
    this.context.fillStyle = gradient
    this.context.fill()
  }

  update() {
    this.angle += this.speed
    if (this.angle > 2 * Math.PI) this.angle = 0
  }

  render() {
    const sunPos = this.sunPosition
    const moonPos = this.moonPosition

    // сначала луна, потом солнце — солнце поверх
    this.drawSun(moonPos)
    this.drawSun(sunPos)
  }
}
