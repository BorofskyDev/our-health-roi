// src/javascript/accessibility/index.js
import { setupKeyboardHandlers } from './keyboard-handlers'
import { setupFocusManagement } from './focus-management'

/**
 * Initializes all accessibility enhancements
 */
export function initAccessibility() {
  setupKeyboardHandlers()
  setupFocusManagement()
}
