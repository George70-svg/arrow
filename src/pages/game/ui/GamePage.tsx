import { useEffect, useRef } from 'react'
import { Game } from '@entities/game/Game.ts'
import styles from './GamePage.module.scss'

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)

  useEffect(() => {
    console.log('useEffect')
    const context = canvasRef.current?.getContext('2d')

    if (context) {
      gameInstance.current = new Game(context)
      gameInstance.current.start()
    }
  }, [])

  return (
    <div className={styles.gamePage}>
      <p>Game page</p>
      <canvas ref={canvasRef} id="game-canvas" width={1500} height={800} />
    </div>
  )
}
