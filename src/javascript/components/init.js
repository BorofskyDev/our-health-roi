// src/javascript/components/init.js
import { renderCallToAction } from '../templates/call-to-action'
import { renderNIHResults } from '../templates/nih-results'
import { renderResourcesSection } from '../templates/resources-section'
import { renderWhyNIHMatters } from '../templates/why-nih-matters'
import { initRepresentativeButtons } from './init-representative-buttons'
import { setupModalButtons } from './setup-modal-buttons'

export function initComponents() {
  renderResourcesSection()
  renderWhyNIHMatters()
  renderCallToAction()
  initRepresentativeButtons()
  setupModalButtons()
  renderNIHResults()
}

