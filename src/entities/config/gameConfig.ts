import { initializeDecoration } from '@entities/config/decorationConfig.ts'
import { initializeClouds } from '@entities/config/cloudConfig.ts'
import type { Shape } from '@entities/objects/Shape.ts'
import type { Controller } from '@entities/game/Conroller.ts'
import { Player } from '../objects/Player.ts'
import { Bow } from '@entities/objects/Bow.ts'
import { Sun } from '@entities/objects/Sun.ts'
import { DayPeriod } from '@entities/game/DayPeriod.ts'
import { Background } from '@entities/objects/Background.ts'
import { create, enemies } from '@entities/config/enemyConfig.ts'

// Важно что background, decorations и objects в отдельных объектах
// Это влияет на поряд отрисовки на канвасе, потому что потом идет деструктуризация для общего render()
export type GameConfig = {
  width: number
  height: number
  showObjectRect: boolean
  dayPeriod: DayPeriod | null
  objects: {
    background: Shape[]
    decorations: Shape[]
    clouds: Shape[]
    player: Shape[]
    arrows: Shape[]
    enemies: Shape[]
  }
  arrow: {
    speed: number
    heightCoeff: number
    widthCoeff: number
    angleStartCoeff: number
    startTensionTimeMs: number
    maxTensionTimeMs: number
    trajectoryLengthCoeff: number
  }
}

const config: GameConfig = {
  width: 0,
  height: 0,
  showObjectRect: true,
  dayPeriod: null,
  objects: {
    background: [],
    decorations: [],
    clouds: [],
    player: [],
    arrows: [],
    enemies: [],
  },
  arrow: {
    speed: 0.6,
    heightCoeff: 3, // коэффициент высоты полета
    widthCoeff: 0.4, // коэффициент длины полета
    angleStartCoeff: 0.4, // начальный коэффициент результат деления текущего угла на максимальный
    startTensionTimeMs: 400, // время после которого срабатывает расчет натяжения (мс)
    maxTensionTimeMs: 1500, // максимальное время натяжение, после которого оно уже не влияет на траекторию (мс)
    trajectoryLengthCoeff: 1, // коэффициент длины дуги траектории, т.е. сколько дуги отображаем (0 - 1.0)
  },
}

export const initializeGame = (
  context: CanvasRenderingContext2D | null,
  backgroundContext: CanvasRenderingContext2D | null,
  controller: Controller,
  setScore: (score: number) => void,
) => {
  if (!context || !backgroundContext) {
    return
  }

  // Запускаем класс с расчетом параметров смены дня/ночи
  config.dayPeriod = new DayPeriod({
    speed: 0.00055,
    center: { x: config.width / 2, y: config.height / 2 },
    radiusX: config.width / 2 + 50,
    radiusY: config.height / 2 - 50,
  })

  config.objects.background = [
    new Background({
      id: crypto.randomUUID(),
      context: context,
      backgroundContext: backgroundContext,
      dayPeriod: config.dayPeriod,
    }),
    new Sun({
      context: backgroundContext,
      id: crypto.randomUUID(),
      imgWidth: 45,
      imgHeight: 45,
      dayPeriod: config.dayPeriod,
    }),
  ]

  config.objects.player = [
    new Player({
      context: context,
      id: 'player',
      startPosition: { x: 140, y: config.height - 30 },
      imgWidth: 75,
      imgHeight: 100,
      speed: 0.3,
      startDirection: 'right',
      controller,
    }),
    new Bow({
      context: context,
      id: crypto.randomUUID(),
      imgWidth: 45,
      imgHeight: 45,
      startAngle: -0.75,
      maxAngle: -85,
      minAngle: -20,
      controller,
    }),
  ]

  config.objects.enemies.push(create['zombie'](context, config.width, config.height - 28, setScore))

  initializeClouds(backgroundContext)
  initializeDecoration(context)

  setInterval(() => {
    if (config.objects.enemies.length > 5) {
      return
    }

    const n = Math.floor(Math.random() * 3)
    const enemyType = enemies[n]
    const enemyCallback = create[enemyType]
    const enemy = enemyCallback(context, config.width, config.height - 28, setScore)
    config.objects.enemies.push(enemy)
  }, 5000)
}

export default config
