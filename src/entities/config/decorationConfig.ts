import { Object } from '@entities/objects/Object.ts'
import groundImg from '@/assets/images/environment/ground.png'
import itemsImg from '@/assets/images/environment/items.png'
import config from '@entities/config/gameConfig.ts'

export const initializeDecoration = (context: CanvasRenderingContext2D) => {
  createLand(context)
  createTown(context)
  createWall(context)
  createField(context)
}

// создаем объекты земли
const createLand = (context: CanvasRenderingContext2D) => {
  for (let i = -1; i <= 25; i++) {
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

  // стена
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX, y: startY - 185 },
      framePosition: { x: 1055, y: 498 },
      imgWidth: 56,
      imgHeight: 295,
      frameWidth: 56,
      frameHeight: 295,
      sprite: itemsImg,
    }),
  )

  // флаг
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 43, y: startY - 186 },
      framePosition: { x: 1133, y: 30 },
      imgWidth: 69,
      imgHeight: 62,
      frameWidth: 69,
      frameHeight: 62,
      sprite: itemsImg,
    }),
  )
}

// создаем горор
const createTown = (context: CanvasRenderingContext2D) => {
  const startX = 15
  const startY = config.height - 124

  // фонарь
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX - 25, y: startY - 69 },
      framePosition: { x: 1052, y: 324 },
      imgWidth: 50,
      imgHeight: 163,
      frameWidth: 50,
      frameHeight: 163,
      sprite: itemsImg,
    }),
  )

  // колодец
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX, y: startY },
      framePosition: { x: 21, y: 162 },
      imgWidth: 91,
      imgHeight: 97,
      frameWidth: 91,
      frameHeight: 97,
      sprite: itemsImg,
    }),
  )

  // прилавок
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 150, y: startY },
      framePosition: { x: 1125, y: 114 },
      imgWidth: 142,
      imgHeight: 95,
      frameWidth: 130,
      frameHeight: 90,
      sprite: itemsImg,
    }),
  )

  // мешок
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 100, y: startY + 59 },
      framePosition: { x: 511, y: 221 },
      imgWidth: 31,
      imgHeight: 35,
      frameWidth: 31,
      frameHeight: 35,
      sprite: itemsImg,
    }),
  )

  // доска
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 300, y: startY + 30 },
      framePosition: { x: 1144, y: 247 },
      imgWidth: 70,
      imgHeight: 64,
      frameWidth: 70,
      frameHeight: 64,
      sprite: itemsImg,
    }),
  )
}

// создаем поле
const createField = (context: CanvasRenderingContext2D) => {
  const startX = 500
  const startY = config.height - 95

  // трава
  for (let i = 0; i <= 15; i++) {
    config.decorations.push(
      new Object({
        context: context,
        id: crypto.randomUUID(),
        startPosition: { x: startX - 50 + 90 * i, y: startY + 50 },
        framePosition: { x: 387, y: 497 },
        imgWidth: 87,
        imgHeight: 15,
        frameWidth: 87,
        frameHeight: 15,
        sprite: itemsImg,
      }),
    )
  }

  // подсолнух
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 600, y: startY },
      framePosition: { x: 868, y: 256 },
      imgWidth: 95,
      imgHeight: 69,
      frameWidth: 95,
      frameHeight: 69,
      sprite: itemsImg,
    }),
  )

  // подсолнух
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 800, y: startY },
      framePosition: { x: 868, y: 256 },
      imgWidth: 95,
      imgHeight: 69,
      frameWidth: 95,
      frameHeight: 69,
      sprite: itemsImg,
    }),
  )

  // пугало
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 700, y: startY - 29 },
      framePosition: { x: 703, y: 227 },
      imgWidth: 67,
      imgHeight: 95,
      frameWidth: 67,
      frameHeight: 95,
      sprite: itemsImg,
    }),
  )

  // большое сено
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 500, y: startY + 10 },
      framePosition: { x: 189, y: 251 },
      imgWidth: 99,
      imgHeight: 60,
      frameWidth: 66,
      frameHeight: 40,
      sprite: itemsImg,
    }),
  )

  // куст
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 920, y: startY + 25 },
      framePosition: { x: 575, y: 569 },
      imgWidth: 98,
      imgHeight: 42,
      frameWidth: 98,
      frameHeight: 42,
      sprite: itemsImg,
    }),
  )

  // среднее дерево
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 1000, y: startY - 75 },
      framePosition: { x: 690, y: 470 },
      imgWidth: 124,
      imgHeight: 141,
      frameWidth: 124,
      frameHeight: 141,
      sprite: itemsImg,
    }),
  )

  // большое дерево
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 1100, y: startY - 100 },
      framePosition: { x: 832, y: 443 },
      imgWidth: 152,
      imgHeight: 168,
      frameWidth: 152,
      frameHeight: 168,
      sprite: itemsImg,
    }),
  )

  // куст
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 1100, y: startY + 25 },
      framePosition: { x: 355, y: 569 },
      imgWidth: 55,
      imgHeight: 42,
      frameWidth: 55,
      frameHeight: 42,
      sprite: itemsImg,
    }),
  )

  // куст
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 1220, y: startY + 25 },
      framePosition: { x: 455, y: 569 },
      imgWidth: 98,
      imgHeight: 42,
      frameWidth: 98,
      frameHeight: 42,
      sprite: itemsImg,
    }),
  )

  // большое дерево
  config.decorations.push(
    new Object({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: startX + 1250, y: startY - 100 },
      framePosition: { x: 832, y: 443 },
      imgWidth: 152,
      imgHeight: 168,
      frameWidth: 152,
      frameHeight: 168,
      sprite: itemsImg,
    }),
  )
}
