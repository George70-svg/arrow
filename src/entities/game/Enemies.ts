import { type GameConfig } from '@entities/config/gameConfig.ts'
import { create } from '@entities/config/enemyConfig.ts'
import { type Level, levelConfig } from '@entities/config/levelConfig.ts'

type EnemiesProps = {
  score: number
  config: GameConfig
  context: CanvasRenderingContext2D
  setScore: (value: number) => void
  onGameOver: () => void
}

export class Enemies {
  score: number
  config: GameConfig
  context: CanvasRenderingContext2D
  lastTimestamp = 0
  currentLevelIdx = 0
  nextSpawnDelay = 0
  setScore: (value: number) => void
  onGameOver: () => void

  constructor(props: EnemiesProps) {
    this.score = props.score
    this.config = props.config
    this.context = props.context
    this.setScore = props.setScore
    this.onGameOver = props.onGameOver
  }

  update(delta: number, score: number) {
    this.checkLevel(score)
    this.lastTimestamp += delta

    if (this.lastTimestamp > this.nextSpawnDelay) {
      this.spawnEnemy()
      this.lastTimestamp = 0
    }
  }

  checkLevel(score: number) {
    const nextLevelIndex = this.currentLevelIdx + 1

    if (nextLevelIndex < levelConfig.length) {
      if (levelConfig[nextLevelIndex].minScore < score) {
        this.currentLevelIdx += 1
      }
    }
  }

  spawnEnemy() {
    const currentLevel = levelConfig[this.currentLevelIdx]
    const [min, max] = currentLevel.spawnTime
    this.nextSpawnDelay = Math.random() * (max - min) + min
    const enemyType = this.getEnemyFromPercent(currentLevel)
    const createEnemy = create[enemyType.type]
    const enemy = createEnemy(this.context, this.config.width, this.config.height - 28, this.setScore, this.onGameOver)
    this.config.objects.enemies.push(enemy)
  }

  getEnemyFromPercent(level: Level) {
    const totalPercent = level.enemies.reduce((acc, item) => {
      return acc + item.percent
    }, 0)

    let randomNumber = Math.random() * totalPercent

    for (const enemy of level.enemies) {
      if (randomNumber < enemy.percent) {
        return enemy
      }

      randomNumber -= enemy.percent
    }

    return level.enemies[0]
  }
}
