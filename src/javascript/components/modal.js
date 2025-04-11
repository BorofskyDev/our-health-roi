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
  console.log('Initializing modals with research data:', researchData);
  
  // Set research data in hidden fields - this is the function that needs to be fixed
  if (researchData.projects !== undefined) {
    const projectsFields = document.querySelectorAll('[id$="projects-count"],[id$="projects-count-call"],[id$="projects-count-senator"],[id$="projects-count-call-senator"]');
    projectsFields.forEach(field => {
      if (field) field.value = researchData.projects;
    });
  }
  
  if (researchData.publications !== undefined) {
    const pubFields = document.querySelectorAll('[id$="publications-count"],[id$="publications-count-call"],[id$="publications-count-senator"],[id$="publications-count-call-senator"]');
    pubFields.forEach(field => {
      if (field) field.value = researchData.publications;
    });
  }
  
  if (researchData.patents !== undefined) {
    const patentFields = document.querySelectorAll('[id$="patents-count"],[id$="patents-count-call"],[id$="patents-count-senator"],[id$="patents-count-call-senator"]');
    patentFields.forEach(field => {
      if (field) field.value = researchData.patents;
    });
  }
  
  if (researchData.clinicalTrials !== undefined) {
    const trialFields = document.querySelectorAll('[id$="clinical-trials-count"],[id$="clinical-trials-count-call"],[id$="clinical-trials-count-senator"],[id$="clinical-trials-count-call-senator"]');
    trialFields.forEach(field => {
      if (field) field.value = researchData.clinicalTrials;
    });
  }

  // Initialize character counter for textarea
  initCharacterCounters();

  // Handle preview buttons if they exist
  document.querySelectorAll('.preview-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      const previewSection = modal.querySelector('.preview-section');
      const previewContent = modal.querySelector('.preview-content');

      if (previewSection && previewContent) {
        // Get the form data
        const form = modal.querySelector('form');
        if (!form) return;

        // Check if form is valid
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const formData = new FormData(form);
        
        // Debug: Log the form data
        console.log('Form data for preview:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        // Generate preview based on modal type
        let previewText = '';
        const modalType = btn.dataset.modalType;

        if (modalType === 'email-rep') {
          previewText = generateEmailRepPreviewText(formData, searchTerm);
        } else if (modalType === 'call-rep') {
          previewText = generateCallRepPreviewText(formData, searchTerm);
        } else if (modalType === 'email-senators') {
          previewText = generateEmailSenatorsPreviewText(formData, searchTerm);
        } else if (modalType === 'call-senators') {
          previewText = generateCallSenatorsPreviewText(formData, searchTerm);
        } else {
          // Default preview if specific handler not available
          previewText = generateDefaultPreviewText(modalType, searchTerm);
        }

        // Show the preview section and update content
        previewSection.style.display = 'block';
        previewContent.textContent = previewText;
      }
    });
  });

  // Handle copy buttons if they exist
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const previewContent = btn.previousElementSibling;
      if (previewContent) {
        navigator.clipboard
          .writeText(previewContent.textContent)
          .then(() => {
            // Visual feedback for copy success
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
              btn.textContent = originalText;
            }, 2000);
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
          });
      }
    });
  });

  // Initialize close buttons
  document.querySelectorAll('.close-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modalId;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';

        // Hide preview section when modal is closed
        const previewSection = modal.querySelector('.preview-section');
        if (previewSection) {
          previewSection.style.display = 'none';
        }
      }
    });
  });

  // Close modal when clicking outside of modal content
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';

        // Hide preview section when modal is closed
        const previewSection = modal.querySelector('.preview-section');
        if (previewSection) {
          previewSection.style.display = 'none';
        }
      }
    });
  });
}

/**
 * Initialize character counters for all textareas with character counting
 */
function initCharacterCounters() {
  // Find all textareas with character counters
  document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
    const counterId = textarea.id.replace('personal-impact', 'impact') + '-char-count';
    const counter = document.getElementById(counterId) || 
                   document.querySelector(`[id$="${counterId}"]`);
                   
    if (textarea && counter) {
      // Set initial count
      counter.textContent = textarea.value.length;
      
      // Add event listener for input
      textarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        counter.textContent = currentLength;
        
        // Add visual feedback when approaching limit
        const maxLength = parseInt(this.getAttribute('maxlength'));
        if (currentLength > (maxLength * 0.9)) {
          counter.classList.add('char-count-warning');
        } else {
          counter.classList.remove('char-count-warning');
        }
      });
    }
  });
}

// Generate default preview
function generateDefaultPreviewText(modalType, searchTerm) {
  return `This is a preview for ${modalType} regarding ${searchTerm || 'your condition'}.
  
Your message would be customized based on form input and include details about NIH research on ${searchTerm || 'your condition'}.`;
}

// Import generate functions for different modal types



export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';

    // Reset preview section when opening modal
    const previewSection = modal.querySelector('.preview-section');
    if (previewSection) {
      previewSection.style.display = 'none';
    }
  }
}
