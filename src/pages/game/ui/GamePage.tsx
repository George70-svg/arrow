import { useEffect, useRef } from 'react'
import config from '@entities/config/gameConfig.ts'
import { Game } from '@entities/game/Game.ts'
import styles from './GamePage.module.scss'

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)
  const windowWidth = window.innerWidth - 1
  const windowHeight = window.innerHeight - 1

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    config.width = windowWidth
    config.height = windowHeight

    if (context) {
      gameInstance.current = new Game(context)
      gameInstance.current.start()
    }
  }, [windowHeight, windowWidth])

  return (
    <div className={styles.page}>
      <p className={styles.header}>Game page {`w - ${windowWidth} h - ${windowHeight}`}</p>
      <canvas
        ref={canvasRef}
        id="game-canvas"
        width={windowWidth}
        height={windowHeight}
        style={{ width: windowWidth, height: windowHeight }}
      />
    </div>
  )
}
