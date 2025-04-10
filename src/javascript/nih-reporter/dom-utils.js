/**
 * Get element by ID - shorthand
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} - The found element or null
 */
export const $ = (id) => document.getElementById(id)
/**
 * Creates a linked element with the count data
 * @param {string} id - The ID of the element
 * @param {number} count - The count to display
 * @param {string} href - The URL to link to
 */
function createLinkElement(id, count, href) {
  const spanElement = $(id)
  if (!spanElement) {
    console.error(`Element with ID "${id}" not found.`)
    return
  }

  const parentElement = spanElement.parentElement
  if (!parentElement) {
    console.error(`Parent element not found for ID "${id}".`)
    return
  }

  
  const linkElement = document.createElement('a')
  linkElement.href = href
  linkElement.target = '_blank'
  linkElement.rel = 'noopener'
  linkElement.className = 'external-link'
  linkElement.id = `${id}-link`

 
  linkElement.textContent = count !== undefined ? count.toLocaleString() : 'N/A'


  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  )
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svgElement.setAttribute('x', '0px')
  svgElement.setAttribute('y', '0px')
  svgElement.setAttribute('width', '16') 
  svgElement.setAttribute('height', '16') 
  svgElement.setAttribute('viewBox', '0 0 64 64')
  svgElement.setAttribute('aria-hidden', 'true')

  const pathElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  pathElement.setAttribute(
    'd',
    'M 47.585938 -0.140625 C 47.035156 -0.140625 46.585938 0.304688 46.585938 0.859375 L 46.585938 6.515625 C 46.585938 7.066406 47.035156 7.515625 47.585938 7.515625 L 50.828125 7.515625 L 48.34375 10 L 9 10 C 7.347656 10 6 11.347656 6 13 L 6 55 C 6 56.652344 7.347656 58 9 58 L 51 58 C 52.652344 58 54 56.652344 54 55 L 54 15.65625 L 56.484375 13.171875 L 56.484375 16.414063 C 56.484375 16.964844 56.929688 17.414063 57.484375 17.414063 L 63.140625 17.414063 C 63.417969 17.414063 63.667969 17.300781 63.847656 17.121094 C 64.03125 16.941406 64.140625 16.691406 64.140625 16.414063 L 64.140625 0.859375 C 64.140625 0.304688 63.695313 -0.140625 63.140625 -0.140625 Z M 48.585938 1.859375 L 62.140625 1.859375 L 62.140625 15.414063 L 58.484375 15.414063 L 58.484375 10.757813 C 58.484375 10.351563 58.242188 9.988281 57.867188 9.832031 C 57.492188 9.675781 57.0625 9.765625 56.777344 10.050781 L 32.980469 33.847656 L 30.152344 31.019531 L 53.949219 7.222656 C 54.234375 6.9375 54.320313 6.507813 54.167969 6.132813 C 54.011719 5.757813 53.648438 5.515625 53.242188 5.515625 L 48.585938 5.515625 Z M 9 12 L 46.34375 12 L 28.03125 30.3125 C 27.636719 30.703125 27.636719 31.339844 28.03125 31.730469 L 32.269531 35.96875 C 32.664063 36.363281 33.296875 36.363281 33.6875 35.96875 L 52 17.65625 L 52 55 C 52 55.550781 51.550781 56 51 56 L 9 56 C 8.449219 56 8 55.550781 8 55 L 8 13 C 8 12.449219 8.449219 12 9 12 Z M 10 50 C 9.449219 50 9 50.449219 9 51 L 9 53 C 9 53.550781 9.449219 54 10 54 C 10.550781 54 11 53.550781 11 53 L 11 51 C 11 50.449219 10.550781 50 10 50 Z M 15 50 C 14.449219 50 14 50.449219 14 51 L 14 53 C 14 53.550781 14.449219 54 15 54 C 15.550781 54 16 53.550781 16 53 L 16 51 C 16 50.449219 15.550781 50 15 50 Z M 20 50 C 19.449219 50 19 50.449219 19 51 L 19 53 C 19 53.550781 19.449219 54 20 54 C 20.550781 54 21 53.550781 21 53 L 21 51 C 21 50.449219 20.550781 50 20 50 Z M 25 50 C 24.449219 50 24 50.449219 24 51 L 24 53 C 24 53.550781 24.449219 54 25 54 C 25.550781 54 26 53.550781 26 53 L 26 51 C 26 50.449219 25.550781 50 25 50 Z M 30 50 C 29.449219 50 29 50.449219 29 51 L 29 53 C 29 53.550781 29.449219 54 30 54 C 30.550781 54 31 53.550781 31 53 L 31 51 C 31 50.449219 30.550781 50 30 50 Z M 35 50 C 34.449219 50 34 50.449219 34 51 L 34 53 C 34 53.550781 34.449219 54 35 54 C 35.550781 54 36 53.550781 36 53 L 36 51 C 36 50.449219 35.550781 50 35 50 Z M 40 50 C 39.449219 50 39 50.449219 39 51 L 39 53 C 39 53.550781 39.449219 54 40 54 C 40.550781 54 41 53.550781 41 53 L 41 51 C 41 50.449219 40.550781 50 40 50 Z M 45 50 C 44.449219 50 44 50.449219 44 51 L 44 53 C 44 53.550781 44.449219 54 45 54 C 45.550781 54 46 53.550781 46 53 L 46 51 C 46 50.449219 45.550781 50 45 50 Z M 50 50 C 49.449219 50 49 50.449219 49 51 L 49 53 C 49 53.550781 49.449219 54 50 54 C 50.550781 54 51 53.550781 51 53 L 51 51 C 51 50.449219 50.550781 50 50 50 Z'
  )

  svgElement.appendChild(pathElement)

  
  const spaceNode = document.createTextNode(' ')
  linkElement.appendChild(spaceNode)


  linkElement.appendChild(svgElement)

  parentElement.innerHTML = ''
  parentElement.appendChild(linkElement)
}
/**
 * Updates the results section with fetched data
 * @param {Object} data - Data object containing counts and base URL
 */
export function updateResultsView(data) {
  const {
    searchTerm,
    projectsCount,
    publicationsCount,
    patentsCount,
    trialsCount,
    baseUrl,
  } = data

  $('label').textContent = searchTerm

  createLinkElement('proj', projectsCount, `${baseUrl}/projects`)
  createLinkElement('pub', publicationsCount, `${baseUrl}/publications`)
  createLinkElement('pat', patentsCount, `${baseUrl}/patents`)
  createLinkElement('ct', trialsCount, `${baseUrl}/clinicalStudies`)

  const newsLink = $('newsLink')
  if (newsLink) {
    newsLink.href = `${baseUrl}/news`
  }

  const resultsSection = $('results')
  if (resultsSection) {
    resultsSection.hidden = false
  }
}
