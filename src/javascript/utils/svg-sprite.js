import spriteContent from '../../assets/icons/sprite.svg?raw'

export function initSvgSprite() {
  const spriteContainer = document.createElement('div')
  spriteContainer.style.display = 'none'
  spriteContainer.innerHTML = spriteContent
  document.body.prepend(spriteContainer)
}
