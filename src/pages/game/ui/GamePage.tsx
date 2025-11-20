import { useEffect, useRef, useState } from 'react'
import { Box, Modal } from '@mui/material'
import config from '@entities/config/gameConfig.ts'
import { Game } from '@entities/game/Game.ts'
import styles from './GamePage.module.scss'

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)
  const [isPause, onPauseChange] = useState(true)
  const [isNewGame, setNewGame] = useState(true)
  const windowWidth = window.innerWidth - 1
  const windowHeight = window.innerHeight - 1

  const startGame = () => {
    setNewGame(false)
    const context = canvasRef.current?.getContext('2d')
    const backgroundContext = backgroundCanvasRef.current?.getContext('2d')
    config.width = windowWidth
    config.height = windowHeight

    if (context && backgroundContext) {
      gameInstance.current = new Game({ context, backgroundContext, isPause, onPauseChange })
      gameInstance.current.start()
    }
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

      <Modal open={isPause} onClose={() => {}} disableEscapeKeyDown>
        <Box className={styles.modal}>
          <h2>Menu</h2>

          <div className={styles.buttonContainer}>
            {isNewGame && (
              <button className={styles.buttonItem} onClick={startGame}>
                Start
              </button>
            )}
            {!isNewGame && (
              <button className={styles.buttonItem} onClick={continueGame}>
                Continue
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
