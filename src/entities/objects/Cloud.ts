import { Shape } from '@entities/objects/Shape.ts'
import type { DayPeriod } from '@entities/game/DayPeriod.ts'
import type { Coordinate } from '@entities/types.ts'
import cloudImg1 from '@/assets/images/clouds/Clouds_white/Shape1/cloud_shape1_1.png'
import cloudImg2 from '@/assets/images/clouds/Clouds_white/Shape2/cloud_shape2_1.png'
import cloudImg3 from '@/assets/images/clouds/Clouds_white/Shape3/cloud_shape3_1.png'
import cloudImg4 from '@/assets/images/clouds/Clouds_white/Shape3/cloud_shape3_3.png'
import cloudImg5 from '@/assets/images/clouds/Clouds_white/Shape4/cloud_shape4_1.png'
import { Collision } from '@entities/game/Collision.ts'
import { ObjectRect } from '@entities/game/ObjectRect.ts'

type CloudProps = {
  id: string
  context: CanvasRenderingContext2D
  speed: number
  position: Coordinate
  imgWidth: number
  imgHeight: number
  dayPeriod: DayPeriod
}

const cloudImages = [cloudImg2, cloudImg3, cloudImg4, cloudImg5, cloudImg1, cloudImg2, cloudImg3, cloudImg4, cloudImg5]

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

    const randomImageNumber = Math.floor(Math.random() * 9)
    this.speed = props.speed
    this.cloudImage.src = cloudImages[randomImageNumber]
    this.dayPeriod = props.dayPeriod
  }

  private collision = new Collision()
  private rect = new ObjectRect(this.context)

  get contrast() {
    const angleCoeff = this.dayPeriod.angleCoeff()
    return `contrast(${40 + angleCoeff * 60}%) brightness(${70 + angleCoeff * 30}%)`
  }

  get hasCollision() {
    return this.collision.checkFrameCollision(
      {
        x: this.position.x,
        y: this.position.y,
        width: this.cloudImage.width,
        height: this.cloudImage.height,
      },
      'startImageWithRightFrame',
    )
  }

  update(delta: number) {
    if (this.hasCollision) {
      this.markForDelete = true
    }

    const distance = this.speed * delta
    this.position.x += distance
  }

  render() {
    this.context.save()
    this.context.translate(this.position.x, this.position.y)
    this.context.filter = this.contrast

    this.rect.draw(-this.cloudImage.width / 2, -this.cloudImage.height / 2, this.cloudImage.width, this.cloudImage.height)

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
