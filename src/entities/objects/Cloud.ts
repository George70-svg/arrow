import { Shape } from '@entities/objects/Shape.ts'
import type { DayPeriod } from '@entities/game/DayPeriod.ts'
import type { Coordinate } from '@entities/types.ts'
import cloudImg1 from '@/assets/images/clouds/Clouds_white/Shape1/cloud_shape1_1.png' // +
import cloudImg2 from '@/assets/images/clouds/Clouds_white/Shape2/cloud_shape2_1.png' // +
import cloudImg3 from '@/assets/images/clouds/Clouds_white/Shape3/cloud_shape3_1.png' // +
import cloudImg4 from '@/assets/images/clouds/Clouds_white/Shape4/cloud_shape4_1.png' // +
import cloudImg5 from '@/assets/images/clouds/Clouds_white/Shape5/cloud_shape5_1.png'
import cloudImg6 from '@/assets/images/clouds/Clouds_white/Shape6/cloud_shape6_1.png'
import cloudImg7 from '@/assets/images/clouds/Clouds_white/Shape7/cloud_shape7_1.png'
import cloudImg8 from '@/assets/images/clouds/Clouds_white/Shape8/clouds_shape8_1.png'

type CloudProps = {
  id: string
  context: CanvasRenderingContext2D
  speed: number
  position: Coordinate
  imgWidth: number
  imgHeight: number
  dayPeriod: DayPeriod
}

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
    })

    this.speed = props.speed
    this.cloudImage.src = cloudImg4
    this.dayPeriod = props.dayPeriod
  }

  get contrast() {
    const angleCoeff = this.dayPeriod.angleCoeff()
    return `contrast(${40 + angleCoeff * 60}%) brightness(${70 + angleCoeff * 30}%)`
  }

  update(delta: number) {
    const distance = this.speed * delta
    //console.log(distance)
    this.position.x += distance
    console.log('this.position.x', this.position.x)
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
