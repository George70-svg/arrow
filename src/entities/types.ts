export type Coordinate = { x: number; y: number }

export type Direction = 'left' | 'right'

export type SpriteConfig = {
  image: HTMLImageElement
  frames: number
  frameDelay: number
}

export type DrawImageParams = [
  image: HTMLImageElement,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
]
