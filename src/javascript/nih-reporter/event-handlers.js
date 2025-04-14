import { $, updateResultsView } from './dom-utils'
import { fetchAll} from './api' // ⬅️ one import
import { showSpinner, hideSpinner } from '../animations'
import { renderNIHResults } from '../templates/nih-results'
import { setupModalButtons } from '../components/setup-modal-buttons'

export function setupEventListeners() {
  const searchButton = $('searchBtn')
  if (searchButton) {
    searchButton.addEventListener('click', handleSearch)
  }

  const conditionInput = $('condition')
  if (conditionInput) {
    conditionInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        handleSearch()
      }
    })
  }
}

async function handleSearch() {
  ensureRequiredElementsExist()

  const conditionInput = $('condition')
  if (!conditionInput) {
    console.error('Search input element not found')
    return
  }

  const term = conditionInput.value.trim()
  if (!term) return

  const resultsSection = $('results')
  if (resultsSection) resultsSection.hidden = true

  showSpinner()

  try {
    /* ---------- ONE round‑trip instead of four ---------- */
    const data = await fetchAll(term)
    const { projects, publications, patents, trials } = data

    /* Derive the NIH Reporter base URL (same logic as before) */
    let baseUrl = ''
    if (projects?.reporterURL) {
      const match = projects.reporterURL.match(/\/search\/([^/]+)/)
      baseUrl = match
        ? `https://reporter.nih.gov/search/${match[1]}`
        : projects.reporterURL.split('/projects')[0]
    }
    if (!baseUrl)
      baseUrl = `https://reporter.nih.gov/search/${encodeURIComponent(term)}`

    hideSpinner()

    if (checkRequiredElements()) {
      if (resultsSection) resultsSection.hidden = false

      updateResultsView({
        searchTerm: term,
        projectsCount: projects.total,
        publicationsCount: publications,
        patentsCount: patents,
        trialsCount: trials,
        baseUrl,
      })

      updateModalsWithResearchData(term, {
        projects: projects.total,
        publications,
        patents,
        clinicalTrials: trials,
      })
    }
  } catch (error) {
    hideSpinner()
    alert('Something went wrong – open developer tools for details.')
    console.error('Search error:', error)
  }
}

/* ------------------------------------------------------------------ */
/* Utility helpers (unchanged)                                        */
/* ------------------------------------------------------------------ */

function ensureRequiredElementsExist() {
  const required = ['label', 'proj', 'pub', 'pat', 'ct']
  if (required.some((id) => !$(id))) renderNIHResults()
}

function checkRequiredElements() {
  const requiredElements = ['label', 'proj', 'pub', 'pat', 'ct']
  return requiredElements.every((id) => $(id))
}

function updateModalsWithResearchData(searchTerm, researchData) {
  setupModalButtons(searchTerm, researchData)
}
