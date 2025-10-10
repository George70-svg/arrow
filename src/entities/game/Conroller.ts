const availableButtonCodes = ['KeyA', 'KeyD', 'KeyW', 'KeyS']

class Controller {
  private pressedKeys: Record<string, boolean> = {}

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
  }

  public getPressedKeys() {
    return this.pressedKeys
  }
}

const controller = new Controller()
export default controller
