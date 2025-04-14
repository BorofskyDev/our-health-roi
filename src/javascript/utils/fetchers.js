// lib/fetchers.js
/* eslint-disable no-console */

async function fetchProjects(term) {
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

  const res = await fetch('https://api.reporter.nih.gov/v2/projects/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(`NIH error ${res.status}`)

  const data = await res.json()
  return {
    total: data.meta?.total || 0,
    searchId: data.meta?.search_id || null,
    reporterURL: data.meta?.properties?.URL || null,
  }
}

async function fetchPublications(term) {
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&rettype=count&term=${encodeURIComponent(
    term
  )}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`PubMed error ${res.status}`)

  const data = await res.json()
  return +data.esearchresult?.count || 0
}

async function fetchPatents(term) {
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

  const res = await fetch('https://api.patentsview.org/patents/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(`PatentsView error ${res.status}`)

  const data = await res.json()
  return data.total_patent_count || 0
}

async function fetchClinicalTrials(term) {
  const url = `https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(
    term
  )}&countTotal=true&pageSize=0`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`CT.gov error ${res.status}`)

  const data = await res.json()
  return data.totalCount || 0
}

module.exports = {
  fetchProjects,
  fetchPublications,
  fetchPatents,
  fetchClinicalTrials,
}
