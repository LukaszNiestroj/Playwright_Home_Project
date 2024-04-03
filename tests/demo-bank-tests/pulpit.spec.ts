import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  // Arrange
  const userId = 'tester12';
  const userPassword = 'test1234';
  const expectedTransferUserName = 'Chuck Demobankowy';

  const receiverId = '2';
  const transferAmount = '1500';
  const transferTitle = 'Fast food';
  const topUpAmount = '50';
  const topUpReceiver = '502 xxx xxx';

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
  });

  test('Quick payment with correct data', async ({ page }) => {
    // Act
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    const expectedMessage = `Przelew wykonany! ${expectedTransferUserName} - ${transferAmount},00PLN - ${transferTitle}`;
    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      expectedMessage,
    );
  });

  test('Mobile phone top-up', async ({ page }) => {
    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);

    // Two option to catch input element
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.locator('#widget_1_topup_agreement').click();

    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      expectedMessage,
    );
  });
});
