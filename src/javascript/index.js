import spriteContent from '../assets/icons/sprite.svg?raw'
import '../styles/main.scss'

import { initNIHReporter } from './nih-reporter'
import { renderResourcesSection } from './templates/resources-section'
import { createIconButton } from './components/icon-button'

document.addEventListener('DOMContentLoaded', () => {
  initNIHReporter()
  const spriteContainer = document.createElement('div')
  spriteContainer.style.display = 'none'
  spriteContainer.innerHTML = spriteContent
  document.body.prepend(spriteContainer)

  console.log('Checking for sprite with ID')
  const spriteExists = document.getElementById('external-link-icon')
  console.log("Sprite exists", !!spriteExists)
  const useElements = document.querySelectorAll('use[href="#external-link-icon"]')
  console.log("Use elements", useElements)

  const resourcesContainer = document.getElementById('resources')
  if (resourcesContainer) {
    resourcesContainer.outerHTML = renderResourcesSection()
  }

  const representativeButtons = document.querySelectorAll(
    '.rep-buttons-container'
  )
  representativeButtons.forEach((container) => {
    container.innerHTML = `
      ${createIconButton(
        'email-icon',
        'Email My Rep',
        'icon-modal-btn-primary mb-44',
        'emailRepBtn'
      )}
      ${createIconButton(
        'phone-icon',
        'Call My Rep',
        'icon-modal-btn-secondary',
        'callRepBtn'
      )}
    `
  })
})
