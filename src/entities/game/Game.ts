import config, { initializeGame, resetGameConfig } from '@entities/config/gameConfig.ts'
import { render, update, deleteObjects } from '@entities/utils/utils.ts'
import { Controller } from '@entities/game/Conroller.ts'
import { Enemies } from '@entities/game/Enemies.ts'

type GameProps = {
  context: CanvasRenderingContext2D
  backgroundContext: CanvasRenderingContext2D
  isPause: boolean
  setPause: (value: boolean) => void
  setScore: (value: number) => void
  onGameOver: () => void
}

export class Game {
  protected context: CanvasRenderingContext2D
  protected backgroundContext: CanvasRenderingContext2D
  private boundLoop = this.loop.bind(this)
  private setPause: (value: boolean) => void
  protected setScore: (value: number) => void
  protected setGameOver: () => void
  private isGameOver = false
  private enemies: Enemies
  frameCb?: number
  lastTimestamp = 0
  score = 0
  isPause: boolean

  private controller = new Controller()

  constructor(props: GameProps) {
    this.context = props.context
    this.backgroundContext = props.backgroundContext
    this.isPause = props.isPause
    this.setPause = props.setPause
    this.setScore = props.setScore
    this.setGameOver = props.onGameOver

    this.enemies = new Enemies({
      score: this.score,
      config: config,
      context: this.context,
      setScore: this.addScore,
      onGameOver: this.onGameOver,
    })

    this.controller.setDisabled(false)
  }

  private loop(timestamp: number) {
    if (this.isGameOver) {
      return
    }

    if (!this.context || !this.backgroundContext) {
      throw new Error("Can't find a context")
    }

    const delta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.context.clearRect(0, 0, config.width, config.height) // Очистка холста
    update(delta)
    render()
    deleteObjects()
    this.enemies.update(delta, this.score)

    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public start() {
    this.isPause = false
    this.setPause(false)
    this.isGameOver = false
    initializeGame(this.context, this.backgroundContext, this.controller)
    this.lastTimestamp = performance.now()
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public pause() {
    if (this.isPause) {
      return
    }

    this.isPause = true
    this.setPause(true)
    this.controller.setDisabled(true)

    if (this.frameCb) {
      cancelAnimationFrame(this.frameCb)
      this.frameCb = undefined
    }
  }

  public play() {
    if (!this.isPause) {
      return
    }

    this.isPause = false
    this.setPause(false)
    this.controller.setDisabled(false)

    this.lastTimestamp = performance.now()
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  addScore = (value: number) => {
    this.score = this.score + value
    this.setScore(this.score)
  }

  onGameOver = () => {
    this.destroy()
    this.setGameOver()
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

  destroy() {
    this.isGameOver = true
    resetGameConfig()
    this.context.clearRect(0, 0, config.width, config.height)
    this.backgroundContext.clearRect(0, 0, config.width, config.height)

    if (this.frameCb) {
      cancelAnimationFrame(this.frameCb)
      this.frameCb = undefined
    }

    this.controller.destroy()
  }
}
