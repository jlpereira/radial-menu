export class RadialMenu {
  SVGElement: HTMLOrSVGElement
  parentElement: HTMLElement

  constructor (element: HTMLElement, options: Object) {
    this.SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this.parentElement = element
  }

  describeArc (x: number, y: number, radius: number, spread: number, startAngle: number, endAngle: number){
    const innerStart = this.polarToCartesian(x, y, radius, endAngle)
    const innerEnd = this.polarToCartesian(x, y, radius, startAngle)
    const outerStart = this.polarToCartesian(x, y, radius + spread, endAngle)
    const outerEnd = this.polarToCartesian(x, y, radius + spread, startAngle)
  
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
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
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }
}
