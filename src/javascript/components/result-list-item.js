// src/javascript/components/result-list-item.js

/**
 * Creates an individual result list item
 * @param {string} id - The ID for the span element
 * @param {string} label - The text label for the result
 * @returns {string} HTML content
 */
export function createResultListItem(id, label) {
  return `
    <li class="list-item">
      <strong>
        <a class="external-link" id="${id}-link">
          <span id="${id}"></span>
          <svg class="external-link-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 64 64">
            <use href="#external-link-icon"></use>
          </svg>
        </a>
      </strong>
      <span>${label}</span>
    </li>
  `
}
