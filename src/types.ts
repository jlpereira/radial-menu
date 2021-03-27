export type Slice = {
  color?: string
  event?: string,
  icon?: string | unknown,
  link?: string
  radius?: number | unknown
  label: string
}
export type RadialMenuOptions = {
  height: number
  width: number
  sliceSize: number,
  centerSize: number,
  slices: Array<Slice>
}