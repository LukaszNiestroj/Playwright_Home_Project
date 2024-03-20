import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('Go to homepage and veryfi title', async ({ page }) => {
        // go to homepage
        await page.goto('https://practice.sdetunicorns.com/');
        // Assert the tittle
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    })
})
