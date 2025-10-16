export type ShapeProps = {
  context: CanvasRenderingContext2D
  id: string
  position: { x: number; y: number }
  imgWidth: number
  imgHeight: number
}

export abstract class Shape {
  context: CanvasRenderingContext2D
  id = ''
  position: { x: number; y: number } = { x: 0, y: 0 }
  imgWidth = 0
  imgHeight = 0

  protected constructor(props: ShapeProps) {
    this.context = props.context
    this.id = props.id
    this.position = props.position
    this.imgWidth = props.imgWidth
    this.imgHeight = props.imgHeight
  }

  abstract update?(delta: number): void

  abstract render(): void
}
