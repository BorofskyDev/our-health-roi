import { createIconButton } from './icon-button'

export function initRepresentativeButtons() {
  const representativeButtons = document.querySelectorAll(
    '.rep-buttons-container'
  )

  if (representativeButtons.length === 0) return

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
}
