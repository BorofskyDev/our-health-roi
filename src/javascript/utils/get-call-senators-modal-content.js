/**
 * Generates content for Call Senators modal
 * @param {string} searchTerm - The search term to include in the script
 * @returns {string} HTML content for the modal
 */
export function getCallSenatorsModalContent(searchTerm = '') {
  return `
    <form id="call-senators-form" class="modal-form">
      <div class="instructions mb-24">
        <p>This script will help you when calling your senator about NIH research funding for ${
          searchTerm || 'your condition'
        }.</p>
      </div>

      <div class="form-group">
        <label for="senator-name-call">Senator's Name</label>
        <input type="text" id="senator-name-call" name="senatorName" class="primary-input" placeholder="Enter your senator's name" required>
      </div>
      
      <div class="form-group">
        <label for="city-state-call-senator">Your City, State</label>
        <input type="text" id="city-state-call-senator" name="cityState" class="primary-input" placeholder="e.g. Columbus, OH" required>
      </div>
      
      <div class="form-group">
        <label for="personal-impact-call-senator">Personal Impact Statement</label>
        <textarea id="personal-impact-call-senator" name="personalImpact" class="primary-input" 
          placeholder="Briefly explain how NIH funding for this condition has affected you or someone you care about"
          maxlength="250" rows="3" required></textarea>
        <div class="char-count">
          <span id="impact-call-senator-char-count">0</span>/250
        </div>
      </div>
      
      <div class="form-group">
        <label for="full-name-call-senator">Your Full Name</label>
        <input type="text" id="full-name-call-senator" name="fullName" class="primary-input" placeholder="Enter your full name" required>
      </div>
      
      <input type="hidden" id="search-term-call-senator" name="searchTerm" value="${searchTerm}">
      <input type="hidden" id="projects-count-call-senator" name="projectsCount" value="">
      <input type="hidden" id="publications-count-call-senator" name="publicationsCount" value="">
      <input type="hidden" id="patents-count-call-senator" name="patentsCount" value="">
      <input type="hidden" id="clinical-trials-count-call-senator" name="clinicalTrialsCount" value="">
      
      <button type="button" class="cta-btn preview-btn" data-modal-type="call-senators">Preview Call Script</button>
    </form>
  `
}

/**
 * Generate preview text for call to senators
 * @param {FormData} formData - Form data from the modal
 * @param {string} searchTerm - Search term used
 * @returns {string} Generated preview text
 */
export function generateCallSenatorsPreviewText(formData, searchTerm) {
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

  // Generate the call script
  return `Hello, my name is ${fullName}, and I live in ${cityState}. I'm calling to urge Senator ${senatorName} to strongly support NIH funding, particularly in the area of ${searchTerm} research.

Since 1985, NIH has funded ${formatNumber(
    projectsCount
  )} projects, ${formatNumber(
    publicationsCount
  )} scientific papers, ${formatNumber(
    patentsCount
  )} patents, and ${formatNumber(
    clinicalTrialsCount
  )} clinical trials. These efforts save lives, keep healthcare affordable, and strengthen American innovation.

${personalImpact}

I ask the Senator to oppose cuts to NIH funding and to advocate for greater investment in vital biomedical research.

Thank you very much for your consideration.`
}
