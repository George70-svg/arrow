import config from '@entities/config/gameConfig.ts'
import { getArrowPath, getNextAngle, getNextPositionY } from '@entities/utils/physics.ts'
import { Shape } from '@entities/objects/Shape.ts'
import type { ArrowPath, Coordinate } from '@entities/types.ts'
import arrow from '@/assets/images/bow/arrow.png'

type ArrowProps = {
  id: string
  context: CanvasRenderingContext2D
  imgWidth: number
  imgHeight: number
  startPosition: Coordinate
  speed: number
  startAngle: number // начальный угол (в радианах)
  maxAngle: number // максимальный угол направения стрелы (в градусах)
  minAngle: number // минимальный угол направления стрелы (в градусах)
}

export class Arrow extends Shape {
  speed: number = 0
  arrowImg = new Image()
  startPosition: Coordinate = { x: 0, y: 0 }
  angle: number = 0 // угол в радианах
  startAngle: number = 0 // угол в радианах
  maxAngle = -85 // угол в градусах
  minAngle = 5 // угол в градусах
  arrowPath: ArrowPath = { angleCoefficient: 0, maxPathLength: 0, maxPathHeight: 0 }

  constructor(props: ArrowProps) {
    super({
      id: props.id,
      context: props.context,
      position: { ...props.startPosition },
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
    })

    this.speed = props.speed
    this.startPosition = props.startPosition
    this.startAngle = props.startAngle
    this.maxAngle = props.maxAngle
    this.minAngle = props.minAngle
    this.arrowPath = getArrowPath(this.context, this.startAngle, this.maxAngle, this.minAngle)
    this.arrowImg.src = arrow
  }

  public update(delta: number) {
    const distance = this.speed * delta - this.arrowPath.angleCoefficient * 1.5
    this.position.x += distance
    this.position.y =
      this.startPosition.y -
      getNextPositionY(this.position.x, this.startPosition.x, this.arrowPath.maxPathLength, this.arrowPath.maxPathHeight)
    this.angle = this.startAngle - getNextAngle(this.position.x, this.arrowPath.maxPathLength, this.startAngle)

    if (this.position.x > this.context.canvas.clientWidth || this.position.y > this.context.canvas.clientWidth) {
      config.objects.arrow = null
    }
  }

  public render() {
    this.context.save() // сохраняем текущее состояние Canvas
    this.context.translate(this.position.x, this.position.y) // настраиваем точку вращения (центр объекта)
    this.context.rotate(this.angle)
    // По дефолту drawImage ставит левый верхний угол картинки в заданную точку, поэтому смещаем на половину размера
    this.context.drawImage(this.arrowImg, -this.imgWidth / 2, -this.imgHeight / 2, this.imgWidth, this.imgHeight)
    this.context.restore() // восстанавливаем состояние (отменяем translate, rotate)
  }
}
