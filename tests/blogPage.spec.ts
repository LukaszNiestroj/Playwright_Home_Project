import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
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
