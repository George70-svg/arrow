import { initializeObjects } from '@entities/config/gameConfig.ts'
import { render } from '@entities/utils/render.ts'
//import controller from '@entities/game/Conroller.ts'

export class Game {
  private context: CanvasRenderingContext2D | null = null
  private boundLoop = this.loop.bind(this)
  frameCb?: number
  lastTimestamp = 0

  constructor(context: CanvasRenderingContext2D | null) {
    this.context = context
  }

  private loop(timestamp: number) {
    //console.log('loop')
    if (!this.context) {
      throw new Error("Can't find a context")
    }

    const delta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.context.clearRect(0, 0, 1200, 650) // Очистка холста
    render(delta)

    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public start() {
    //controller
    initializeObjects(this.context)
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }
}
