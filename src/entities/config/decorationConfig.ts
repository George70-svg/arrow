import { Object } from '@entities/objects/Object.ts'
import groundImg from '@/assets/images/environment/ground.png'
import itemsImg from '@/assets/images/environment/items.png'
import config from '@entities/config/gameConfig.ts'

export const initializeDecoration = (context: CanvasRenderingContext2D) => {
  createLand(context)
  createWall(context)
}

// создаем объекты земли
const createLand = (context: CanvasRenderingContext2D) => {
  for (let i = -1; i <= 20; i++) {
    config.decorations.push(
      new Object({
        context: context,
        id: crypto.randomUUID(),
        startPosition: { x: 90 * i, y: config.height - 35 },
        framePosition: { x: 0, y: 380 },
        imgWidth: 100,
        imgHeight: 35,
        frameWidth: 100,
        frameHeight: 35,
        sprite: groundImg,
      }),
    )
  }
}

// создаем стену
const createWall = (context: CanvasRenderingContext2D) => {
  const startX = 400
  const startY = config.height - 140

  // часть ворот
  for (let i = 0; i <= 3; i++) {
    config.decorations.push(
      new Object({
        context: context,
        id: crypto.randomUUID(),
        startPosition: { x: startX, y: startY + 70 - 31 * i },
        framePosition: { x: 254, y: 88 },
        imgWidth: 60,
        imgHeight: 39,
        frameWidth: 68,
        frameHeight: 39,
        sprite: itemsImg,
      }),
    )
  }

  // малый камень
  for (let i = 0; i <= 5; i++) {
    config.decorations.push(
      new Object({
        context: context,
        id: crypto.randomUUID(),
        startPosition: { x: startX, y: startY - 25 - 25 * i },
        framePosition: { x: 934, y: 368 },
        imgWidth: 21,
        imgHeight: 16,
        frameWidth: 21,
        frameHeight: 16,
        sprite: itemsImg,
      }),
    )
  }

  // малый камень
  for (let i = 0; i <= 5; i++) {
    config.decorations.push(
      new Object({
        context: context,
        id: crypto.randomUUID(),
        startPosition: { x: startX + 40, y: startY - 7 - 27 * i },
        framePosition: { x: 934, y: 368 },
        imgWidth: 21,
        imgHeight: 16,
        frameWidth: 21,
        frameHeight: 16,
        sprite: itemsImg,
      }),
    )
  }

  // средний камень
  for (let i = 0; i <= 5; i++) {
    config.decorations.push(
      new Object({
        context: context,
        id: crypto.randomUUID(),
        startPosition: { x: startX + 25, y: startY - 32 - 27 * i },
        framePosition: { x: 816, y: 355 },
        imgWidth: 33,
        imgHeight: 29,
        frameWidth: 33,
        frameHeight: 29,
        sprite: itemsImg,
      }),
    )
  }

  // большой камень
  for (let i = 0; i <= 5; i++) {
    config.decorations.push(
      new Object({
        context: context,
        id: crypto.randomUUID(),
        startPosition: { x: startX, y: startY - 40 - 26 * i },
        framePosition: { x: 872, y: 335 },
        imgWidth: 48,
        imgHeight: 50,
        frameWidth: 48,
        frameHeight: 50,
        sprite: itemsImg,
      }),
    )
  }
}

// первый ящик
/*new Object({
  context: context,
  id: crypto.randomUUID(),
  startPosition: { x: startX, y: startY + 50 },
  framePosition: { x: 42, y: 20 },
  imgWidth: 45,
  imgHeight: 45,
  frameWidth: 45,
  frameHeight: 45,
  sprite: itemsImg,
})*/
