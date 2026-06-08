const { chromium } = require('playwright')

const PAGES = [
  '/',
  '/about',
  '/platform',
  '/events',
  '/events/town-hall-coeur-dalene',
  '/endorsements',
  '/volunteer',
  '/contact',
  '/donate',
]

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })
  const issues = []
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning')
      issues.push(`[${m.type()}] @${page.url()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => issues.push(`[pageerror] @${page.url()}: ${e.message}`))

  for (const p of PAGES) {
    try {
      await page.goto(`http://localhost:3000${p}`, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(700)
      console.log(`✅ ${p}`)
    } catch (e) {
      console.log(`❌ ${p}: ${e.message}`)
    }
  }

  console.log('\n=== Console messages ===')
  console.log(issues.length === 0 ? '✅ none' : issues.join('\n'))
  await browser.close()
})()
