import "./styles.css";
import { RadialMenu } from './radialMenu'

const options = {
  width: 600,
  height: 600,
  sliceSize: 200,
  centerSize: 50,
  slices: [
    {
      label: 'Empty',
      event: 'alert'
    },
    {
      label: 'Empty',
      event: 'alert'
    },
    {
      label: 'Empty',
      event: 'alert'
    },
    {
      label: 'SFG Homepage',
      link: 'http://speciesfilegroup.org'
    },
    {
      label: 'Bla bla'
    },
    {
      label: 'Bla bla'
    },
    {
      label: 'TaxonWorks',
      link: 'http://taxonworks.org'
    },
    {
      label: 'Bla bla'
    },
  ]
}

const element = document.querySelector('#app') as HTMLElement
const radial = new RadialMenu(element, options)