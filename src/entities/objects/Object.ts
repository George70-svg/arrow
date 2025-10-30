import { Shape } from './Shape.ts'
import type { Coordinate } from '../types.ts'
import { SpriteImage } from '@entities/game/SpriteImage.ts'

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
    })

    this.framePosition = props.framePosition
    this.image.src = props.sprite
    this.frameWidth = props.frameWidth
    this.frameHeight = props.frameHeight
    this.spriteImage = new SpriteImage(this.image, this.framePosition.x, this.framePosition.y, this.imgWidth, this.imgHeight)
  }

  private spriteImage

  public update() {}

  /*return [
    frameFromSprite.image,
    frameFromSprite.sx, // sx — смещение по X в спрайте
    frameFromSprite.sy, // sy — смещение по Y в спрайте
    frameFromSprite.sw, // sWidth — ширина кадра
    frameFromSprite.sw, // sHeight — высота кадра
    (-frameFromSprite.sw * this.scale.width) / 2, // dx — куда рисовать по X
    -frameFromSprite.sh * this.scale.height, // dy — куда рисовать по Y
    frameFromSprite.sw * this.scale.width, // dWidth — ширина отрисовки
    frameFromSprite.sh * this.scale.height, // dHeight — высота отрисовки
  ]*/

  public render() {
    const params = this.spriteImage.imageFromSprite()

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
