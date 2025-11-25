import { useEffect, useRef, useState } from 'react'
import { Box, Modal } from '@mui/material'
import config from '@entities/config/gameConfig.ts'
import { Game } from '@entities/game/Game.ts'
import controlsImg from '@images/interface/controls.webp'
import styles from './GamePage.module.scss'

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)
  const windowWidth = window.innerWidth - 1
  const windowHeight = window.innerHeight - 1

  const [isPause, setPause] = useState(true)
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start')
  const [score, setScore] = useState(0)

  const startGame = () => {
    if (gameInstance.current) {
      gameInstance.current.destroy()
    }

    setGameState('start')
    setPause(false)
    setScore(0)

    const context = canvasRef.current?.getContext('2d')
    const backgroundContext = backgroundCanvasRef.current?.getContext('2d')

    config.width = windowWidth
    config.height = windowHeight

    if (context && backgroundContext) {
      gameInstance.current = new Game({ context, backgroundContext, isPause, setPause, setScore, onGameOver: handleGameOver })
      gameInstance.current.start()
    }
  }

  const handleGameOver = () => {
    gameInstance.current?.destroy()
    gameInstance.current = null
    setGameState('gameOver')
    setPause(true) // Открываем модалку
  }

  const continueGame = () => {
    if (gameInstance.current) {
      gameInstance.current.togglePause()
    }
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!gameInstance.current) {
        return
      }

      if (event.code === 'Escape') {
        gameInstance.current.togglePause()
      }
    }

    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [])

  const getModalContent = () => {
    if (gameState === 'start') {
      return { title: 'Archer Game', buttonText: 'Play', action: startGame }
    }

    if (gameState === 'gameOver') {
      return { title: 'Game over', buttonText: 'Play again', action: startGame }
    }

    return { title: 'Pause', buttonText: 'Continue', action: continueGame }
  }

  return (
    <div className={styles.page}>
      <canvas
        ref={backgroundCanvasRef}
        id="background-canvas"
        className={styles.backgroundCanvas}
        width={windowWidth}
        height={windowHeight}
        style={{ width: windowWidth, height: windowHeight }}
      />
      <canvas
        ref={canvasRef}
        id="game-canvas"
        className={styles.gameCanvas}
        width={windowWidth}
        height={windowHeight}
        style={{ width: windowWidth, height: windowHeight }}
      />

      <div className={styles.gameScore}>
        <h2>Score: {score}</h2>
      </div>

      <Modal open={isPause} onClose={() => {}} disableEscapeKeyDown>
        <Box className={styles.modal}>
          <h2 className={styles.title}>{getModalContent().title}</h2>
          <img className={styles.controls} src={controlsImg} alt="controls" />

          <div className={styles.buttonContainer}>
            <button className={styles.buttonItem} onClick={getModalContent().action}>
              {getModalContent().buttonText}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
