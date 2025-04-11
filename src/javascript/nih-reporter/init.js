// src/javascript/nih-reporter/index.js
import { showSpinner, hideSpinner } from '../animations'
import { setupEventListeners } from './event-handlers'
import { renderNIHResults } from '../templates/nih-results'

let initialised = false

export function initNIHReporter() {
  if (initialised) return
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot)
  else boot()
}

function boot() {
  

  // 2. create / verify results container (your old ensureResults…)
  renderNIHResults()

  // 3. events
  setupEventListeners({ showSpinner, hideSpinner })

  initialised = true
}
