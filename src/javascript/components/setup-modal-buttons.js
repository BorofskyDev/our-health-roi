import { createModal, initModals, openModal } from './modal.js'
import { getEmailRepModalContent } from '../utils/get-email-rep-modal-content'
import { getCallRepModalContent } from '../utils/get-call-rep-modal-content'
import { getEmailSenatorsModalContent } from '../utils/get-email-senators-modal-content'
import { getCallSenatorsModalContent } from '../utils/get-call-senators-modal-content'

/**
 * Sets up event listeners for modal buttons
 * @param {string} searchTerm - The search term to include in modals
 * @param {Object} researchData - Research data from API calls
 */
export function setupModalButtons(searchTerm = '', researchData = {}) {
  // Add modals to the DOM if they don't exist yet
  if (!document.getElementById('modals-container')) {
    addModalsToDOM(searchTerm, researchData)
  } else {
    // Modals already exist, update research data and reinitialize
    initModals(searchTerm, researchData)
    // Add button listeners
    addButtonListeners()
  }
}

/**
 * Add button event listeners
 */
function addButtonListeners() {
  // Email Rep Button
  const emailRepBtn = document.getElementById('emailRepBtn')
  if (emailRepBtn) {
    emailRepBtn.addEventListener('click', () => {
      openModal('email-rep-modal')
    })
  }

  // Call Rep Button
  const callRepBtn = document.getElementById('callRepBtn')
  if (callRepBtn) {
    callRepBtn.addEventListener('click', () => {
      openModal('call-rep-modal')
    })
  }

  // Email Senators Button
  const emailSenatorsBtn = document.getElementById('emailSenatorsBtn')
  if (emailSenatorsBtn) {
    emailSenatorsBtn.addEventListener('click', () => {
      openModal('email-senators-modal')
    })
  }

  // Call Senators Button
  const callSenatorsBtn = document.getElementById('callSenatorsBtn')
  if (callSenatorsBtn) {
    callSenatorsBtn.addEventListener('click', () => {
      openModal('call-senators-modal')
    })
  }
}

/**
 * Add modal containers to the DOM
 * @param {string} searchTerm - The search term to include in modals
 * @param {Object} researchData - Research data from API calls
 */
function addModalsToDOM(searchTerm = '', researchData = {}) {
  // Create container for modals
  const modalsContainer = document.createElement('div')
  modalsContainer.id = 'modals-container'

  // Email Rep Modal with form
  modalsContainer.innerHTML += createModal({
    id: 'email-rep-modal',
    title: 'Email Your Representative',
    content: getEmailRepModalContent(searchTerm),
    isPreviewable: true,
  })

  // Call Rep Modal
  modalsContainer.innerHTML += createModal({
    id: 'call-rep-modal',
    title: 'Call Your Representative',
    content: getCallRepModalContent(searchTerm),
    isPreviewable: true,
  })

  // Email Senators Modal
  modalsContainer.innerHTML += createModal({
    id: 'email-senators-modal',
    title: 'Email Your Senators',
    content: getEmailSenatorsModalContent(searchTerm),
    isPreviewable: true,
  })

  // Call Senators Modal
  modalsContainer.innerHTML += createModal({
    id: 'call-senators-modal',
    title: 'Call Your Senators',
    content: getCallSenatorsModalContent(searchTerm),
    isPreviewable: true,
  })

  // Append to body
  document.body.appendChild(modalsContainer)

  // Initialize the modals with research data
  initModals(searchTerm, researchData)

  // Add button listeners
  addButtonListeners()
}
