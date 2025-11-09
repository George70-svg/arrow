export type ShapeProps = {
  context: CanvasRenderingContext2D
  id: string
  position: { x: number; y: number }
  imgWidth: number
  imgHeight: number
  markForDelete: boolean
  canDelete?: boolean
}

export abstract class Shape {
  id
  context: CanvasRenderingContext2D
  position: { x: number; y: number }
  imgWidth
  imgHeight
  markForDelete: boolean
  canDelete?: boolean = false

  protected constructor(props: ShapeProps) {
    this.context = props.context
    this.id = props.id
    this.position = props.position
    this.imgWidth = props.imgWidth
    this.imgHeight = props.imgHeight
    this.markForDelete = props.markForDelete
    this.canDelete = props.canDelete
  }

  setMarkForDelete(markForDelete: boolean) {
    this.markForDelete = markForDelete
  }

  update?(delta: number): void

  abstract render(): void
}
