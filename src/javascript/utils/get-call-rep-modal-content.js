// src/javascript/utils/get-call-rep-modal-content.js

/**
 * Generates content for Call Representative modal
 * @param {string} searchTerm - The search term to include in the script
 * @returns {string} HTML content for the modal
 */
export function getCallRepModalContent(searchTerm = '') {
  return `
    <form id="call-rep-form" class="modal-form">
      <div class="instructions mb-24">
        <p>This script will help you when calling your representative about NIH research funding for ${searchTerm || 'your condition'}.</p>
      </div>

      <div class="form-group">
        <label for="rep-name-call">Representative's Name</label>
        <input type="text" id="rep-name-call" name="repName" class="primary-input" placeholder="Enter your representative's name" required>
      </div>
      
      <div class="form-group">
        <label for="city-state-call">Your City, State</label>
        <input type="text" id="city-state-call" name="cityState" class="primary-input" placeholder="e.g. Columbus, OH" required>
      </div>
      
      <div class="form-group">
        <label for="personal-impact-call">Personal Impact Statement</label>
        <textarea id="personal-impact-call" name="personalImpact" class="primary-input" 
          placeholder="Briefly explain how NIH funding for this condition has affected you or someone you care about"
          maxlength="250" rows="3" required></textarea>
        <div class="char-count">
          <span id="impact-call-char-count">0</span>/250
        </div>
      </div>
      
      <div class="form-group">
        <label for="full-name-call">Your Full Name</label>
        <input type="text" id="full-name-call" name="fullName" class="primary-input" placeholder="Enter your full name" required>
      </div>
      
      <input type="hidden" id="search-term-call" name="searchTerm" value="${searchTerm}">
      <input type="hidden" id="projects-count-call" name="projectsCount" value="">
      <input type="hidden" id="publications-count-call" name="publicationsCount" value="">
      <input type="hidden" id="patents-count-call" name="patentsCount" value="">
      <input type="hidden" id="clinical-trials-count-call" name="clinicalTrialsCount" value="">
      
      <button type="button" class="cta-btn preview-btn" data-modal-type="call-rep">Preview Call Script</button>
    </form>
  `;
}

/**
 * Generate preview text for call to representative
 * @param {FormData} formData - Form data from the modal
 * @param {string} searchTerm - Search term used
 * @returns {string} Generated preview text
 */
export function generateCallRepPreviewText(formData, searchTerm) {
  // Extract form values
  const repName = formData.get('repName') || '[Representative Name]';
  const cityState = formData.get('cityState') || '[City, State]';
  const personalImpact = formData.get('personalImpact') || '';
  const fullName = formData.get('fullName') || '[Your Name]';
  
  // Extract city and state
  let city = '';
  let state = '';
  
  if (cityState) {
    const parts = cityState.split(',');
    if (parts.length >= 2) {
      city = parts[0].trim();
      state = parts[1].trim();
    }
  }
  
  // Get research data from hidden fields
  const projectsCount = formData.get('projectsCount') || '0';
  const publicationsCount = formData.get('publicationsCount') || '0';
  const patentsCount = formData.get('patentsCount') || '0';
  const clinicalTrialsCount = formData.get('clinicalTrialsCount') || '0';
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return parseInt(num).toLocaleString();
  };
  
  // Generate the call script
  return `Hello, my name is ${fullName}, and I'm a constituent from ${cityState}. I'm calling to urge Representative ${repName} to strongly support NIH funding for ${searchTerm} research.

Since 1985, NIH funding has supported ${formatNumber(projectsCount)} research projects, ${formatNumber(publicationsCount)} publications, ${formatNumber(patentsCount)} patents, and ${formatNumber(clinicalTrialsCount)} clinical trials. This research saves lives, lowers healthcare costs, and strengthens our economy.

${personalImpact}

Please oppose any proposed cuts to NIH funding and champion increased support for medical research.

Thank you for your time and consideration.`;
}