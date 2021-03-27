export type sliceOption = {
  radius?: number | unknown
  text?: string
  icon?: string | unknown,
  link?: boolean
}
export type radialMenuOptions = {
  height: number
  width: number
  slices: Array<sliceOption>
}

export class RadialMenu {
  SVGElement: SVGElement
  parentElement: HTMLElement
  options: Object
  SVGSlices: Array<SVGElement> = []
  width: number
  height: number
  slices: Array<sliceOption>


  constructor (element: HTMLElement, opt: radialMenuOptions) {
    const { width, height, slices } = opt

    this.SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this.SVGElement.setAttribute('width', `${width}px`)
    this.SVGElement.setAttribute('height', `${height}px`)
    this.parentElement = element
    this.options = opt
    this.width = width
    this.height = height
    this.slices = slices

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
    let radiusStart = 0
    let radiusEnd = radiusSlice


    this.slices.forEach((slice: sliceOption): void => {
      console.log(`start: ${radiusStart}`)
      console.log(`end: ${radiusEnd}`)
      svgPaths.push(this.createSlice(this.describeArc(this.width / 2, this.height / 2, 50, 130, radiusStart, radiusEnd)))
      radiusEnd = radiusEnd + radiusSlice
      radiusStart = radiusStart + radiusSlice
    })

    return svgPaths
  }

  private createSlice (arcPath: string): SVGElement {
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", 'path')
    pathElement.setAttribute('d', arcPath)
    pathElement.setAttribute('fill', 'blue')
    pathElement.setAttribute('stroke', 'white')
    pathElement.setAttribute('stroke-opacity', '1')
    pathElement.setAttribute('stroke-width', '3')
    

    return pathElement
  }

  private describeArc (x: number, y: number, radius: number, spread: number, startAngle: number, endAngle: number): string {
    const innerStart = this.polarToCartesian(x, y, radius, endAngle)
    const innerEnd = this.polarToCartesian(x, y, radius, startAngle)
    const outerStart = this.polarToCartesian(x, y, radius + spread, endAngle)
    const outerEnd = this.polarToCartesian(x, y, radius + spread, startAngle)
  
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  
    var d = [
        "M", outerStart.x, outerStart.y,
        "A", radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
        "L", innerEnd.x, innerEnd.y, 
        "A", radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y, 
        "L", outerStart.x, outerStart.y, "Z"
    ].join(" ")
  
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
