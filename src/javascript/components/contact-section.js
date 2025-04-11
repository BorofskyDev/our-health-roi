
import { createExternalLink } from './external-link'
import { createIconButton } from './icon-button'

/**
 * Creates a contact section for representatives or senators
 * @param {Object} options - Configuration options
 * @returns {string} HTML content
 */
export function createContactSection(options) {
  const { title, findLink, emailButton, callButton } = options

  return `
    <div class="flex-col-section">
      <h3 class="section-heading mb-44 center">${title}</h3>
      <p class="external-link mb-44">
        ${createExternalLink(findLink.href, findLink.text, findLink.ariaLabel)}
      </p>
      ${createIconButton(
        'email-icon',
        emailButton.text,
        'icon-modal-btn-primary mb-44',
        emailButton.id
      )}
      ${createIconButton(
        'phone-icon',
        callButton.text,
        'icon-modal-btn-secondary',
        callButton.id
      )}
    </div>
  `
}
