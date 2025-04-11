import { generateEmailRepPreviewText } from '../utils/get-email-rep-modal-content'
import { generateCallRepPreviewText } from '../utils/get-call-rep-modal-content'
import { generateEmailSenatorsPreviewText } from '../utils/get-email-senators-modal-content'
import { generateCallSenatorsPreviewText } from '../utils/get-call-senators-modal-content'

/**
 * Creates a modal component
 * @param {Object} options - Modal configuration options
 * @param {string} options.id - Modal ID
 * @param {string} options.title - Modal title
 * @param {string} options.content - Modal content
 * @param {boolean} options.isPreviewable - Whether the modal has preview functionality
 * @returns {string} HTML content for modal
 */
export function createModal(options) {
  const { id, title, content, isPreviewable = false } = options
  const previewSection = isPreviewable
    ? `
    <div class="preview-section" style="display: none;">
      <h4>Preview</h4>
      <div class="preview-content"></div>
      <button class="cta-btn copy-btn">Copy Text</button>
    </div>
  `
    : ''

  return `
    <div id="${id}" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="close-modal" aria-label="Close modal" data-modal-id="${id}">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
          ${previewSection}
        </div>
      </div>
    </div>
  `
}

/**
 * Initialize all modals in the document
 * @param {string} searchTerm - The search term to include in modals
 * @param {Object} researchData - Research data from API calls
 */
export function initModals(searchTerm = '', researchData = {}) {
  // Set research data in hidden fields for each modal type
  const setResearchData = (prefix) => {
    if (researchData.projects !== undefined) {
      document
        .getElementById(`${prefix}-count`)
        ?.setAttribute('value', researchData.projects)
    }
    if (researchData.publications !== undefined) {
      document
        .getElementById(`${prefix}-count`)
        ?.setAttribute('value', researchData.publications)
    }
    if (researchData.patents !== undefined) {
      document
        .getElementById(`${prefix}-count`)
        ?.setAttribute('value', researchData.patents)
    }
    if (researchData.clinicalTrials !== undefined) {
      document
        .getElementById(`${prefix}-count`)
        ?.setAttribute('value', researchData.clinicalTrials)
    }
  }

  // Set data for each modal
  setResearchData('projects')
  setResearchData('publications')
  setResearchData('patents')
  setResearchData('clinical-trials')

  // For call rep modal
  setResearchData('projects-count-call')
  setResearchData('publications-count-call')
  setResearchData('patents-count-call')
  setResearchData('clinical-trials-count-call')

  // For email senators modal
  setResearchData('projects-count-senator')
  setResearchData('publications-count-senator')
  setResearchData('patents-count-senator')
  setResearchData('clinical-trials-count-senator')

  // For call senators modal
  setResearchData('projects-count-call-senator')
  setResearchData('publications-count-call-senator')
  setResearchData('patents-count-call-senator')
  setResearchData('clinical-trials-count-call-senator')

  // Initialize character counters for all textareas
  initCharacterCounters('personal-impact', 'impact-char-count')
  initCharacterCounters('personal-impact-call', 'impact-call-char-count')
  initCharacterCounters('personal-impact-senator', 'impact-senator-char-count')
  initCharacterCounters(
    'personal-impact-call-senator',
    'impact-call-senator-char-count'
  )

  // Handle preview buttons if they exist
  document.querySelectorAll('.preview-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal')
      const previewSection = modal.querySelector('.preview-section')
      const previewContent = modal.querySelector('.preview-content')

      if (previewSection && previewContent) {
        // Get the form data
        const form = modal.querySelector('form')
        if (!form) return

        // Check if form is valid
        if (!form.checkValidity()) {
          form.reportValidity()
          return
        }

        const formData = new FormData(form)

        // Generate preview based on modal type
        let previewText = ''
        const modalType = btn.dataset.modalType

        switch (modalType) {
          case 'email-rep':
            previewText = generateEmailRepPreviewText(formData, searchTerm)
            break
          case 'call-rep':
            previewText = generateCallRepPreviewText(formData, searchTerm)
            break
          case 'email-senators':
            previewText = generateEmailSenatorsPreviewText(formData, searchTerm)
            break
          case 'call-senators':
            previewText = generateCallSenatorsPreviewText(formData, searchTerm)
            break
          default:
            previewText = generateDefaultPreviewText(modalType, searchTerm)
        }

        // Show the preview section and update content
        previewSection.style.display = 'block'
        previewContent.textContent = previewText
      }
    })
  })

  // Handle copy buttons if they exist
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const previewContent = btn.previousElementSibling
      if (previewContent) {
        navigator.clipboard
          .writeText(previewContent.textContent)
          .then(() => {
            // Visual feedback for copy success
            const originalText = btn.textContent
            btn.textContent = 'Copied!'
            setTimeout(() => {
              btn.textContent = originalText
            }, 2000)
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err)
          })
      }
    })
  })

  // Initialize close buttons
  document.querySelectorAll('.close-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modalId
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.style.display = 'none'

        // Hide preview section when modal is closed
        const previewSection = modal.querySelector('.preview-section')
        if (previewSection) {
          previewSection.style.display = 'none'
        }
      }
    })
  })

  // Close modal when clicking outside of modal content
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none'

        // Hide preview section when modal is closed
        const previewSection = modal.querySelector('.preview-section')
        if (previewSection) {
          previewSection.style.display = 'none'
        }
      }
    })
  })
}

/**
 * Initialize character counter for a textarea
 * @param {string} textareaId - ID of the textarea
 * @param {string} counterId - ID of the counter element
 */
function initCharacterCounters(textareaId, counterId) {
  const textarea = document.getElementById(textareaId)
  const counter = document.getElementById(counterId)

  if (textarea && counter) {
    textarea.addEventListener('input', function () {
      const currentLength = this.value.length
      counter.textContent = currentLength

      // Add visual feedback when approaching limit
      if (currentLength > parseInt(this.getAttribute('maxlength')) * 0.9) {
        counter.classList.add('char-count-warning')
      } else {
        counter.classList.remove('char-count-warning')
      }
    })
  }
}

/**
 * Open a modal by ID
 * @param {string} modalId - ID of the modal to open
 */
export function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = 'flex'

    // Reset preview section when opening modal
    const previewSection = modal.querySelector('.preview-section')
    if (previewSection) {
      previewSection.style.display = 'none'
    }
  }
}

/**
 * Generate default preview text for other modal types
 * @param {string} modalType - Type of modal
 * @param {string} searchTerm - Search term used
 * @returns {string} Generated preview text
 */
function generateDefaultPreviewText(modalType, searchTerm) {
  return `This is a preview for ${modalType} regarding ${
    searchTerm || 'your condition'
  }.
  
Your message would be customized based on form input and include details about NIH research on ${
    searchTerm || 'your condition'
  }.`
}
