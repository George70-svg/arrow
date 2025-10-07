class EventBus {
  private static instance: EventBus | null = null
  events: Record<string, unknown[]> = {}

  getInstance() {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus()
    }

    return EventBus.instance
  }

  on(event: string, callback: unknown) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(callback)
  }

  off(event: string, callback: unknown) {
    if (!this.events[event]) {
      return
    }

    this.events[event].filter((cb) => cb !== callback)
  }

  emit(event: string, data?: unknown) {
    if (!this.events[event]) {
      return
    }

    this.events[event].forEach((cb) => cb(data))
  }
}

const eventBus = new EventBus().getInstance()
export default eventBus
