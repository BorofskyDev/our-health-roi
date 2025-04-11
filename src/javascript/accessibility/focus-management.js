// src/javascript/accessibility/focus-management.js

/**
 * Sets up focus management for better user experience with screen readers
 */
export function setupFocusManagement() {
  setupSearchResultsFocus()
}

/**
 * Manages focus when search results are displayed
 */
function setupSearchResultsFocus() {
  const searchButton = document.getElementById('searchBtn')
  const resultsSection = document.getElementById('results')

  if (!searchButton || !resultsSection) return

  // Create a MutationObserver to watch for changes to the results section
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'hidden'
      ) {
        // If results section becomes visible
        if (!resultsSection.hidden) {
          // Set focus to the results section or its first header for screen readers
          const resultsHeader = resultsSection.querySelector('h3')
          if (resultsHeader) {
            // Make header focusable temporarily
            resultsHeader.setAttribute('tabindex', '-1')
            resultsHeader.focus()
            // Remove tabindex after focus to avoid leaving tab stops
            setTimeout(() => {
              resultsHeader.removeAttribute('tabindex')
            }, 100)
          }
        }
      }
    })
  })

  // Start observing the results section
  observer.observe(resultsSection, { attributes: true })
}
