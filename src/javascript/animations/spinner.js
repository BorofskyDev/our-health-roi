// src/javascript/animations/spinner.js

import { gsap } from 'gsap'
import { createSpinner } from '../components/spinner.js'

let tween

/**
 * Shows & animates the spinner created by `createSpinner`.
 */
export function showSpinner(containerId = 'loading-container') {
  

  let container = document.getElementById(containerId)
  if (!container) {
    const parent = document.getElementById('search') || document.body 
    container = createSpinner({id: containerId})
    parent.appendChild(container)
  }

  container.style.display = 'flex'


  const arc = container.querySelector('.spinner-arc')
  if (!arc) return console.error('spinner-arc element missing')

  tween = gsap.to(arc, {
    rotation: 360,
    duration: 2,
    repeat: -1,
    ease: 'none',
    transformOrigin: '50% 50%',
  })
}

/** Stops animation and hides container */
export function hideSpinner(containerId = 'loading-container') {
  const container = document.getElementById(containerId)
  if (!container) return
  tween && tween.kill()
  container.style.display = 'none'
}
