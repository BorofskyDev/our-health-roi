

const $ = (id) => document.getElementById(id)

$('searchBtn').addEventListener('click', async () => {
  const term = $('condition').value.trim()
  if (!term) return

  $('results').hidden = true
  $('label').textContent = term

  try {
    // ───────────────── NIH PROJECTS ─────────────────
    const projPayload = {
      criteria: {
        advanced_text_search: {
          operator: 'and',
          search_field: 'all',
          search_text: term,
        },
      },
      offset: 0,
      limit: 1, // we only need meta.total
      include_fields: ['ProjectNum'],
    }

    const projRes = await fetch('/nih/v2/projects/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projPayload),
    }).then((r) => r.json())

    const totalProjects = projRes.meta.total // <-- count
    const reporterURL = projRes.meta.url // <-- deep link

    // Respect NIH rate advice (1 req/sec) – pause before next call
    await new Promise((res) => setTimeout(res, 1100))

    // ───────────────── PUBMED ─────────────────
    const pubRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&rettype=count&term=${encodeURIComponent(
        term
      )}`
    ).then((r) => r.json())

    const totalPubs = +pubRes.esearchresult.count

    // ───────────────── PATENTSVIEW ─────────────────
    const pvQuery = {
      q: {
        _or: [
          { _text_any: { patent_title: term } },
          { _text_any: { patent_abstract: term } },
        ],
      },
      f: ['patent_number'],
      o: { per_page: 1 },
    }

    const patRes = await fetch('https://api.patentsview.org/patents/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pvQuery),
    }).then((r) => r.json())

    const totalPatents = patRes.total_patent_count

    // CLINICALTRIALS - Using countTotal parameter
    const ctRes = await fetch(
      `https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(
        term
      )}&countTotal=true&pageSize=0`
    ).then(async (r) => {
      if (!r.ok) {
        const text = await r.text()
        throw new Error(`ClinicalTrials API error: ${text}`)
      }
      return r.json()
    })


    const totalTrials = ctRes.totalCount
    // ───────────────── Render ─────────────────
    $('proj').textContent = totalProjects.toLocaleString()
    $('pub').textContent = totalPubs.toLocaleString()
    $('pat').textContent = totalPatents.toLocaleString()
    $('ct').textContent = totalTrials.toLocaleString()
    $('newsLink').href = reporterURL

    $('results').hidden = false
  } catch (err) {
    alert('Something went wrong – open dev‑tools for details.')
    console.error(err)
  }
})
