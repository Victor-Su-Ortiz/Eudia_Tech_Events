import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the main heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Bay Area Tech Events')
  })

  test('should show stats cards', async ({ page }) => {
    await expect(page.locator('text=Total Events')).toBeVisible()
    await expect(page.locator('text=Upcoming')).toBeVisible()
    await expect(page.locator('text=This Week')).toBeVisible()
    await expect(page.locator('text=This Month')).toBeVisible()
  })

  test('should have working search input', async ({ page }) => {
    const searchInput = page.locator('input[type="search"]')
    await expect(searchInput).toBeVisible()
    await searchInput.fill('AI')
    await expect(searchInput).toHaveValue('AI')
  })

  test('should have filter dropdowns', async ({ page }) => {
    await expect(page.locator('button:has-text("Tags")')).toBeVisible()
    await expect(page.locator('button:has-text("Platform")')).toBeVisible()
  })

  test('should navigate to event detail page', async ({ page }) => {
    // Click on the first event card's "View Details" button
    const firstEventCard = page.locator('text=View Details').first()
    if (await firstEventCard.isVisible()) {
      await firstEventCard.click()
      await expect(page).toHaveURL(/\/events\/.*/)
    }
  })

  test('should toggle theme', async ({ page }) => {
    const themeToggle = page.locator('button[aria-label*="theme" i]')
    if (await themeToggle.isVisible()) {
      await themeToggle.click()
      // Theme dropdown should appear
      await expect(page.locator('text=Light')).toBeVisible()
      await expect(page.locator('text=Dark')).toBeVisible()
      await expect(page.locator('text=System')).toBeVisible()
    }
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('h1')).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('h1')).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('h1')).toBeVisible()
  })
})
