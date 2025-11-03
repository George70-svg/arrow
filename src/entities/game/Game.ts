import config, { initializeGame } from '@entities/config/gameConfig.ts'
import { render, update } from '@entities/utils/utils.ts'

export class Game {
  protected context: CanvasRenderingContext2D | null = null
  protected backgroundContext: CanvasRenderingContext2D | null = null
  private boundLoop = this.loop.bind(this)
  frameCb?: number
  lastTimestamp = 0

  constructor(context: CanvasRenderingContext2D | null, backgroundContext: CanvasRenderingContext2D | null) {
    this.context = context
    this.backgroundContext = backgroundContext
  }

  private loop(timestamp: number) {
    if (!this.context || !this.backgroundContext) {
      throw new Error("Can't find a context")
    }

    const delta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.context.clearRect(0, 0, config.width, config.height) // Очистка холста
    this.backgroundContext.clearRect(0, 0, config.width, config.height) // Очистка холста
    update(delta)
    render()

    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public start() {
    initializeGame(this.context, this.backgroundContext)
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }
}
