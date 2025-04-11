export function setupModalButtons() {
  const modalButtons = document.querySelectorAll(
    '[id^="modal"], [id^="emailRep"], [id^="callRep"]'
  )

  modalButtons.forEach((button) => {
    button.addEventListener('click', function () {
      console.log(`Button clicked: ${this.id}`)
    })
  })
}
