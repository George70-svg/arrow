import type { CollisionMode, ShapeParams } from '@entities/types.ts'
import config from '@entities/config/gameConfig.ts'

export class Collision {
  constructor() {}

  checkCollision(shape1: ShapeParams, shape2: ShapeParams, mode: CollisionMode): boolean {
    const shape1XMin = shape1.x
    const shape1XMax = shape1.x + shape1.width
    const shape1YMin = shape1.y
    const shape1YMax = shape1.y + shape1.height

    const shape2XMin = shape2.x
    const shape2XMax = shape2.x + shape2.width
    const shape2YMin = shape2.y
    const shape2YMax = shape2.y + shape2.height

    // Проверяю есть ли горизантольное пересечение
    const hasHorizontalCollision = this.isIntervalsIntersect(shape1XMin, shape1XMax, shape2XMin, shape2XMax)

    // Проверяю есть ли вертикальное пересечение
    const hasVerticalCollision = this.isIntervalsIntersect(shape1YMin, shape1YMax, shape2YMin, shape2YMax)

    // В зависимости от режима выбираем правило оценки пересечений
    if (mode === 'strict') {
      return hasHorizontalCollision && hasVerticalCollision
    } else {
      return hasHorizontalCollision || hasVerticalCollision
    }
  }

  checkFrameCollision(shape: ShapeParams, strategy: 'all' | 'noTop' | 'noBottom' | 'startImageWithRightFrame' | 'endImage') {
    const frameWidth = config.width
    const frameHeight = config.height

    const xMin = shape.x
    const xMax = shape.x + shape.width
    const yMin = shape.y
    const yMax = shape.y + shape.height

    const hasOutOfMaxHorizontal = xMax > frameWidth
    const hasOutOfMinHorizontal = xMin < 0
    const hasOutOfMaxVertical = yMax > frameHeight
    const hasOutOfMinVertical = yMin < 0

    if (strategy === 'noTop') {
      return hasOutOfMaxHorizontal || hasOutOfMinHorizontal || hasOutOfMaxVertical
    } else if (strategy === 'noBottom') {
      return hasOutOfMaxHorizontal || hasOutOfMinHorizontal || hasOutOfMinVertical
    } else if (strategy === 'startImageWithRightFrame') {
      // когда расчет коллизи идет по левой границе картинки c правым краем экран
      return xMin >= frameWidth
    } else {
      return hasOutOfMaxHorizontal || hasOutOfMinHorizontal || hasOutOfMaxVertical || hasOutOfMinVertical
    }
  }

  // TODO: Дублирование логики
  checkWallCollision(shape: ShapeParams, mode: CollisionMode): boolean {
    const wall = config.objects.decorations.find((item) => item.id === 'wall')

    if (wall) {
      return this.checkCollision(
        { x: shape.x, y: shape.y, width: shape.width, height: shape.height },
        { x: wall.position.x, y: wall.position.y, width: wall.imgWidth, height: wall.imgHeight },
        mode,
      )
    }

    return false
  }

  // TODO: Дублирование логики
  checkArrowCollision(shape: ShapeParams) {
    const arrows = config.objects.arrows

    if (arrows.length !== 0) {
      for (const arrow of arrows) {
        if (arrow.markForDelete) {
          continue
        }

        const hasCollision = this.checkCollision(
          { x: shape.x, y: shape.y, width: shape.width, height: shape.height },
          {
            x: arrow.position.x,
            y: arrow.position.y,
            width: arrow.imgWidth,
            height: arrow.imgHeight,
          },
          'strict',
        )

        if (hasCollision) {
          arrow.setMarkForDelete()
          return true
        }
      }
    }

    return false
  }

  isIntervalsIntersect(min1: number, max1: number, min2: number, max2: number) {
    return Math.max(min1, min2) < Math.min(max1, max2)
  }
}
