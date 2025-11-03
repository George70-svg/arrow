import type { Shape } from '@entities/objects/Shape.ts'
import { Player } from '../objects/Player.ts'
import { Bow } from '@entities/objects/Bow.ts'
import { Sun } from '@entities/objects/Sun.ts'
import { initializeDecoration } from '@entities/config/decorationConfig.ts'
import { DayPeriod } from '@entities/game/DayPeriod.ts'
import { Background } from '@entities/objects/Background.ts'

type Config = {
  width: number
  height: number
  objects: Record<string, Shape | null>
  decorations: Shape[]
  dayPeriod: DayPeriod | null
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

const config: Config = {
  width: 0,
  height: 0,
  objects: {},
  decorations: [],
  dayPeriod: null,
  arrow: {
    speed: 0.25,
    heightCoeff: 4, // коэффициент высоты полета
    widthCoeff: 0.4, // коэффициент длины полета
    angleStartCoeff: 0.4, // начальный коэффициент результат деления текущего угла на максимальный
    startTensionTimeMs: 400, // время после которого срабатывает расчет натяжения (мс)
    maxTensionTimeMs: 1500, // максимальное время натяжение, после которого оно уже не влияет на траекторию (мс)
    trajectoryLengthCoeff: 1, // коэффициент длины дуги траектории, т.е. сколько дуги отображаем (0 - 1.0)
  },
}

export const initializeGame = (context: CanvasRenderingContext2D | null, backgroundContext: CanvasRenderingContext2D | null) => {
  if (!context || !backgroundContext) {
    return
  }

  // Запускаем класс с расчетом параметров смены дня/ночи
  config.dayPeriod = new DayPeriod({
    speed: 0.0025,
    center: { x: config.width / 2, y: config.height / 2 },
    radiusX: config.width / 2 + 50,
    radiusY: config.height / 2 - 50,
  })

  config.objects = {
    player: new Player({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: 140, y: config.height - 32 },
      imgWidth: 150,
      imgHeight: 150,
      speed: 0.15,
      startDirection: 'right',
    }),
    bow: new Bow({
      context: context,
      id: crypto.randomUUID(),
      startPosition: { x: 170, y: config.height - 70 },
      imgWidth: 45,
      imgHeight: 45,
      speed: 0.15,
      startDirection: 'right',
      startAngle: -0.75,
      maxAngle: -85,
      minAngle: -20,
    }),
    background: new Background({
      id: crypto.randomUUID(),
      context: context,
      backgroundContext: backgroundContext,
      dayPeriod: config.dayPeriod,
    }),
    sun: new Sun({
      context: backgroundContext,
      id: crypto.randomUUID(),
      imgWidth: 45,
      imgHeight: 45,
      dayPeriod: config.dayPeriod,
    }),
    arrow: null,
  }

  initializeDecoration(context)
}

export default config
