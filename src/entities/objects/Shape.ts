export type ShapeProps = {
  context: CanvasRenderingContext2D
  id: string
  position: { x: number; y: number }
  width: number
  height: number
  delta: number
}

export abstract class Shape {
  context: CanvasRenderingContext2D
  id = ''
  position: { x: number; y: number } = { x: 0, y: 0 }
  width = 0
  height = 0
  delta = 0

  protected constructor(props: ShapeProps) {
    this.context = props.context
    this.id = props.id
    this.position = props.position
    this.width = props.width
    this.height = props.height
    this.delta = props.delta
  }

  abstract render(): void
}
