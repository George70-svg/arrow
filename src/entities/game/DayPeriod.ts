import type { Coordinate } from '@entities/types.ts'

type DayPeriodProps = {
  speed: number
  radiusX: number
  radiusY: number
  center: Coordinate
}

export class DayPeriod {
  angle: number = Math.PI
  speed: number
  center: Coordinate
  radiusX: number
  radiusY: number

  constructor(props: DayPeriodProps) {
    this.center = { ...props.center }
    this.speed = props.speed
    this.radiusX = props.radiusX
    this.radiusY = props.radiusY
  }

  public angleCoeff() {
    const sunPos = this.sunPosition()
    const minY = this.center.y - this.radiusY // верх орбиты
    const maxY = this.center.y + this.radiusY // низ орбиты
    return 1 - (sunPos.y - minY) / (maxY - minY)
  }

  public sunPosition(): Coordinate {
    return {
      x: this.center.x + this.radiusX * Math.cos(this.angle),
      y: this.center.y + this.radiusY * Math.sin(this.angle),
    }
  }

  public moonPosition(): Coordinate {
    return {
      x: this.center.x + this.radiusX * Math.cos(this.angle + Math.PI),
      y: this.center.y + this.radiusY * Math.sin(this.angle + Math.PI),
    }
  }

  public update() {
    this.angle += this.speed

    if (this.angle > 2 * Math.PI) {
      this.angle = 0
    }
  }
}
