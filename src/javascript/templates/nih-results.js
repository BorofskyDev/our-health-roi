// src/javascript/templates/nih-results.js
import { createResultListItem } from '../components/result-list-item'



export function renderNIHResults() {
  const resultsContainer = document.getElementById('results')
  if (!resultsContainer) return

  resultsContainer.innerHTML = generateNIHResultsHTML()
}

/**
 * Generates HTML for the NIH Results section
 * @returns {string} HTML content
 */
function generateNIHResultsHTML() {
  // Define the result types
  const resultTypes = [
    { id: 'proj', label: 'Researched Projects' },
    { id: 'pub', label: 'Peer-reviewed Publications' },
    { id: 'pat', label: 'Patented Discoveries' },
    { id: 'ct', label: 'Clinical Studies' },
  ]

  return `
    <h3 class="section-heading mb-24 center">NIH Impact Summary</h3>
    <p class="body-text mb-18 body-width">
      Since 1985, public investment through the NIH has powered research into
      <strong><span id="label"></span></strong> and produced the following:
    </p>
    <ul class="flex-col-section">
      ${resultTypes
        .map((type) => createResultListItem(type.id, type.label))
        .join('')}
    </ul>
    <p class="external-link">
      <a id="newsLink" target="_blank" rel="noopener">
        Discover news &amp; more
        <svg class="external-link-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 64 64">
          <use href="#external-link-icon"></use>
        </svg>
      </a>
    </p>
  `
}
