// api/search.js 


const {
  fetchProjects,
  fetchPublications,
  fetchPatents,
  fetchClinicalTrials,
} = require('../javascript/utils/fetchers')

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const term = (req.query.q || '').trim().toLowerCase()
  if (!term) {
    res.status(400).json({ error: 'Missing q query param' })
    return
  }

  try {
    const [projects, publications, patents, trials] = await Promise.all([
      fetchProjects(term),
      fetchPublications(term),
      fetchPatents(term),
      fetchClinicalTrials(term),
    ])

    /** 24‑hour CDN cache (you can tweak) */
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')

    res.status(200).json({
      term,
      projects,
      publications,
      patents,
      trials,
    })
  } catch (err) {
    console.error('Aggregator error:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
