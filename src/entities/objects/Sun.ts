import { Shape } from '@entities/objects/Shape.ts'
import type { DayPeriod } from '@entities/game/DayPeriod.ts'
import moon from '@/assets/images/environment/moon.png'
import { ObjectRect } from '@entities/game/ObjectRect.ts'

type SunProps = {
  id: string
  context: CanvasRenderingContext2D
  imgWidth: number
  imgHeight: number
  dayPeriod: DayPeriod
}

export class Sun extends Shape {
  private readonly dayPeriod
  moonImage = new Image()

  constructor(props: SunProps) {
    super({
      id: props.id,
      context: props.context,
      position: { x: 0, y: 0 },
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
      markForDelete: false,
    })

    this.dayPeriod = props.dayPeriod
    this.moonImage.src = moon
  }

  private rect = new ObjectRect(this.context)

  drawSun() {
    const position = this.dayPeriod.sunPosition()
    const radius = this.imgWidth
    const gradient = this.context.createRadialGradient(position.x, position.y, radius * 0.3, position.x, position.y, radius)
    gradient.addColorStop(0, '#fff6b1')
    gradient.addColorStop(1, '#f7c948')

    //this.rect.draw(position.x - radius, position.y - radius, radius * 2, radius * 2)

    this.context.beginPath()
    this.context.arc(position.x, position.y, radius, 0, Math.PI * 2)
    this.context.fillStyle = gradient
    this.context.fill()
  }

  drawMoon() {
    const position = this.dayPeriod.moonPosition()
    const diameter = this.imgWidth * 2
    this.context.save()
    this.context.translate(position.x, position.y)

    //this.rect.draw(-diameter / 2, -diameter / 2, diameter, diameter)

    this.context.drawImage(this.moonImage, -diameter / 2, -diameter / 2, diameter, diameter)
    this.context.restore()
  }

  render() {
    this.drawSun()
    this.drawMoon()
  }
}
