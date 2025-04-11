// src/javascript/accessibility/keyboard-handlers.js

/**
 * Sets up keyboard event handlers for improved accessibility
 */
export function setupKeyboardHandlers() {
  setupSearchInputKeyboardHandler()
}

/**
 * Enables Enter key to trigger search from the search input
 */
function setupSearchInputKeyboardHandler() {
  const searchInput = document.getElementById('condition')
  const searchButton = document.getElementById('searchBtn')

  if (!searchInput || !searchButton) return


  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      searchButton.click() 
    }
  })

  searchInput.setAttribute('aria-label', 'Search for a health condition')
  searchButton.setAttribute('aria-controls', 'results')
}
