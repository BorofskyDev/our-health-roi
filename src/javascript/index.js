import '../styles/main.scss'
import { initNIHReporter } from './nih-reporter/'
import { initSvgSprite } from './utils/svg-sprite'
import { initComponents } from './components/init'
import { initAccessibility } from './accessibility'
import { initTheme } from './theme'

document.addEventListener('DOMContentLoaded', () => {
  initNIHReporter()
  initSvgSprite()
  initComponents()
  initAccessibility()
  initTheme()
})
