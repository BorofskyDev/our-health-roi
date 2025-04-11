//  src/javascript/components/icon-button.js

export function createIconButton(iconId, text, buttonClass, buttonId) {
  return ` 
    <button class="${buttonClass}" ${buttonId ? `id="${buttonId}"` : ''}>
      <svg aria-hidden="true" focusable="false" class="button-icon">
        <use href="#${iconId}"></use>
      </svg>
      <span>${text}</span>
    </button>
    `
}
