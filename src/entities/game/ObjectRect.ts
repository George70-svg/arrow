export class ObjectRect {
  context: CanvasRenderingContext2D
  color = 'red'

  constructor(context: CanvasRenderingContext2D, color?: string) {
    this.context = context

    if (color) {
      this.color = color
    }
  }

  public draw(x: number, y: number, width: number, height: number) {
    this.context.strokeStyle = this.color
    this.context.lineWidth = 2
    this.context.strokeRect(x, y, width, height)
  }
}
