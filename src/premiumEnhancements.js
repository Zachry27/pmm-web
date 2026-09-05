import { IMAGES, SERVICES_LIST } from './data.js'

// Context-first imagery: keep existing brand palette and local assets,
// but replace known mismatches with location-appropriate photography.
const IMAGE_OVERRIDES = {
  thaif: 'https://images.unsplash.com/photo-1705428193181-0cea0bf8e814?auto=format&fit=crop&w=1400&q=82',
  jeddah: 'https://images.unsplash.com/photo-1622279489530-87c8a8da9b8d?auto=format&fit=crop&w=1400&q=82',
}

Object.assign(IMAGES, IMAGE_OVERRIDES)

const serviceImageByName = {
  'Transportasi Darat di Saudi': '/hhr_train_opt.jpg',
  'Booking Hotel Mekah & Madinah': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=82',
  'Tiket Kereta Cepat Haramain (HHR)': '/hhr_train_opt.jpg',
}

SERVICES_LIST.forEach((service) => {
  if (serviceImageByName[service.n]) service.img = serviceImageByName[service.n]
})

function installPremiumProgress() {
  if (document.querySelector('[data-pmm-scroll-progress]')) return
  const track = document.createElement('div')
  track.dataset.pmmScrollProgress = 'true'
  track.setAttribute('aria-hidden', 'true')
  track.className = 'pmm-scroll-progress'
  const bar = document.createElement('div')
  bar.className = 'pmm-scroll-progress__bar'
  track.appendChild(bar)
  document.body.appendChild(track)

  let ticking = false
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    bar.style.transform = `scaleX(${value})`
    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })
  update()
}

function improveImageSemantics() {
  document.querySelectorAll('img').forEach((img) => {
    img.decoding = 'async'
    if (!img.hasAttribute('loading') && !img.closest('header')) img.loading = 'lazy'
  })
}

function markContentRhythm() {
  document.body.dataset.pmmPremium = 'true'
  document.querySelectorAll('main section').forEach((section, index) => {
    section.dataset.sectionIndex = String(index + 1)
  })
}

function markSimulatorLayout() {
  const main = document.querySelector('main')
  if (!main) return

  const text = main.textContent || ''
  const isSimulator = text.includes('Handling & Muthawif') && text.includes('Kendaraan & Rute')
  document.body.dataset.pmmSimulator = isSimulator ? 'true' : 'false'
  main.classList.toggle('pmm-simulator-root', isSimulator)

  if (!isSimulator) return

  // Mark the smallest useful blocks around long simulator content so mobile CSS
  // can target them without coupling React logic to presentation details.
  const markers = [
    ['Handling & Muthawif', 'pmm-handling-panel'],
    ['Kendaraan & Rute', 'pmm-route-panel'],
    ['Hotel', 'pmm-hotel-panel'],
  ]

  const elements = Array.from(main.querySelectorAll('div, section, article'))
  markers.forEach(([needle, className]) => {
    const matches = elements.filter((el) => {
      const t = (el.textContent || '').trim()
      return t.includes(needle) && t.length < 9000
    })
    matches.sort((a, b) => (a.textContent || '').length - (b.textContent || '').length)
    if (matches[0]) matches[0].classList.add(className)
  })

  // Long option rows (checkbox + title + description) need their own responsive hook.
  elements.forEach((el) => {
    const t = (el.textContent || '').trim()
    const hasCheckbox = Boolean(el.querySelector('input[type="checkbox"]'))
    if (hasCheckbox && t.length > 25 && t.length < 420) {
      el.classList.add('pmm-simulator-option')
    }
  })
}

function runEnhancements() {
  improveImageSemantics()
  markContentRhythm()
  markSimulatorLayout()
}

function boot() {
  installPremiumProgress()
  runEnhancements()

  let queued = false
  const observer = new MutationObserver(() => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      runEnhancements()
      queued = false
    })
  })
  observer.observe(document.getElementById('root'), { childList: true, subtree: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}
