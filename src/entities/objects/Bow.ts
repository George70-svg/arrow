// TODO: Плохое решение импортировать конфиг для класса, внешняя зависимость
import config from '@entities/config/gameConfig.ts'
import { createArrow } from '@entities/utils/utils.ts'
import { getAngleRadian, getArrowPath, getNextPosition, normalizeRadianAngle } from '@entities/utils/physics.ts'
import { Collision } from '@entities/game/Collision.ts'
import type { Controller } from '@entities/game/Conroller.ts'
import { Shape } from '@entities/objects/Shape.ts'
import type { Player } from '@entities/objects/Player.ts'
import type { Coordinate } from '@entities/types.ts'
//import { ObjectRect } from '@entities/game/ObjectRect.ts'
import fullBow from '@/assets/images/bow/fullBow.png'
import tensionBow from '@/assets/images/bow/tensionBow.png'
import bow from '@/assets/images/bow/bow.png'

type BowProps = {
  id: string
  context: CanvasRenderingContext2D
  imgWidth: number
  imgHeight: number
  startAngle: number // начальный угол направления лука (в радианах)
  maxAngle: number // максимальный угол направения лука (в градусах)
  minAngle: number // минимальный угол направения лука (в градусах)
  controller: Controller
}

export class Bow extends Shape {
  currentBowImg = new Image()
  angle: number = 0 // угол в радианах
  maxAngle = 0 // угол в градусах
  minAngle = 0 // угол в градусах
  trajectoryColor = '#ffffff'
  mousePressedTime = 0
  controller: Controller

  constructor(props: BowProps) {
    super({
      id: props.id,
      context: props.context,
      position: { x: 0, y: 0 },
      imgWidth: props.imgWidth,
      imgHeight: props.imgHeight,
      markForDelete: false,
    })

    this.position = { x: 0, y: 0 }
    this.angle = props.startAngle
    this.minAngle = props.minAngle
    this.maxAngle = props.maxAngle
    this.currentBowImg.src = fullBow
    this.controller = props.controller
  }

  //private rect = new ObjectRect(this.context)
  private collision = new Collision()

  private shot(mousePressedTime: number) {
    if (!config.objects.arrows.length) {
      createArrow(this.context, this.position, mousePressedTime, this.angle, this.minAngle, this.maxAngle)
    }
  }

  get player() {
    return config.objects.player.find((shape) => shape.id === 'player') as Player
  }

  get showBow() {
    // показываем лук только при движении игрока вправо
    return this.player.direction === 'right'
  }

  public update() {
    if (!this.showBow) {
      return
    }

    const pressedKeys = this.controller.getPressedKeys()
    const mouseCoordinates = this.controller.getMouseCoordinates()
    const mousePressedTime = this.controller.getMousePressedTime()

    if (this.player) {
      this.position = { x: this.player.position.x + 10, y: this.player.position.y - 40 }
    }

    if (!config.objects.arrows.length) {
      this.currentBowImg.src = fullBow
    } else {
      this.currentBowImg.src = bow
    }

    if (mouseCoordinates) {
      const angle = getAngleRadian(this.position, mouseCoordinates)
      const normalAngle = normalizeRadianAngle(angle)

      if (normalAngle > this.maxAngle && normalAngle < this.minAngle) {
        this.angle = getAngleRadian(this.position, mouseCoordinates)
      }

      if (mousePressedTime && mousePressedTime > config.arrow.startTensionTimeMs) {
        this.mousePressedTime = mousePressedTime
        this.currentBowImg.src = tensionBow
      } else {
        this.mousePressedTime = 0
      }
    }

    if (!pressedKeys['LBM'] && mousePressedTime && mousePressedTime > 0) {
      this.shot(mousePressedTime)

      // сбрасываю таймер именно здесь, поскольку условие - кнопка отпущена и таймер идет
      // если сбросить таймер на момент отпускания кнопки, то условие бессмысленно
      // поэтому сначал нужно выполнить метод и только потом сбросить таймер
      this.controller.resetTimer()
    }
  }

  private drawTrajectory(mousePressedTime: number) {
    const step = 10
    const pointRadius = 1
    const points: Coordinate[] = []
    const arrowPath = getArrowPath(this.context, this.position, this.angle, this.maxAngle, mousePressedTime)

    // Если нужно изменить длинну отображаемой траектории, то нужно влиять на trajectoryLengthCoeff
    const trajectoryLength = arrowPath.maxPathLength * config.arrow.trajectoryLengthCoeff

    for (let x = this.position.x; x <= trajectoryLength; x += step) {
      const point = getNextPosition(this.position, x, arrowPath, 0, 0.5)

      if (this.collision.checkWallCollision({ x: point.x, y: point.y, width: 1, height: 1 }, 'strict')) {
        break
      }

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
    if (!this.showBow) {
      return
    }

    if (this.mousePressedTime && this.mousePressedTime > config.arrow.startTensionTimeMs) {
      this.drawTrajectory(this.mousePressedTime)
    }

    this.context.save() // сохраняем текущее состояние Canvas
    this.context.translate(this.position.x, this.position.y) // настраиваем точку вращения (центр объекта)
    this.context.rotate(this.angle)
    // рисуем изображение так, чтобы его центр совпал с (0,0) — точкой вращения стрелы
    // по дефолту drawImage ставит левый верхний угол картинки в заданную точку, поэтому смещаем на половину размера

    //this.rect.draw(-this.imgWidth / 2, -this.imgHeight / 2, this.imgWidth, this.imgHeight)

    this.context.drawImage(this.currentBowImg, -this.imgWidth / 2, -this.imgHeight / 2, this.imgWidth, this.imgHeight)
    this.context.restore() // восстанавливаем состояние (отменяем translate, rotate)
  }
}
