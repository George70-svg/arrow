import eventBus from '@entities/game/EventBus.ts'

const availableButtonCodes = ['KeyA', 'KeyD', 'KeyW', 'KeyS']

class Controller {
  constructor() {
    window.addEventListener('keydown', (event: KeyboardEvent) => this.handleButton(true, event))
    //window.addEventListener('keyup', (event: KeyboardEvent) => this.handleButton(false, event))
  }

  handleButton(isDown: boolean, event: KeyboardEvent) {
    if (availableButtonCodes.includes(event.code)) {
      eventBus.emit(event.code, isDown)
    }
  }
}

const controller = new Controller()
export default controller
