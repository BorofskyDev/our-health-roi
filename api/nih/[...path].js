// api/nih/[...path].js
export default async function handler(req, res) {
  try {
    // Parse the path from the request query
    const pathSegments = req.query.path || []
    const apiPath = Array.isArray(pathSegments)
      ? pathSegments.join('/')
      : pathSegments

    // Construct the target URL
    const targetUrl = `https://api.reporter.nih.gov/${apiPath}`

    // Get the request body
    let body
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = req.body
    }

    // Forward the request to the NIH API
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers needed
      },
      ...(body && { body: JSON.stringify(body) }),
    })

    // Check if response is OK
    if (!response.ok) {
      // Forward the error status
      return res.status(response.status).json({
        error: `NIH API returned ${response.status}`,
        details: await response.text(),
      })
    }

    // Parse the response as JSON and return it
    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return res.status(500).json({
      error: 'Failed to fetch from NIH API',
      details: error.message,
    })
  }
}
