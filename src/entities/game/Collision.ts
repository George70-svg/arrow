import type { Shape } from '@entities/objects/Shape.ts'
import type { CollisionMode } from '@entities/types.ts'
import config from '@entities/config/gameConfig.ts'

export class Collision {
  constructor() {}

  checkCollision(shape1: Shape, shape2: Shape, mode: CollisionMode): boolean {
    const shape1Coordinates = this.getShapeCoordinates(shape1)
    const shape2Coordinates = this.getShapeCoordinates(shape2)

    // Проверяю есть ли горизантольное пересечение
    const hasHorizontalCollision = this.isIntervalsIntersect(
      [shape1Coordinates.xMin, shape1Coordinates.xMax],
      [shape2Coordinates.xMin, shape2Coordinates.xMax],
    )

    // Проверяю есть ли вертикальное пересечение
    const hasVerticalCollision = this.isIntervalsIntersect(
      [shape1Coordinates.yMin, shape1Coordinates.yMax],
      [shape2Coordinates.yMin, shape2Coordinates.yMax],
    )

    // В зависимости от режима выбираем правило оценки пересечений
    if (mode === 'strict') {
      return hasHorizontalCollision && hasVerticalCollision
    } else {
      return hasHorizontalCollision || hasVerticalCollision
    }
  }

  checkFrameCollision(shape: Shape, strategy: 'all' | 'noTop' | 'noBottom') {
    const frameWidth = config.width
    const frameHeight = config.height

    const shapeCoordinates = this.getShapeCoordinates(shape)

    const hasOutOfMaxHorizontal = shapeCoordinates.xMax >= frameWidth
    const hasOutOfMinHorizontal = shapeCoordinates.xMin <= 0
    const hasOutOfMaxVertical = shapeCoordinates.yMax >= frameHeight
    const hasOutOfMinVertical = shapeCoordinates.yMin <= 0

    if (strategy === 'noTop') {
      return hasOutOfMaxHorizontal || hasOutOfMinHorizontal || hasOutOfMaxVertical
    } else if (strategy === 'noBottom') {
      return hasOutOfMaxHorizontal || hasOutOfMinHorizontal || hasOutOfMinVertical
    } else {
      return hasOutOfMaxHorizontal || hasOutOfMinHorizontal || hasOutOfMaxVertical || hasOutOfMinVertical
    }
  }

  getShapeCoordinates(shape: Shape) {
    return {
      xMin: shape.position.x,
      xMax: shape.position.x + shape.imgWidth,
      yMin: shape.position.y,
      yMax: shape.position.y + shape.imgHeight,
    }
  }

  isIntervalsIntersect(range1: [number, number], range2: [number, number]) {
    const [x1min, x1max] = range1
    const [x2min, x2max] = range2

    return Math.max(x1min, x2min) < Math.min(x1max, x2max)
  }
}
