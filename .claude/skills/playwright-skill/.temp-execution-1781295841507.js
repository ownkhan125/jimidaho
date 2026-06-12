const { chromium } = require('playwright')

const BASE = 'http://localhost:3007'
const OUT = process.env.TEMP || '/tmp'

;(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  // Desktop nav
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  const navLabels = await page.locator('header nav a').allInnerTexts()
  console.log('desktop nav labels:', navLabels)
  await page.screenshot({ path: `${OUT}/dbg-nav-desktop.png`, fullPage: false })

  // 1280 narrower laptop
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/dbg-nav-1280.png`, fullPage: false })

  // Mobile menu open
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.locator('button[aria-label="Open menu"]').click()
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${OUT}/dbg-nav-mobile-open.png`, fullPage: false })

  await browser.close()
  console.log('DONE')
})().catch((e) => {
  console.error('FATAL:', e && e.stack ? e.stack : e)
  process.exit(1)
})
