import { $, updateResultsView } from './dom-utils'
import {
  fetchProjects,
  fetchPublications,
  fetchPatents,
  fetchClinicalTrials,
} from './api'
import { showSpinner, hideSpinner } from '../animations'
import { renderNIHResults } from '../templates/nih-results'

export function setupEventListeners() {
  const searchButton = $('searchBtn')
  if (searchButton) {
    searchButton.addEventListener('click', handleSearch)
  }

  // Add event listener for Enter key in the search input
  const conditionInput = $('condition')
  if (conditionInput) {
    conditionInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()
        handleSearch()
      }
    })
  }
}

async function handleSearch() {
  // First, ensure all required elements exist
  ensureRequiredElementsExist()

  const conditionInput = $('condition')
  if (!conditionInput) {
    console.error('Search input element not found')
    return
  }

  const term = conditionInput.value.trim()
  if (!term) {
    return
  }

  const resultsSection = $('results')
  if (resultsSection) {
    resultsSection.hidden = true
  }

  // Show the loading spinner
  showSpinner()
  console.log('Spinner animation started')

  try {
    const projectsData = await fetchProjects(term)
    let baseUrl = ''

    if (projectsData.reporterURL) {
      baseUrl = `https://reporter.nih.gov/search/${projectsData.searchId}`

      const urlParts = projectsData.reporterURL.split('/')
      const searchIdIndex = urlParts.indexOf('search') + 1
      if (searchIdIndex < urlParts.length) {
        baseUrl = `https://reporter.nih.gov/search/${urlParts[searchIdIndex]}`
      }

      const match = projectsData.reporterURL.match(/\/search\/([^\/]+)/)
      if (match && match[1]) {
        baseUrl = `https://reporter.nih.gov/search/${match[1]}`
        console.log('Using search ID from regex match:', baseUrl)
      }
    }

    if (!baseUrl && projectsData.reporterURL) {
      baseUrl = projectsData.reporterURL.split('/projects')[0]
      console.log('Falling back to simple split approach:', baseUrl)
    }

    if (!baseUrl) {
      console.warn(
        'Could not determine proper NIH Reporter base URL from API response'
      )
      console.warn('Using fallback direct search URL')
      baseUrl = `https://reporter.nih.gov/search/${encodeURIComponent(term)}`
    }

    const [publicationsCount, patentsCount, trialsCount] = await Promise.all([
      fetchPublications(term),
      fetchPatents(term),
      fetchClinicalTrials(term),
    ])

    // Hide the spinner before updating the results view
    hideSpinner()

    // Double-check again if all elements exist before updating
    if (checkRequiredElements()) {
      // Make sure the results section is visible
      if (resultsSection) {
        resultsSection.hidden = false
      }

      // Update the results view
      updateResultsView({
        searchTerm: term,
        projectsCount: projectsData.total,
        publicationsCount,
        patentsCount,
        trialsCount,
        baseUrl,
      })
    } else {
      console.error(
        'Required elements missing after data fetch, cannot update results view'
      )
    }
  } catch (error) {
    // Hide the spinner on error
    hideSpinner()
    alert('Something went wrong – open developer tools for details.')
    console.error('Search error:', error)
  }
}

/**
 * Ensures all required elements exist before starting a search
 */
function ensureRequiredElementsExist() {
  const required = ['label', 'proj', 'pub', 'pat', 'ct']

  // if any of them are missing, render the template once
  if (required.some((id) => !$(id))) {
    renderNIHResults()
  }
}

/**
 * Checks if all required elements exist
 * @returns {boolean} True if all required elements exist
 */
function checkRequiredElements() {
  const requiredElements = ['label', 'proj', 'pub', 'pat', 'ct']
  const missingElements = requiredElements.filter((id) => !$(id))

  return true
}
