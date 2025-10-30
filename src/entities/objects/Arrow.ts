// TODO: Плохо импортировать конфиг для класса
import config from '@entities/config/gameConfig.ts'
import { getArrowPath, getNextAngle, getNextPosition } from '@entities/utils/physics.ts'
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
  tensionTimeMs: number
  startAngle: number // начальный угол (в радианах)
  maxAngle: number // максимальный угол направения стрелы (в градусах)
  minAngle: number // минимальный угол направления стрелы (в градусах)
}

export class Arrow extends Shape {
  speed: number = 0
  arrowImg = new Image()
  startPosition: Coordinate = { x: 0, y: 0 }
  arrowPath: ArrowPath = { angleCoefficient: 0, maxPathLength: 0, maxPathHeight: 0 }
  tensionTimeMs: number
  angle: number = 0 // угол в радианах
  startAngle // угол в радианах
  maxAngle // угол в градусах
  minAngle // угол в градусах

  constructor(props: ArrowProps) {
    super({
      id: props.id,
      context: props.context,
      position: { ...props.startPosition },
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
    })

    this.speed = props.speed
    this.tensionTimeMs = props.tensionTimeMs
    this.startPosition = props.startPosition
    this.startAngle = props.startAngle
    this.maxAngle = props.maxAngle
    this.minAngle = props.minAngle
    this.arrowPath = getArrowPath(this.context, this.startPosition, this.startAngle, this.maxAngle, this.tensionTimeMs)
    this.arrowImg.src = arrow
  }

  public update(delta: number) {
    this.position = getNextPosition(this.startPosition, this.position.x, this.arrowPath, delta, this.speed)
    this.angle = getNextAngle(this.startPosition.x, this.position.x, this.arrowPath.maxPathLength, this.startAngle)

    // TODO: Потом должно работать за счет отдельной реализации колизии
    // Удаляем стрелу по достижению границ карты
    if (this.position.x > this.context.canvas.clientWidth || this.position.y > this.context.canvas.clientWidth) {
      config.objects.arrow = null
    }
  }

  public render() {
    this.context.save() // сохраняем текущее состояние Canvas
    this.context.translate(this.position.x, this.position.y) // настраиваем точку вращения (центр объекта)
    this.context.rotate(this.angle)
    // рисуем изображение так, чтобы его центр совпал с (0,0) — точкой вращения стрелы
    // по дефолту drawImage ставит левый верхний угол картинки в заданную точку, поэтому смещаем на половину размера
    this.context.drawImage(this.arrowImg, -this.imgWidth / 2, -this.imgHeight / 2, this.imgWidth, this.imgHeight)
    this.context.restore() // восстанавливаем состояние (отменяем translate, rotate)
  }
}
