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
        const headingText = page.locator('text=Think different. Make different.');

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
        const homeText = page.locator('#zak-primary-menu >> text=Home');

        // Verify home text is enabled
        await expect(homeText).toBeEnabled();
    })

    test('Verify search icon is visible using xpath selector', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com');
        // find search Icon
        const searchIcon = page.locator('//*[@class="zak-header-actions zak-header-actions--desktop"]//*[@class="zak-header-search__toggle"]');

        // Verify search icon is visible
        await expect(searchIcon).toBeVisible();

        // Click search icon
        await searchIcon.click();
        // Verify search bar is visible
        await expect(page.locator('.zak-search-form').first()).toBeVisible();
    })

    test('Verify text of nav menu links', async ({ page }) => {
        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ]

        await page.goto('https://practice.sdetunicorns.com');
        // find nav menu Links
        const navLinks = page.locator('#zak-primary-nav li[id*=menu]');

        // print out all the links
        for (const el of await navLinks.elementHandles()) {
            console.log(await el.textContent());
        };

        // Verify nav menu links text
        expect(await navLinks.allTextContents()).toEqual(expectedLinks);
    })

    test('Fill contact form', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com/contact/');
        
        // find form on page and scroll to
        const form = page.locator('#evf-form-277');
        expect(form).toBeVisible();

        // form.scrollIntoViewIfNeeded();
        page.pause();
        // fill Name input
        await page.getByRole('').fill('test1')
        


        // Verify nav menu links text
        // expect(await navLinks.allTextContents()).toEqual(expectedLinks);
    })
})
