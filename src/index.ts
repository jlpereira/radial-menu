import "./styles.css";
import { RadialMenu, radialMenuOptions } from './radialMenu'

const options: radialMenuOptions = {
  width: 400,
  height: 400,
  slices: [
    {
      text: 'test 1'
    },
    {
      text: 'test 2'
    },
    {
      text: 'test 3'
    },
    {
      text: 'test 4'
    },
  ]
}

const element = document.querySelector('#app') as HTMLElement
const radial = new RadialMenu(element, options)