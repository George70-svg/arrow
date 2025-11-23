import { type GameConfig } from '@entities/config/gameConfig.ts'
import { create } from '@entities/config/enemyConfig.ts'

type EnemiesProps = {
  score: number
  config: GameConfig
  context: CanvasRenderingContext2D
  setScore: (value: number) => void
}

export class Enemies {
  score: number
  config: GameConfig
  context: CanvasRenderingContext2D
  lastTimestamp = 0
  setScore: (value: number) => void

  constructor(props: EnemiesProps) {
    this.score = props.score
    this.config = props.config
    this.context = props.context
    this.setScore = props.setScore
  }

  update(timestamp: number, score: number) {
    const randomTime = Math.floor(Math.random() * 10000)
    const time = randomTime > 3000 ? randomTime : 3000
    const delta = timestamp - this.lastTimestamp

    if (time < delta) {
      this.lastTimestamp = timestamp
      this.createEnemy(score)
    }
  }

  createEnemy(score: number) {
    const level = this.getLevel(score)

    if (level === 1) {
      const enemyCallback = create.zombie
      const enemy = enemyCallback(this.context, this.config.width, this.config.height - 28, this.setScore)
      this.config.objects.enemies.push(enemy)
    }

    if (level > 1) {
      const enemyCallback = create.orc
      const enemy = enemyCallback(this.context, this.config.width, this.config.height - 28, this.setScore)
      this.config.objects.enemies.push(enemy)
    }

    /*if (level === 3) {
    }

    if (level === 4) {
    }*/
  }

  getLevel(score: number) {
    if (score < 6) {
      return 1
    }

    if (score >= 6 && score < 12) {
      return 2
    }

    if (score >= 12 && score < 20) {
      return 3
    }

    if (score >= 20) {
      return 4
    }

    return 4
  }
}
