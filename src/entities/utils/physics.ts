import type { ArrowPath, Coordinate } from '@entities/types.ts'
import config from '@entities/config/gameConfig.ts'

/*const g = 9.81 / 1000000

export const getNextPosition = (startPosition: Coordinate, currentPosition: Coordinate, speed: number, angle: number): number => {
  return -currentPosition.x * Math.tan(angle) - (g * Math.pow(currentPosition.x, 2)) / (2 * Math.pow(speed * Math.cos(angle), 2))
}*/

export const getNextPositionY = (
  startPosition: Coordinate,
  currentX: number,
  arrowPath: ArrowPath,
  delta: number,
  speed: number,
): Coordinate => {
  // angleCoefficient ~ от 0.9 до 0.18 (результат деления текущего угла на максимальный)
  // TODO: Магическое число
  const coeff = arrowPath.angleCoefficient < 0.4 ? 0.4 : arrowPath.angleCoefficient
  const a = (-4 * arrowPath.maxPathHeight) / Math.pow(arrowPath.maxPathLength - startPosition.x, 2)
  const x = currentX + speed * (delta / coeff)
  const y = startPosition.y - a * (x - startPosition.x) * (currentX - arrowPath.maxPathLength)

  return { x, y }
}

export const getNextAngle = (currentX: number, maxWidth: number, startAngle: number) => {
  return ((startAngle * currentX) / maxWidth) * 2
}

// Возвращает угол в радианах (от −π до π, т.е. −3.14159 до +3.14159)
export const getAngleRadian = (startPosition: Coordinate, endPosition: Coordinate) => {
  const a = endPosition.y - startPosition.y
  const b = endPosition.x - startPosition.x
  return Math.atan2(a, b)
}

// Преобразует угол из радиан в градусы
export const normalizeRadianAngle = (angle: number) => {
  return angle * (180 / Math.PI)
}

export const getArrowPath = (context: CanvasRenderingContext2D, startAngle: number, maxAngle: number): ArrowPath => {
  const angleCoefficient = normalizeRadianAngle(startAngle) / maxAngle
  const maxPathLength = (context.canvas.clientWidth * config.arrow.widthCoeff) / angleCoefficient
  const maxPathHeight = context.canvas.clientWidth * config.arrow.heightCoeff * angleCoefficient

  return {
    angleCoefficient,
    maxPathLength,
    maxPathHeight,
  }
}
