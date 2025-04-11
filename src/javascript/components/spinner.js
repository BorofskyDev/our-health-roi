// src/javascript/components/spinner.js

/**
 * Creates the loading container with a gradient spinner.
 * Returns the container element so the caller can insert it.
 */
export function createSpinner({
  id = 'loading-container',
  gradientStops = [
    'hsl(var(--color-primary))',
    'hsl(var(--color-accent))',
    'hsl(var(--color-primary))',
    'hsl(var(--color-accent))', // ← fixed typo
  ],
  size = 120,
  strokeWidth = 10,
} = {}) {
  const NS = 'http://www.w3.org/2000/svg'

  /* container */
  const container = document.createElement('div')
  container.id = id
  container.className = 'loading-container'
  container.style.display = 'none'

  /* svg */
  const svg = document.createElementNS(NS, 'svg')
  svg.classList.add('loading-svg')
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`)

  /* gradient */
  const defs = svg.appendChild(document.createElementNS(NS, 'defs'))
  const gradient = document.createElementNS(NS, 'linearGradient')
  gradient.id = `${id}-gradient`
  gradient.setAttribute('x1', '0%')
  gradient.setAttribute('y1', '0%')
  gradient.setAttribute('x2', '100%')
  gradient.setAttribute('y2', '100%')

  gradientStops.forEach((color, i) => {
    const stop = document.createElementNS(NS, 'stop')
    stop.setAttribute('offset', `${(i / (gradientStops.length - 1)) * 100}%`)
    stop.setAttribute('stop-color', color)
    gradient.appendChild(stop)
  })
  defs.appendChild(gradient)

  /* background track */
  const track = document.createElementNS(NS, 'circle')
  track.setAttribute('cx', size / 2)
  track.setAttribute('cy', size / 2)
  track.setAttribute('r', size / 2 - strokeWidth)
  track.setAttribute('fill', 'none')
  track.setAttribute('stroke', 'var(--color-accent)')
  track.setAttribute('stroke-width', strokeWidth)

  /* animated arc */
  const arc = document.createElementNS(NS, 'circle')
  arc.setAttribute('cx', size / 2)
  arc.setAttribute('cy', size / 2)
  arc.setAttribute('r', size / 2 - strokeWidth)
  arc.setAttribute('fill', 'none')
  arc.setAttribute('stroke', `url(#${gradient.id})`)
  arc.setAttribute('stroke-width', strokeWidth)
  arc.setAttribute('stroke-dasharray', '80 235')
  arc.setAttribute('stroke-linecap', 'round')
  arc.classList.add('spinner-arc')

  svg.append(track, arc)

  /* label */
  const label = document.createElement('span')
  label.className = 'loading-text'
  label.textContent = 'Loading results…'

  container.append(svg, label)
  return container
}
