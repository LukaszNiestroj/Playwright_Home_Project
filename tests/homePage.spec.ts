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
        // Navigate to the page
        await page.goto('https://practice.sdetunicorns.com/contact/');
    
        // Wait for the page to load
        // await page.waitForLoadState('networkidle');
    
        // Find the form on the page and scroll to it
        const form = page.locator('#evf-form-277');
        await form.scrollIntoViewIfNeeded();
    
        // Fill the input Name field
        const nameField = form.locator('#evf-277-field_ys0GeZISRs-1');
        await nameField.isVisible();
        await nameField.fill('test1');
    
        // Fill the input email field
        const emailField = form.locator('#evf-277-field_LbH5NxasXM-2');
        await emailField.isVisible();
        await emailField.fill('test1@test.com');
    
        // Fill the input Phone field
        const phoneField = form.locator('#evf-277-field_66FR384cge-3');
        await phoneField.isVisible();
        await phoneField.fill('+48999654222');
    
        // Fill the input Message field
        const messageField = form.locator('#evf-277-field_yhGx3FOwr2-4');
        await messageField.isVisible();
        await messageField.fill('test112233 ssaersw'); 

        // Click submit button
        page.locator('#evf-submit-277').click();

        // Wait for the page to load
        await page.waitForLoadState('networkidle');

        // Verify text after sumbit form
        const submitFormText = page.locator('text=Thanks for contacting us! We will be in touch with you shortly');

        // Assert submit Form Text is visible
        await expect(submitFormText).toBeVisible();
    })

    test('Count number of posts and check text length', async ({ page }) => {
        // Navigate to the page
        await page.goto('https://practice.sdetunicorns.com/blog');
        
        // Get the number of posts
        const postCount = await page.locator('#recent-posts-3 ul > li a').count();
        
        // Assertion on the number of posts
        expect(postCount).toBeGreaterThan(0);
    
        // Get the text of each post and check its length
        for (let i = 0; i < postCount; i++) {
            const postText = await page.locator('#recent-posts-3 ul > li a').nth(i).textContent();
            if (postText) {
                // Commented line is for show result of count the characters in console
                
                // const charCount = postText.length;
                // console.log(`Post ${i+1} has ${charCount} characters.`);
                // expect(charCount).toBeGreaterThan(10);
                expect(postText.length).toBeGreaterThan(10);
            }        
        }
    });
    
    
})
