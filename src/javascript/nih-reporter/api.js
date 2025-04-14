/**
 * Client‑side helper
 * ------------------
 * Hits *your own* /api/search endpoint, which aggregates
 * NIH Projects, PubMed, PatentsView and ClinicalTrials.gov.
 * Returns the JSON payload straight through.
 *
 *   {
 *     term: "melanoma",
 *     projects: { total, searchId, reporterURL },
 *     publications: <number>,
 *     patents: <number>,
 *     trials: <number>
 *   }
 */

export async function fetchAll(term) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`)
  if (!res.ok) throw new Error(`Search API error ${res.status}`)
  return await res.json()
}
