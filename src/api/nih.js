export default async function handler(req, res) {
  const response = await fetch(
    'https://api.reporter.nih.gov/v2/projects/search',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }
  )
  const data = await response.json()
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.status(200).json(data)
}
