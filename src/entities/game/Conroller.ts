import config from '@entities/config/gameConfig.ts'
import type { Coordinate } from '@entities/types.ts'

const availableButtonCodes = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'LBM']

export class Controller {
  private pressedKeys: Record<string, boolean> = {}
  private mouseCoordinates: Coordinate | null = null
  private startDate: Date | null = null
  private mousePressedTimeMs: number | null = null
  private updateIntervalMs = 20
  private intervalId: ReturnType<typeof setInterval> | undefined = undefined
  private isDisabled = false

  constructor() {
    window.addEventListener('keydown', this.handleKeydown)
    window.addEventListener('keyup', this.handleKeyup)
    window.addEventListener('mousemove', this.handleMousemove)
    window.addEventListener('mousedown', this.handleMousedown)
    window.addEventListener('mouseup', this.handleMouseup)
  }

  public setDisabled = (status: boolean) => {
    this.isDisabled = status
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (availableButtonCodes.includes(event.code)) {
      this.pressedKeys[event.code] = true
    }
  }

  private handleKeyup = (event: KeyboardEvent) => {
    if (availableButtonCodes.includes(event.code)) {
      this.pressedKeys[event.code] = false
    }
  }

  private handleMousemove = (event: MouseEvent) => {
    this.mouseCoordinates = { x: event.x, y: event.y }
  }

  private handleMousedown = () => {
    if (this.isDisabled) {
      return
    }

    this.pressedKeys['LBM'] = true

    // определяем начальное время начала нажатия кнопки
    if (!this.startDate) {
      this.startDate = new Date()
    }

    // если кнопка уже была нажата (есть время начала нажатия), то тогда рассчитывем время нажатия
    if (this.startDate) {
      const startDate = this.startDate
      this.intervalId = setInterval(() => {
        if (!this.mousePressedTimeMs || this.mousePressedTimeMs < config.arrow.maxTensionTimeMs) {
          this.mousePressedTimeMs = Date.now() - startDate.getTime()
        }
      }, this.updateIntervalMs)
    }
  }

  private handleMouseup = () => {
    if (this.isDisabled) {
      return
    }

    this.pressedKeys['LBM'] = false
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

  public destroy() {
    window.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('keyup', this.handleKeyup)
    window.removeEventListener('mousemove', this.handleMousemove)
    window.removeEventListener('mousedown', this.handleMousedown)
    window.removeEventListener('mouseup', this.handleMouseup)

    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }

    this.pressedKeys = {}
  }
}
