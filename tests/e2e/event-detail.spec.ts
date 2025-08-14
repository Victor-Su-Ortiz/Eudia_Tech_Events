import { test, expect } from '@playwright/test'

test.describe('Event Detail Page', () => {
  test('should display event information', async ({ page }) => {
    // Navigate to a specific event page
    await page.goto('/events/ai-agents-hackathon-2025')
    
    // Check for main event title
    await expect(page.locator('h1')).toContainText('AI Agents Hackathon 2025')
    
    // Check for event details card
    await expect(page.locator('text=Event Details')).toBeVisible()
    
    // Check for date/time information
    await expect(page.locator('text=/Feb.*2025/')).toBeVisible()
    
    // Check for venue information
    await expect(page.locator('text=GitHub HQ')).toBeVisible()
    
    // Check for tags
    await expect(page.locator('text=AI')).toBeVisible()
    await expect(page.locator('text=Agents')).toBeVisible()
  })

  test('should have working action buttons', async ({ page }) => {
    await page.goto('/events/ai-agents-hackathon-2025')
    
    // Check for external link button
    const externalLink = page.locator('a:has-text("View on Luma")')
    await expect(externalLink).toBeVisible()
    await expect(externalLink).toHaveAttribute('target', '_blank')
    
    // Check for calendar button
    await expect(page.locator('button:has-text("Add to Calendar")')).toBeVisible()
    
    // Check for share button
    await expect(page.locator('button:has-text("Share")')).toBeVisible()
  })

  test('should show calendar dropdown options', async ({ page }) => {
    await page.goto('/events/ai-agents-hackathon-2025')
    
    // Click calendar button
    await page.locator('button:has-text("Add to Calendar")').click()
    
    // Check for calendar options
    await expect(page.locator('text=Download .ics file')).toBeVisible()
    await expect(page.locator('text=Google Calendar')).toBeVisible()
  })

  test('should show share dropdown options', async ({ page }) => {
    await page.goto('/events/ai-agents-hackathon-2025')
    
    // Click share button
    await page.locator('button:has-text("Share")').click()
    
    // Check for share options
    await expect(page.locator('text=Copy link')).toBeVisible()
    await expect(page.locator('text=Twitter')).toBeVisible()
    await expect(page.locator('text=Facebook')).toBeVisible()
    await expect(page.locator('text=LinkedIn')).toBeVisible()
  })

  test('should have back navigation', async ({ page }) => {
    await page.goto('/events/ai-agents-hackathon-2025')
    
    // Check for back button
    const backButton = page.locator('a:has-text("Back to Events")')
    await expect(backButton).toBeVisible()
    
    // Click back button
    await backButton.click()
    
    // Should navigate to home page
    await expect(page).toHaveURL('/')
  })

  test('should handle non-existent event', async ({ page }) => {
    const response = await page.goto('/events/non-existent-event')
    
    // Should return 404
    expect(response?.status()).toBe(404)
  })
})
