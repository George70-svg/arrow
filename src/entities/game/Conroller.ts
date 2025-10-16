import type { Coordinate } from '@entities/types.ts'

const availableButtonCodes = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'LBM']

class Controller {
  private pressedKeys: Record<string, boolean> = {}
  private mouseCoordinates: Coordinate | null = null
  private startDate: Date | null = null
  private mousePressedTimeMs: number | null = null
  private updateIntervalMs = 200
  private intervalId: ReturnType<typeof setInterval> | undefined = undefined

  constructor() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (availableButtonCodes.includes(event.code)) {
        this.pressedKeys[event.code] = true
      }
    })

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      if (availableButtonCodes.includes(event.code)) {
        this.pressedKeys[event.code] = false
      }
    })

    window.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouseCoordinates = { x: event.x, y: event.y }
    })

    window.addEventListener('mousedown', () => {
      this.pressedKeys['LBM'] = true

      // определяем начальное время начала нажатия кнопки
      if (!this.startDate) {
        this.startDate = new Date()
      }

      // если кнопка уже была нажата (есть время начала нажатия), то тогда рассчитывем время нажатия
      if (this.startDate) {
        const startDate = this.startDate
        this.intervalId = setInterval(() => {
          this.mousePressedTimeMs = Date.now() - startDate.getTime()
        }, this.updateIntervalMs)
      }
    })

    window.addEventListener('mouseup', () => {
      this.pressedKeys['LBM'] = false
    })
  }

  public getPressedKeys() {
    return this.pressedKeys
  }

  public getMouseCoordinates() {
    return this.mouseCoordinates
  }

  public getMousePressedTime() {
    return this.mousePressedTimeMs
  }

  public resetTimer() {
    this.startDate = null
    this.mousePressedTimeMs = null
    clearInterval(this.intervalId)
  }
}

const controller = new Controller()
export default controller
