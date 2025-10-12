import { config, initializeObjects } from '@entities/config/gameConfig.ts'
import { render } from '@entities/utils/render.ts'
import { update } from '@entities/utils/update.ts'

export class Game {
  private context: CanvasRenderingContext2D | null = null
  private boundLoop = this.loop.bind(this)
  frameCb?: number
  lastTimestamp = 0

  constructor(context: CanvasRenderingContext2D | null) {
    this.context = context
  }

  private loop(timestamp: number) {
    if (!this.context) {
      throw new Error("Can't find a context")
    }

    const delta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.context.clearRect(0, 0, config.width, config.height) // Очистка холста
    update(delta)
    render()

    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public start() {
    initializeObjects(this.context)
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }
}
