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
    
        // Fill the input Name field
        const nameField = form.locator('.contact-name input');
        await nameField.isVisible();
        await nameField.fill('test1');
    
        // Fill the input email field
        const emailField = form.locator('.contact-email input');
        await emailField.isVisible();
        await emailField.fill('test1@test.com');
    
        // Fill the input Phone field
        const phoneField = form.locator('.contact-phone input');
        await phoneField.isVisible();
        await phoneField.fill('+48999654222');
    
        // Fill the input Message field
        const messageField = form.locator('.contact-message textarea');
        await messageField.isVisible();
        await messageField.fill('test112233 ssaersw'); 

        // Click submit button
        page.locator('.evf-submit').click();

        // Wait for the page to load
        await page.waitForLoadState('networkidle');

        // Verify text after sumbit form
        const submitFormText = page.locator('text=Thanks for contacting us! We will be in touch with you shortly');

        // Assert submit Form Text is visible
        await expect(submitFormText).toBeVisible();
    })
})
