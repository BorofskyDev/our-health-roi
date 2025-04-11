// api/nih/[...path].js
export default async function handler(req, res) {
  const { path } = req.query
  const apiPath = Array.isArray(path) ? path.join('/') : path
  const targetUrl = `https://api.reporter.nih.gov/${apiPath}`

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward other necessary headers, but strip out host-specific ones
        ...Object.fromEntries(
          Object.entries(req.headers).filter(
            ([key]) =>
              !['host', 'connection', 'content-length'].includes(
                key.toLowerCase()
              )
          )
        ),
      },
      body:
        req.method !== 'GET' && req.method !== 'HEAD'
          ? JSON.stringify(req.body)
          : undefined,
    })

    const data = await response.json()

    // Forward the response status
    res.status(response.status)

    // Return the data
    return res.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return res.status(500).json({
      error: 'Failed to fetch from NIH API',
      details: error.message,
    })
  }
}
