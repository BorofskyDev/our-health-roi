import { createExternalLink } from '../components/external-link'

export function renderResourcesSection() {
  const resources = [
    {
      href: 'https://www.nih.gov/about-nih/who-we-are',
      text: 'What the NIH Does',
      ariaLabel:
        'Find out what the NIH does for the US and the world in general (opens in a new tab)',
    },
    {
      href: 'https://www.dallasfed.org/-/media/documents/research/papers/2023/wp2305r1.pdf',
      text: 'Federal Reserve Bank of Dallas: How Federal Investments in R&D Help the Private Business Sector',
      ariaLabel:
        'How federal investments in R&D help the private business sector (opens in a new tab)',
    },
    {
      href: 'https://www.faseb.org/science-policy-and-advocacy/federal-funding-data',
      text: 'FASEB Funding Data',
      ariaLabel:
        'Data that shows how federal funding is applied state-by-state (opens in a new tab)',
    },
    {
      href: 'https://www.brookings.edu/collection/building-a-better-nih/',
      text: 'Building a Better NIH',
      ariaLabel:
        'Brookings analysis about the economic impact of the NIH (opens in a new tab)',
    },
    {
      href: 'https://www.nih.gov/news-events/nih-research-matter',
      text: 'NIH: Weekly Success Stories',
      ariaLabel:
        'Weekly success stories of how NIH funding has helped America and the world (opens in a new tab)',
    },
    {
      href: 'https://www.researchamerica.org/',
      text: 'Advocacy America: Advocating for Science, Discovery and Innovation',
      ariaLabel:
        'Advocay America is an advocacy organization for medical research funding',
    },
    {
      href: 'https://www.nih.gov/about-nih/what-we-do/nih-almanac/chronology-events',
      text: 'NIH Historical Timeline',
      ariaLabel:
        'Timeline from NIH on medical history in the US and their impact on it since their founding',
    },
  ]

  return `
          <section class="flex-col-section" id="resources">
      <h2 class="section-title mb-24 center">Resources</h2>
      ${resources
        .map(
          (resource) =>
            `<p class="external-link mb-44">
          ${createExternalLink(
            resource.href,
            resource.text,
            resource.ariaLabel
          )}
        </p>`
        )
        .join('')}
    </section>
    `
}
