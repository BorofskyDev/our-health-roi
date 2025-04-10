/**
 * Creates a new element with optional attributes, properties and children
 * @param {string} tag - Element tag name
 * @param {Object} options - Element options
 * @param {Object} [options.attributes] - HTML attributes to set
 * @param {Object} [options.properties] - Properties to set directly
 * @param {Array|HTMLElement} [options.children] - Child elements or text
 * @returns {HTMLElement} The created element
 */
export function createElement(
  tag,
  { attributes = {}, properties = {}, children = [] } = {}
) {
  const element = document.createElement(tag)

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })

  Object.entries(properties).forEach(([key, value]) => {
    element[key] = value
  })

  if (Array.isArray(children)) {
    children.forEach((child) => {
      appendChild(element, child)
    })
  } else if (children) {
    appendChild(element, children)
  }

  return element
}

/**
 * Appends a child to an element, handling text nodes
 * @param {HTMLElement} parent - Parent element
 * @param {HTMLElement|string} child - Child element or text
 */
function appendChild(parent, child) {
  if (typeof child === 'string') {
    parent.appendChild(document.createTextNode(child))
  } else if (child instanceof HTMLElement) {
    parent.appendChild(child)
  }
}

/**
 * Safely removes all children from an element
 * @param {HTMLElement} element - Element to clear
 */
export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

/**
 * Shows or hides an element
 * @param {HTMLElement} element - Element to show/hide
 * @param {boolean} visible - Whether to show or hide
 */
export function setElementVisibility(element, visible) {
  if (element) {
    element.hidden = !visible
  }
}
