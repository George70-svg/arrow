import config from '@entities/config/gameConfig.ts'
import type { ArrowPath, Coordinate, RGBObject } from '@entities/types.ts'

export const getNextPosition = (
  startPosition: Coordinate,
  currentX: number,
  arrowPath: ArrowPath,
  delta: number,
  speed: number,
): Coordinate => {
  // angleCoefficient ~ от 0.9 до 0.18 (результат деления текущего угла на максимальный)
  const coeff = arrowPath.angleCoefficient < config.arrow.angleStartCoeff ? config.arrow.angleStartCoeff : arrowPath.angleCoefficient
  const a = -arrowPath.maxPathHeight / Math.pow(arrowPath.maxPathLength - startPosition.x, 2)
  const x = currentX + speed * (delta / coeff)
  const y = startPosition.y - a * (x - startPosition.x) * (currentX - arrowPath.maxPathLength)

  return { x, y }
}

export const getNextAngle = (startX: number, currentX: number, maxWidth: number, startAngle: number) => {
  const dx = (currentX - startX) / (maxWidth - startX)
  return startAngle - startAngle * dx * 2
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

export const getArrowPath = (
  context: CanvasRenderingContext2D,
  startPosition: Coordinate,
  startAngle: number,
  maxAngle: number,
  tensionTimeMs: number,
): ArrowPath => {
  const tensionMs = tensionTimeMs > config.arrow.startTensionTimeMs ? tensionTimeMs / 1000 : 1
  const angleCoefficient = normalizeRadianAngle(startAngle) / maxAngle
  const maxPathLength = (context.canvas.clientWidth * config.arrow.widthCoeff * tensionMs) / angleCoefficient + startPosition.x
  const maxPathHeight = context.canvas.clientHeight * config.arrow.heightCoeff * tensionMs * angleCoefficient

  return {
    angleCoefficient,
    maxPathLength,
    maxPathHeight,
  }
}

export const lerpColor = (rgbColor1: RGBObject, rgbColor2: RGBObject, coeff: number) => {
  const red = rgbColor1.red + coeff * (rgbColor2.red - rgbColor1.red)
  const green = rgbColor1.green + coeff * (rgbColor2.green - rgbColor1.green)
  const blue = rgbColor1.blue + coeff * (rgbColor2.blue - rgbColor1.blue)
  return `rgba(${red}, ${green}, ${blue}, 1)`
}
