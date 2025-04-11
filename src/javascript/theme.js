// src/javascript/theme.js

/**
 * Theme management module that handles detection and switching between light and dark themes
 * Priority order:
 * 1. User's saved preference in localStorage
 * 2. System preference (prefers-color-scheme media query)
 * 3. Toggle button state
 * 4. Default (light)
 */

// Theme constants
const STORAGE_KEY = 'user-theme-preference'
const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'

/**
 * Initialize the theme system
 */
export function initTheme() {
  // Check if the user has a saved preference
  const savedTheme = localStorage.getItem(STORAGE_KEY)

  // Check system preference
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  // Determine initial theme
  let currentTheme
  if (savedTheme) {
    // User's saved preference takes highest priority
    currentTheme = savedTheme
  } else if (systemPrefersDark) {
    // System preference is second priority
    currentTheme = DARK_THEME
  } else {
    // Default to light theme
    currentTheme = LIGHT_THEME
  }

  // Apply the initial theme
  applyTheme(currentTheme)

  // Set up the toggle button
  setupThemeToggle()

  // Set up listener for system preference changes
  setupSystemPreferenceListener()
}

/**
 * Apply the specified theme to the document
 * @param {string} theme - The theme to apply ('dark' or 'light')
 */
function applyTheme(theme) {
  // Set the data-theme attribute on the document element
  document.documentElement.setAttribute('data-theme', theme)

  // Store the user's preference
  localStorage.setItem(STORAGE_KEY, theme)

  // Update toggle button state to match current theme
  updateToggleButtonState(theme)
}

/**
 * Setup the theme toggle button
 */
function setupThemeToggle() {
  const toggleButton = document.querySelector('.cta-btn')

  if (toggleButton) {
    // Set appropriate ARIA attributes for accessibility
    toggleButton.setAttribute('role', 'switch')
    toggleButton.setAttribute(
      'aria-label',
      'Toggle between dark and light mode'
    )

    // Initialize the button state
    updateToggleButtonState(document.documentElement.getAttribute('data-theme'))

    // Add event listener to toggle the theme
    toggleButton.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme')
      const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME
      applyTheme(newTheme)
    })
  }
}

/**
 * Update the toggle button state to match the current theme
 * @param {string} theme - The current theme
 */
function updateToggleButtonState(theme) {
  const toggleButton = document.querySelector('.cta-btn')

  if (toggleButton) {
    const isDark = theme === DARK_THEME

    // Update ARIA checked attribute
    toggleButton.setAttribute('aria-checked', isDark ? 'true' : 'false')

    // Update button text
    toggleButton.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode'
  }
}

/**
 * Setup listener for system preference changes
 */
function setupSystemPreferenceListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  // Listen for changes to system preference
  mediaQuery.addEventListener('change', (e) => {
    // Only apply system preference if user hasn't explicitly set a preference
    if (!localStorage.getItem(STORAGE_KEY)) {
      const newTheme = e.matches ? DARK_THEME : LIGHT_THEME
      applyTheme(newTheme)
    }
  })
}
