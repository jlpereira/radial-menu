import { Slice, RadialMenuOptions } from './types'

export class RadialMenu {
  centerSize: number
  SVGElement: SVGElement
  parentElement: HTMLElement
  options: Object
  SVGSlices: Array<SVGElement> = []
  width: number
  height: number
  sliceSize: number
  slices: Array<Slice>

  constructor (element: HTMLElement, opt: RadialMenuOptions) {
    const { centerSize, width, height, slices, sliceSize } = opt

    this.SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.SVGElement.setAttribute('width', `${width}px`)
    this.SVGElement.setAttribute('height', `${height}px`)
    this.parentElement = element
    this.options = opt
    this.width = width
    this.height = height
    this.slices = slices
    this.sliceSize = sliceSize
    this.centerSize = centerSize

    this.generateMenu()
  }

  generateMenu (): void {
    this.SVGSlices = this.generateSlices()
    this.SVGSlices.forEach(element => {
      (<any>this.SVGElement).appendChild(element)
    })
    this.parentElement.appendChild(this.SVGElement)
  }

  private generateSlices (): Array<SVGElement> {
    const radiusSlice: number = 360 / this.slices.length
    const svgPaths: Array<SVGElement> = []
    const widthSize: number = this.width / 2
    const heightSize: number = this.height / 2

    let radiusStart = 0
    let radiusEnd = radiusSlice

    this.slices.forEach((slice: Slice): void => {
      console.log(`start: ${radiusStart}`)
      console.log(`end: ${radiusEnd}`)

      const sliceElement = this.createSlice(this.describeArc(widthSize, heightSize, this.centerSize, this.sliceSize, radiusStart, radiusEnd))
      svgPaths.push(slice.link ? this.createSVGLink(sliceElement, slice.link) : sliceElement)

      svgPaths.push(this.generateLabel(widthSize, heightSize, this.sliceSize - this.centerSize, radiusStart + radiusSlice / 2, slice))
      radiusEnd = radiusEnd + radiusSlice
      radiusStart = radiusStart + radiusSlice
    })

    return svgPaths
  }

  private generateLabel (x: number, y: number, distance: number, radius: number, slice: Slice) {
    const coordinates = this.polarToCartesian(x, y, distance , radius)
    const SVGText = this.createSVGText(coordinates.x, coordinates.y, slice.label)

    return SVGText
  }

  private createSlice (arcPath: string): SVGElement {
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pathElement.setAttribute('d', arcPath)
    pathElement.setAttribute('fill', 'gray')
    pathElement.setAttribute('stroke', 'white')
    pathElement.setAttribute('stroke-opacity', '1')
    pathElement.setAttribute('stroke-width', '3')
    pathElement.setAttribute('style', '3')
    

    return pathElement
  }

  private createSVGLink (nodeChild: SVGElement, link: string) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'a')
    element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', link)
    element.append(nodeChild)

    return element
  }

  private createSVGText (x: number, y: number, text: string) {
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    textElement.textContent = text
    textElement.setAttribute('x', `${x}px`)
    textElement.setAttribute('y', `${y}px`)
    textElement.setAttribute('fill', 'white')
    return textElement
  }

  private describeArc (x: number, y: number, radius: number, spread: number, startAngle: number, endAngle: number): string {
    const innerStart = this.polarToCartesian(x, y, radius, endAngle)
    const innerEnd = this.polarToCartesian(x, y, radius, startAngle)
    const outerStart = this.polarToCartesian(x, y, radius + spread, endAngle)
    const outerEnd = this.polarToCartesian(x, y, radius + spread, startAngle)
  
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  
    var d = [
        'M', outerStart.x, outerStart.y,
        'A', radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
        'L', innerEnd.x, innerEnd.y, 
        'A', radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y, 
        'L', outerStart.x, outerStart.y, 'Z'
    ].join(' ')
  
    return d
  }

  private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0
    
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

}
