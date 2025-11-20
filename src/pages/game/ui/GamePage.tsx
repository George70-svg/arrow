import { useEffect, useRef, useState } from 'react'
import { Box, Modal, Typography } from '@mui/material'
import config from '@entities/config/gameConfig.ts'
import { Game } from '@entities/game/Game.ts'
import styles from './GamePage.module.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const windowWidth = window.innerWidth - 1
  const windowHeight = window.innerHeight - 1

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    const backgroundContext = backgroundCanvasRef.current?.getContext('2d')
    config.width = windowWidth
    config.height = windowHeight

    if (context && backgroundContext) {
      gameInstance.current = new Game(context, backgroundContext)
      gameInstance.current.setPauseListener(setIsPaused)
      gameInstance.current.start()
    }
  }, [windowHeight, windowWidth])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!gameInstance.current) {
        return
      }

      if (event.code === 'Escape') {
        console.log('Escape')
        gameInstance.current.togglePause()
      }
    }

    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={styles.page}>
      <p className={styles.header}>Game page {`w - ${windowWidth} h - ${windowHeight}`}</p>
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

      <Modal open={isPaused} onClose={() => {}} disableEscapeKeyDown>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Pause
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
