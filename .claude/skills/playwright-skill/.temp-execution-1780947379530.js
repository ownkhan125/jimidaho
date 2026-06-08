const { chromium } = require('playwright')

const OUT = 'C:/Users/General/Documents/GitHub/JimIdaho/.claude/skills/playwright-skill/screenshots'

;(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 20 })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })

  /* LIGHT variant: CTA card on home */
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1100)
  const sh = await page.evaluate(() => document.body.scrollHeight)
  for (let i = 1; i <= 6; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), (sh / 6) * i)
    await page.waitForTimeout(220)
  }
  await page.evaluate(() => document.getElementById('get-involved')?.scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(700)

  const all = await page.locator('a[href="/donate"]').all()
  let donate = null
  for (const l of all) {
    const inSec = await l.evaluate((el) => document.getElementById('get-involved')?.contains(el))
    if (inSec) { donate = l; break }
  }
  if (!donate) {
    console.log('Donate not found')
    await browser.close(); return
  }
  const box = await donate.boundingBox()
  const clip = { x: box.x - 30, y: box.y - 30, width: box.width + 60, height: box.height + 60 }

  await page.mouse.move(0, 0)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/v11-light-rest.png`, clip })

  /* Use locator.hover() — more reliable than mouse.move */
  await donate.hover()
  for (const t of [60, 130, 220, 350, 700]) {
    await page.waitForTimeout(t - (t === 60 ? 0 : 60))
    await page.screenshot({ path: `${OUT}/v11-light-h${t}.png`, clip })
  }

  console.log('✅ light variant captured')

  await browser.close()
})()
