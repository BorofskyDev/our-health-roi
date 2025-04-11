export function getEmailRepModalContent(searchTerm = '') {
  return `
    <form id="email-rep-form" class="modal-form">
      <div class="form-group">
        <label for="rep-name">Representative's Name</label>
        <input type="text" id="rep-name" name="repName" class="primary-input" placeholder="Enter your representative's name" required>
      </div>
      
      <div class="form-group">
        <label for="city-state">Your City, State</label>
        <input type="text" id="city-state" name="cityState" class="primary-input" placeholder="e.g. Columbus, OH" required>
      </div>
      
      <div class="form-group">
        <label for="personal-impact">Personal Impact Statement</label>
        <textarea id="personal-impact" name="personalImpact" class="primary-input" 
          placeholder="How has NIH funding for this condition impacted you personally?" 
          maxlength="500" rows="4" required></textarea>
        <div class="char-count">
          <span id="impact-char-count">0</span>/500
        </div>
      </div>
      
      <div class="form-group">
        <label for="full-name">Your Full Name</label>
        <input type="text" id="full-name" name="fullName" class="primary-input" placeholder="Enter your full name" required>
      </div>
      
      <input type="hidden" id="search-term" name="searchTerm" value="${searchTerm}">
      <input type="hidden" id="projects-count" name="projectsCount" value="">
      <input type="hidden" id="publications-count" name="publicationsCount" value="">
      <input type="hidden" id="patents-count" name="patentsCount" value="">
      <input type="hidden" id="clinical-trials-count" name="clinicalTrialsCount" value="">
      
      <button type="button" class="cta-btn preview-btn" data-modal-type="email-rep">Preview Email</button>
    </form>
  `
}

export function generateEmailRepPreviewText(formData, searchTerm) {
  // Extract form values
  const repName = formData.get('repName') || '[Representative Name]'
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
  return `Dear Representative ${repName},

I'm writing as a constituent from ${cityState} about NIH support for ${searchTerm} research.

Since 1985, the National Institutes of Health has funded:

${formatNumber(projectsCount)} research projects

${formatNumber(publicationsCount)} peer-reviewed publications

${formatNumber(patentsCount)} patented discoveries

${formatNumber(clinicalTrialsCount)} clinical studies

These investments are not partisan - they are lifesaving.

${personalImpact}

Cuts to the NIH budget would stall breakthroughs, increase health‑care costs, and put American leadership in science at risk. I urge you to oppose any proposal that reduces NIH funding and, instead, champion increased support for biomedical research that saves lives and drives economic growth in every district—including ours.

Thank you for your time and service. I look forward to your response.

Sincerely,
${fullName}
${city}, ${state}`
}
