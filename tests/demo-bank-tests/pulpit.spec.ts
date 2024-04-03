import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('test1234');
        await page.getByTestId('login-button').click();
        await page.getByTestId('user-name').click();
    });

    test('Quick payment with correct data', async ({ page }) => {
        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('1500');
        await page.locator('#widget_1_transfer_title').fill('Fast food');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 1500,00PLN - Fast food');
    });
});
