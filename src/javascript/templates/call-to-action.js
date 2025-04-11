import { createContactSection } from '../components/contact-section'

export function renderCallToAction() {
  const ctaContainer = document.getElementById('cta')
  if (!ctaContainer) return

  ctaContainer.innerHTML = generateCallToActionHTML()
}

/**
 * Generates HTML for the Call to Action section
 * @returns {string} HTML content
 */
function generateCallToActionHTML() {
  return `
    <section class="flex-col-section" id="cta">
      <h2 class="section-title">What To Do About It</h2>
      <p class="body-text body-width">
        If the above information has played an impact in your life or in the
        life of someone close to you, then you need the NIH. Don't let
        billionaires or politicians slash that lifeline. Email and call your
        U.S. representative and both senators today; share your story, thank
        them for past support, and urge them to protect and grow NIH funding.
        Our personal message can keep the breakthroughs coming.
      </p>
      
      ${createContactSection({
        title: 'Contact your representative',
        findLink: {
          href: 'https://www.house.gov/representatives/find-your-representative',
          text: 'Find My Representative',
          ariaLabel:
            'Visit site to find your US Congressional Rep (opens in a new tab)',
        },
        emailButton: {
          text: 'Email My Rep',
          id: 'emailRepBtn',
        },
        callButton: {
          text: 'Call My Rep',
          id: 'callRepBtn',
        },
      })}
      
      ${createContactSection({
        title: 'Contact your senators',
        findLink: {
          href: 'https://www.senate.gov/senators/senators-contact.htm',
          text: 'Find My Senators',
          ariaLabel: 'Visit site to find your US Senators (opens in a new tab)',
        },
        emailButton: {
          text: 'Email My Senators',
          id: 'emailSenatorsBtn',
        },
        callButton: {
          text: 'Call My Senators',
          id: 'callSenatorsBtn',
        },
      })}
    </section>
  `
}
