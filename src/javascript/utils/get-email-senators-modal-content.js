/**
 * Generates content for Email Senators modal
 * @param {string} searchTerm - The search term to include in the email
 * @returns {string} HTML content for the modal
 */
export function getEmailSenatorsModalContent(searchTerm = '') {
  return `
    <form id="email-senators-form" class="modal-form">
      <div class="form-group">
        <label for="senator-name">Senator's Name</label>
        <input type="text" id="senator-name" name="senatorName" class="primary-input" placeholder="Enter your senator's name" required>
      </div>
      
      <div class="form-group">
        <label for="city-state-senator">Your City, State</label>
        <input type="text" id="city-state-senator" name="cityState" class="primary-input" placeholder="e.g. Columbus, OH" required>
      </div>
      
      <div class="form-group">
        <label for="personal-impact-senator">Personal Impact Statement</label>
        <textarea id="personal-impact-senator" name="personalImpact" class="primary-input" 
          placeholder="How has NIH funding for this condition impacted you personally?" 
          maxlength="500" rows="4" required></textarea>
        <div class="char-count">
          <span id="impact-senator-char-count">0</span>/500
        </div>
      </div>
      
      <div class="form-group">
        <label for="full-name-senator">Your Full Name</label>
        <input type="text" id="full-name-senator" name="fullName" class="primary-input" placeholder="Enter your full name" required>
      </div>
      
      <input type="hidden" id="search-term-senator" name="searchTerm" value="${searchTerm}">
      <input type="hidden" id="projects-count-senator" name="projectsCount" value="">
      <input type="hidden" id="publications-count-senator" name="publicationsCount" value="">
      <input type="hidden" id="patents-count-senator" name="patentsCount" value="">
      <input type="hidden" id="clinical-trials-count-senator" name="clinicalTrialsCount" value="">
      
      <button type="button" class="cta-btn preview-btn" data-modal-type="email-senators">Preview Email</button>
    </form>
  `
}

/**
 * Generate preview text for email to senators
 * @param {FormData} formData - Form data from the modal
 * @param {string} searchTerm - Search term used
 * @returns {string} Generated preview text
 */
export function generateEmailSenatorsPreviewText(formData, searchTerm) {
  // Extract form values
  const senatorName = formData.get('senatorName') || '[Senator Name]'
  const cityState = formData.get('cityState') || '[City, State]'
  const personalImpact = formData.get('personalImpact') || ''
  const fullName = formData.get('fullName') || '[Your Name]'

  // Extract city and state
  let city = ''
  let state = ''

  if (cityState) {
    const parts = cityState.split(',')
    if (parts.length >= 2) {
      city = parts[0].trim()
      state = parts[1].trim()
    }
  }

  // Get research data from hidden fields
  const projectsCount = formData.get('projectsCount') || '0'
  const publicationsCount = formData.get('publicationsCount') || '0'
  const patentsCount = formData.get('patentsCount') || '0'
  const clinicalTrialsCount = formData.get('clinicalTrialsCount') || '0'

  // Format numbers with commas
  const formatNumber = (num) => {
    return parseInt(num).toLocaleString()
  }

  // Generate the email text
  return `Subject: Protect and Expand NIH Funding

Dear Senator ${senatorName},

As your constituent from ${cityState}, I'm writing to urge your continued and expanded support for NIH funding, specifically related to ${searchTerm} research.

Since 1985, NIH investments have yielded:
* ${formatNumber(projectsCount)} innovative research projects
* ${formatNumber(publicationsCount)} peer-reviewed scientific publications
* ${formatNumber(patentsCount)} patented breakthroughs
* ${formatNumber(clinicalTrialsCount)} clinical studies improving lives

This research isn't partisan—it's essential.

${personalImpact}

Reducing NIH's budget threatens lifesaving advancements, raises health costs, and weakens America's global leadership in biomedical research. I respectfully ask you to reject any attempts to decrease NIH funding and instead support increased investments benefiting our community and the nation.

Thank you for your leadership. I look forward to your response.

Sincerely,
${fullName}
${city}, ${state}`
}
