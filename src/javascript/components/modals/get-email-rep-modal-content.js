// Update the email rep modal content in addModalsToDOM function

// src/javascript/components/get-email-rep-modal-content.js
function getEmailRepModalContent(searchTerm = '') {
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

// Update generatePreviewText function to handle the email rep form
