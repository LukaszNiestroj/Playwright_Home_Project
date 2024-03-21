import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('Go to homepage and veryfi title', async ({ page }) => {
        // go to homepage
        await page.goto('https://practice.sdetunicorns.com/');
        // Assert the tittle
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    })

    test('Find text on homepage', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com');
        // find text locator
        const headingText = await page.locator('text=Think different. Make different.');

        // Assert heading text is visible
        await expect(headingText).toBeVisible();
    })
    
    test('click get started button', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com');
        // Find button locator and click
        await page.locator('#get-started').click();
        // verify URL
        await expect(page).toHaveURL(/.*#get-started/);
    })
    
    test('Verify home link is enabled using css selector and text', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com');
        // find text locator
        const homeText = await page.locator('#zak-primary-menu >> text=Home');

        // Verify home text is enabled
        await expect(homeText).toBeEnabled();
    })

    test('Verify search icon is visible using xpath selector', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com');
        // find search Icon
        const searchIcon = await page.locator('//*[@class="zak-header-actions zak-header-actions--desktop"]//*[@class="zak-header-search__toggle"]');

        // Verify search icon is visible
        await expect(searchIcon).toBeVisible();

        // Click search icon
        await searchIcon.click();
        // Verify search bar is visible
        await expect(page.locator('.zak-search-form').first()).toBeVisible();
    })
})
