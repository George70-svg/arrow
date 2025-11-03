import { Shape } from '@entities/objects/Shape.ts'
import type { Coordinate } from '@entities/types.ts'
import moon from '@/assets/images/environment/moon1.png'
import { lerpColor } from '@entities/utils/physics.ts'

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
  moonImage = new Image()

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
    this.speed = 0.0025
    this.radiusX = props.radiusX
    this.radiusY = props.radiusY
    this.moonImage.src = moon
  }

  sunPosition(): Coordinate {
    return {
      x: this.center.x + this.radiusX * Math.cos(this.angle),
      y: this.center.y + this.radiusY * Math.sin(this.angle),
    }
  }

  moonPosition(): Coordinate {
    return {
      x: this.center.x + this.radiusX * Math.cos(this.angle + Math.PI),
      y: this.center.y + this.radiusY * Math.sin(this.angle + Math.PI),
    }
  }

  drawSun(position: Coordinate) {
    const radius = this.imgWidth
    const gradient = this.context.createRadialGradient(position.x, position.y, radius * 0.3, position.x, position.y, radius)
    gradient.addColorStop(0, '#fff6b1')
    gradient.addColorStop(1, '#f7c948')

    this.context.beginPath()
    this.context.arc(position.x, position.y, radius, 0, Math.PI * 2)
    this.context.fillStyle = gradient
    this.context.fill()
  }

  drawMoon(position: Coordinate) {
    const diameter = this.imgWidth * 2
    this.context.save()
    this.context.translate(position.x, position.y)
    this.context.drawImage(this.moonImage, -diameter / 2, -diameter / 2, diameter, diameter)
    this.context.restore()
  }

  drawBackground() {
    //const angleCoeff = normalizeRadianAngle(this.angle) / 360
    const sunPos = this.sunPosition()
    const minY = this.center.y - this.radiusY // верх орбиты
    const maxY = this.center.y + this.radiusY // низ орбиты
    const angleCoeff = 1 - (sunPos.y - minY) / (maxY - minY)
    const dayColor = { red: 135, green: 206, blue: 250 }
    const nightColor = { red: 10, green: 20, blue: 60 }

    const skyColor = lerpColor(nightColor, dayColor, angleCoeff)

    this.context.fillStyle = skyColor
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }

  update() {
    this.angle += this.speed
    if (this.angle > 2 * Math.PI) this.angle = 0
  }

  render() {
    this.drawBackground()
    const sunPos = this.sunPosition()
    const moonPos = this.moonPosition()
    this.drawSun(sunPos)
    this.drawMoon(moonPos)
  }
}
