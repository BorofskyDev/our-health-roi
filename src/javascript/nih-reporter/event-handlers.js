import { $, updateResultsView } from './dom-utils'
import {
  fetchProjects,
  fetchPublications,
  fetchPatents,
  fetchClinicalTrials,
} from './api'

export function setupEventListeners() {
  const searchButton = $('searchBtn')
  if (searchButton) {
    searchButton.addEventListener('click', handleSearch)
  }
}

async function handleSearch() {
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

    await new Promise((resolve) => setTimeout(resolve, 1100))

    const [publicationsCount, patentsCount, trialsCount] = await Promise.all([
      fetchPublications(term),
      fetchPatents(term),
      fetchClinicalTrials(term),
    ])

    updateResultsView({
      searchTerm: term,
      projectsCount: projectsData.total,
      publicationsCount,
      patentsCount,
      trialsCount,
      baseUrl,
    })
  } catch (error) {
    alert('Something went wrong – open developer tools for details.')
    console.error('Search error:', error)
  }
}
