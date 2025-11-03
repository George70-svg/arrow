import { Shape } from '@entities/objects/Shape.ts'
import type { DayPeriod } from '@entities/game/DayPeriod.ts'
import { lerpColor } from '@entities/utils/physics.ts'
import type { RGBObject } from '@entities/types.ts'
import backgroundImage from '../../assets/images/background/bg11.png'

type BackgroundProps = {
  id: string
  context: CanvasRenderingContext2D
  backgroundContext: CanvasRenderingContext2D
  dayPeriod: DayPeriod
}

export class Background extends Shape {
  private readonly dayPeriod
  backgroundContext: CanvasRenderingContext2D
  backgroundImage = new Image()
  contextWidth: number
  contextHeight: number
  dayColor: RGBObject = { red: 135, green: 206, blue: 250 }
  nightColor: RGBObject = { red: 10, green: 20, blue: 60 }

  constructor(props: BackgroundProps) {
    super({
      id: props.id,
      context: props.context,
      position: { x: 0, y: 0 },
      imgWidth: 0,
      imgHeight: 0,
    })

    this.backgroundContext = props.backgroundContext
    this.dayPeriod = props.dayPeriod
    this.contextWidth = this.context.canvas.width
    this.contextHeight = this.context.canvas.height
    this.backgroundImage.src = backgroundImage
  }

  get color() {
    const angleCoeff = this.dayPeriod.angleCoeff()
    return lerpColor(this.nightColor, this.dayColor, angleCoeff)
  }

  get contrast() {
    const angleCoeff = this.dayPeriod.angleCoeff()
    //return `contrast(${50 + angleCoeff * 50}%) brightness(${80 + angleCoeff * 20}%)`
    return `contrast(${50 + angleCoeff * 50}%) brightness(${50 + angleCoeff * 30}%)`
  }

  render() {
    // Настройка background конеткста
    this.backgroundContext.fillStyle = this.color
    this.backgroundContext.fillRect(0, 0, this.contextWidth, this.contextHeight)

    this.context.filter = this.contrast
    this.context.drawImage(this.backgroundImage, 0, 0, this.contextWidth, this.contextHeight)
    this.context.filter = 'none'
  }
}
