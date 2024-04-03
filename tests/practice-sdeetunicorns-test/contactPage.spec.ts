import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test('Fill contact form', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://practice.sdetunicorns.com/contact/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Find the form on the page and scroll to it
    const form = page.locator('.everest-form');
    await form.scrollIntoViewIfNeeded();

    // Fill the input fields
    await page.locator('.contact-name input').fill('test1');
    await page.locator('.contact-email input').fill('test1@test.com');
    await page.locator('.contact-phone input').fill('+48999654222');
    await page.locator('.contact-message textarea').fill('Test text.');

    // Click submit button
    page.locator('.evf-submit').click();

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Verify text after sumbit form
    const submitFormText = page.locator(
      'text=Thanks for contacting us! We will be in touch with you shortly',
    );

    // Assert submit Form Text is visible
    await expect(submitFormText).toBeVisible();
  });
});
