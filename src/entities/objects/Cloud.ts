import { Shape } from '@entities/objects/Shape.ts'
import type { DayPeriod } from '@entities/game/DayPeriod.ts'
import type { Coordinate } from '@entities/types.ts'
import cloudImg1 from '@/assets/images/clouds/Clouds_white/Shape1/cloud_shape1_1.png'
import cloudImg2 from '@/assets/images/clouds/Clouds_white/Shape2/cloud_shape2_1.png'
import cloudImg3 from '@/assets/images/clouds/Clouds_white/Shape3/cloud_shape3_1.png'
import cloudImg4 from '@/assets/images/clouds/Clouds_white/Shape3/cloud_shape3_3.png'
import cloudImg5 from '@/assets/images/clouds/Clouds_white/Shape4/cloud_shape4_1.png'

type CloudProps = {
  id: string
  context: CanvasRenderingContext2D
  speed: number
  position: Coordinate
  imgWidth: number
  imgHeight: number
  dayPeriod: DayPeriod
}

const cloudImages = [cloudImg1, cloudImg2, cloudImg3, cloudImg4, cloudImg5]

export class Cloud extends Shape {
  private readonly dayPeriod
  speed: number
  cloudImage = new Image()

  constructor(props: CloudProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.position,
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
      markForDelete: false,
      canDelete: true,
    })

    this.speed = props.speed
    this.cloudImage.src = cloudImages[Math.floor(Math.random() * 5)]
    this.dayPeriod = props.dayPeriod
  }

  get contrast() {
    const angleCoeff = this.dayPeriod.angleCoeff()
    return `contrast(${40 + angleCoeff * 60}%) brightness(${70 + angleCoeff * 30}%)`
  }

  update(delta: number) {
    const distance = this.speed * delta
    this.position.x += distance
  }

  render() {
    this.context.save()
    this.context.translate(this.position.x, this.position.y)
    this.context.filter = this.contrast
    this.context.drawImage(
      this.cloudImage,
      -this.cloudImage.width / 2,
      -this.cloudImage.height / 2,
      this.cloudImage.width,
      this.cloudImage.height,
    )
    this.context.restore()
  }
}
