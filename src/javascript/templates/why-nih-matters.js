export function renderWhyNIHMatters() {
  const ctaContainer = document.getElementById('finalCTA')
  if (!ctaContainer) return

  ctaContainer.innerHTML = generateWhyNIHMattersHTML()
}

/**
 * Generates HTML for the Why NIH Matters section
 * @returns {string} HTML content
 */
function generateWhyNIHMattersHTML() {
  const paragraphs = [
    "Every year, a few pennies from each tax dollar you send to Washington go to the National Institutes of Health. It isn't much - usually less than one percent of the federal budget. For most of us that works out to pocket change, only a few dollars a year.",
    'Yet those small coins buy something priceless: time with family, second chances, and healthier lives. NIH grants have helped create vaccines, cancer drugs, insulin pumps, and even the bandages used in combat hospitals on our American military members. If you have ever taken a prescription, received a flu shot, or watched a love one beat an illness, odds are NIH-funded science played a part.',
    'That is an amazing return on investment (ROI). A handful of dollars becomes treatments worth billions - and hope worth far more. Private companies finish the job, but the hard, risky work often starts with public research dollars we pool together.',
    'Paying taxes can feel like money lost. In truth, it is money shared. When we fund the NIH, we are betting on ourselves and on one another. We are saying that every American life is worth saving, whether that life sits next door or across the country.',
    'That is patriotism as its best. Not waving a bigger flag or shouting the loudest, but quietly building a nation where cures keep coming and no solution is left undiscovered because it was too early, too hard, or not yet profitable.',
    'So the next time you fill a prescription, cheer a cancer-free friend, or read about a new therapy, remember: you helped make it happen. A few dollars. A huge return. Our health ROI.',
  ]

  return `
    <section class="flex-col-section" id="finalCTA">
      <h2 class="section-title mb-24 center">Why The NIH Matters</h2>
      ${paragraphs
        .map((paragraph) => `<p class="body-text body-width">${paragraph}</p>`)
        .join('')}
    </section>
  `
}
