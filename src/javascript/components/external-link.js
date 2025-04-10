export function createExternalLink(href, text, ariaLabel) {
  return ` 
    <a href="${href}" 
       target="_blank" 
       rel="noopener noreferrer"
       aria-label="${ariaLabel || text + ' (opens in a new tab)'}">
      ${text}
      <span class="visually-hidden">(opens in new tab)</span>
      <svg class="external-link-icon" aria-hidden="true" focusable="false" viewBox="0 0 64 64">
        <use href="#external-link-icon"></use>
      </svg>
    </a>
    `
}
