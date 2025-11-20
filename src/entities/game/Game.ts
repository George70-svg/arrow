import config, { initializeGame } from '@entities/config/gameConfig.ts'
import { render, update, deleteObjects } from '@entities/utils/utils.ts'

export class Game {
  protected context: CanvasRenderingContext2D | null = null
  protected backgroundContext: CanvasRenderingContext2D | null = null
  private boundLoop = this.loop.bind(this)
  frameCb?: number
  lastTimestamp = 0
  isPause = false

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
    update(delta)
    render()
    //checkCollision()
    deleteObjects()

    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public start() {
    initializeGame(this.context, this.backgroundContext)
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public pause() {
    if (this.frameCb) {
      this.isPause = true
      cancelAnimationFrame(this.frameCb)
      this.frameCb = undefined
    }
  }

  public play() {
    this.isPause = false
    this.lastTimestamp = performance.now()
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public togglePause() {
    if (this.isPause) {
      this.play()
    } else {
      this.pause()
    }
  }

  public get pauseStatus() {
    return this.isPause
  }
}
