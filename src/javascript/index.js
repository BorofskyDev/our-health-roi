import '../styles/main.scss'
import { initNIHReporter } from './nih-reporter/'
import { initSvgSprite } from './utils/svg-sprite'
import { initComponents } from './components/init'
import { initAccessibility } from './accessibility'

document.addEventListener('DOMContentLoaded', () => {
  initNIHReporter()
  initSvgSprite()
  initComponents()
  initAccessibility()
})
