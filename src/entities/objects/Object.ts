import { Shape } from './Shape.ts'
import type { Coordinate } from '../types.ts'
import { SpriteImage } from '@entities/game/SpriteImage.ts'
import { ObjectRect } from '@entities/game/ObjectRect.ts'

type ObjectProps = {
  id: string
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  framePosition: Coordinate
  imgWidth: number // ширина изображения на canvas
  imgHeight: number // высота изображения на canvas
  frameWidth: number // ширина на которую вырезаем из спрайта
  frameHeight: number // высота на которую вырезаем из спрайта
  sprite: string
}

export class Object extends Shape {
  image = new Image()
  framePosition: Coordinate
  frameWidth: number
  frameHeight: number

  constructor(props: ObjectProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
      markForDelete: false,
    })

    this.framePosition = props.framePosition
    this.image.src = props.sprite
    this.frameWidth = props.frameWidth
    this.frameHeight = props.frameHeight
    this.spriteImage = new SpriteImage(this.image, this.framePosition.x, this.framePosition.y, this.imgWidth, this.imgHeight)
  }

  private spriteImage
  private rect = new ObjectRect(this.context)

  public update() {}

  public render() {
    const params = this.spriteImage.imageFromSprite()

    //this.rect.draw(this.position.x, this.position.y, params.sw, params.sh)

    this.context.drawImage(
      params.image,
      params.sx,
      params.sy,
      this.frameWidth,
      this.frameHeight,
      this.position.x,
      this.position.y,
      params.sw,
      params.sh,
    )
  }
}
