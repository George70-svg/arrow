import config, { initializeGame } from '@entities/config/gameConfig.ts'
import { render, update, deleteObjects } from '@entities/utils/utils.ts'
import { Controller } from '@entities/game/Conroller.ts'

type GameProps = {
  context: CanvasRenderingContext2D | null
  backgroundContext: CanvasRenderingContext2D | null
  isPause: boolean
  onPauseChange: (value: boolean) => void
  setScore: (value: number) => void
}

export class Game {
  protected context: CanvasRenderingContext2D | null = null
  protected backgroundContext: CanvasRenderingContext2D | null = null
  private boundLoop = this.loop.bind(this)
  private onPauseChange: (value: boolean) => void
  private setScore: (value: number) => void
  frameCb?: number
  lastTimestamp = 0
  score = 0
  isPause: boolean

  constructor(props: GameProps) {
    this.context = props.context
    this.backgroundContext = props.backgroundContext
    this.isPause = props.isPause
    this.onPauseChange = props.onPauseChange
    this.setScore = props.setScore
  }

  private controller = new Controller()

  private loop(timestamp: number) {
    if (!this.context || !this.backgroundContext) {
      throw new Error("Can't find a context")
    }

    const delta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.context.clearRect(0, 0, config.width, config.height) // Очистка холста
    update(delta)
    render()
    deleteObjects()

    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public start() {
    this.isPause = false
    this.onPauseChange(false)
    initializeGame(this.context, this.backgroundContext, this.controller, this.addScore)
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public pause() {
    if (this.isPause) return

    if (this.frameCb) {
      this.onPauseChange(true)
      cancelAnimationFrame(this.frameCb)
      this.frameCb = undefined
    }
  }

  public play() {
    if (!this.isPause) return
    this.onPauseChange(false)
    this.lastTimestamp = performance.now()
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  addScore = (value: number) => {
    console.log('value', value)
    console.log('this.score1', this.score)
    this.score = this.score + value
    console.log('this.score2', this.score)
    this.setScore(this.score)
  }

  public togglePause() {
    if (this.isPause) {
      this.play()
      this.isPause = false
    } else {
      this.pause()
      this.isPause = true
    }
  }
}
