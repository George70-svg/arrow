import config from '@entities/config/gameConfig.ts'
import controller from '@entities/game/Conroller.ts'
import { getAngleRadian, getArrowPath, getNextPosition, normalizeRadianAngle } from '@entities/utils/physics.ts'
import { Shape } from '@entities/objects/Shape.ts'
import type { Coordinate, Direction } from '@entities/types.ts'
import fullBow from '@/assets/images/bow/fullBow.png'
import { Arrow } from '@entities/objects/Arrow.ts'

type BowProps = {
  id: string
  context: CanvasRenderingContext2D
  imgWidth: number
  imgHeight: number
  startPosition: Coordinate
  startDirection: Direction
  speed: number // скорость движения объекта лука при перемещении
  startAngle: number // начальный угол направления лука (в радианах)
  maxAngle: number // максимальный угол направения лука (в градусах)
  minAngle: number // минимальный угол направения лука (в градусах)
}

export class Bow extends Shape {
  speed: number = 0
  direction: Direction = 'right'
  fullBowImg = new Image()
  angle: number = 0 // угол в радианах
  maxAngle = 0 // угол в градусах
  minAngle = 0 // угол в градусах
  trajectoryColor = '#454545'

  constructor(props: BowProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
    })

    this.speed = props.speed
    this.direction = props.startDirection
    this.angle = props.startAngle
    this.maxAngle = props.maxAngle
    this.minAngle = props.minAngle
    this.fullBowImg.src = fullBow
  }

  //TODO: Вынести настройку конфига, здесь метод для выстрела должен быть проще
  private shot(mousePressedTime: number) {
    if (!config.objects.arrow) {
      const startArrowPosition = { ...this.position }
      config.objects.arrow = new Arrow({
        id: crypto.randomUUID(),
        context: this.context,
        imgWidth: 45,
        imgHeight: 13,
        startPosition: startArrowPosition,
        speed: config.arrow.speed,
        tensionTimeMs: mousePressedTime,
        startAngle: this.angle,
        maxAngle: this.maxAngle,
        minAngle: this.minAngle,
      })
    }
  }

  public update(delta: number) {
    const pressedKeys = controller.getPressedKeys()
    const mouseCoordinates = controller.getMouseCoordinates()
    const mousePressedTime = controller.getMousePressedTime()
    const distance = this.speed * delta

    if (pressedKeys['KeyA']) {
      this.position.x -= distance
      this.direction = 'left'
    }

    if (pressedKeys['KeyD']) {
      this.position.x += distance
      this.direction = 'right'
    }

    if (mouseCoordinates) {
      const angle = getAngleRadian(this.position, mouseCoordinates)
      const normalAngle = normalizeRadianAngle(angle)

      if (normalAngle > this.maxAngle && normalAngle < this.minAngle) {
        this.angle = getAngleRadian(this.position, mouseCoordinates)
      }

      if (mousePressedTime && mousePressedTime > config.arrow.startTensionTimeMs) {
        this.drawTrajectory(delta, mousePressedTime)
      }
    }

    if (!pressedKeys['LBM'] && mousePressedTime && mousePressedTime > 0) {
      this.shot(mousePressedTime)

      // сбрасываю таймер именно здесь, поскольку условие - кнопка отпущена и таймер идет
      // если сбросить таймер на момент отпускания кнопки, то условие бессмысленно
      // поэтому сначал нужно выполнить метод и только потом сбросить таймер
      controller.resetTimer()
    }
  }

  private drawTrajectory(delta: number, mousePressedTime: number) {
    const step = 10
    const pointRadius = 1
    const points: Coordinate[] = []
    const arrowPath = getArrowPath(this.context, this.position, this.angle, this.maxAngle, mousePressedTime)

    // Если нужно изменить длинну отображаемой траектории, то нужно влиять на x <= arrowPath.maxPathLength
    for (let x = this.position.x; x <= arrowPath.maxPathLength; x += step) {
      const point = getNextPosition(this.position, x, arrowPath, delta, 0.5)
      points.push(point)
    }

    this.context.fillStyle = this.trajectoryColor

    for (const p of points) {
      this.context.beginPath()
      this.context.arc(p.x, p.y, pointRadius, 0, Math.PI * 2)
      this.context.fill()
    }
  }

  public render() {
    this.context.save() // сохраняем текущее состояние Canvas
    this.context.translate(this.position.x, this.position.y) // настраиваем точку вращения (центр объекта)
    this.context.rotate(this.angle)
    // рисуем изображение так, чтобы его центр совпал с (0,0) — точкой вращения стрелы
    // по дефолту drawImage ставит левый верхний угол картинки в заданную точку, поэтому смещаем на половину размера
    this.context.drawImage(this.fullBowImg, -this.imgWidth / 2, -this.imgHeight / 2, this.imgWidth, this.imgHeight)
    this.context.restore() // восстанавливаем состояние (отменяем translate, rotate)
  }
}
