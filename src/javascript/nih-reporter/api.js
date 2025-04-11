//  src/javascript/components/external-link.js

/**
 * Fetch NIH projects data
 * @param {string} term - Search term
 * @returns {Promise<Object>} Projects data with total count and reporter URL
 */

export async function fetchProjects(term) {
  try {
    const payload = {
      criteria: {
        advanced_text_search: {
          operator: 'and',
          search_field: 'all',
          search_text: term,
        },
      },
      offset: 0,
      limit: 1,
      include_fields: ['ProjectNum'],
    }

    const response = await fetch('/nih/v2/projects/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`NIH Projects API error: ${response.status}`)
    }

    const data = await response.json()
    const searchId = data.meta?.search_id || null
    const reporterURL = data.meta?.properties?.URL || null

    return {
      total: data.meta?.total || 0,
      searchId,
      reporterURL,
    }
  } catch (error) {
    console.error('Error fetching NIH projects:', error)
    return { total: 0, reporterURL: null }
  }
}

/**
 * Fetch PubMed publications count
 * @param {string} term - Search term
 * @returns {Promise<number>} Total publications count
 */
export async function fetchPublications(term) {
  try {
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&rettype=count&term=${encodeURIComponent(
      term
    )}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`PubMed API error: ${response.status}`)
    }

    const data = await response.json()
    return +(data.esearchresult?.count || 0)
  } catch (error) {
    console.error('Error fetching publications:', error)
    return 0
  }
}

/**
 * Fetch patents count
 * @param {string} term - Search term
 * @returns {Promise<number>} Total patents count
 */
export async function fetchPatents(term) {
  try {
    const payload = {
      q: {
        _or: [
          { _text_any: { patent_title: term } },
          { _text_any: { patent_abstract: term } },
        ],
      },
      f: ['patent_number'],
      o: { per_page: 1 },
    }

    const response = await fetch('https://api.patentsview.org/patents/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`PatentsView API error: ${response.status}`)
    }

    const data = await response.json()
    return data.total_patent_count || 0
  } catch (error) {
    console.error('Error fetching patents:', error)
    return 0
  }
}

/**
 * Fetch clinical trials count
 * @param {string} term - Search term
 * @returns {Promise<number>} Total clinical trials count
 */
export async function fetchClinicalTrials(term) {
  try {
    const url = `https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(
      term
    )}&countTotal=true&pageSize=0`
    const response = await fetch(url)

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`ClinicalTrials API error: ${text}`)
    }

    const data = await response.json()
    return data.totalCount || 0
  } catch (error) {
    console.error('Error fetching clinical trials:', error)
    return 0
  }
}
