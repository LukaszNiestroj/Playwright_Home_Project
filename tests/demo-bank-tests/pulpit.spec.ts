import { test, expect } from '@playwright/test';
import { loginData } from '../../test-data/login.data';
import { LoginPage } from '../../pages/login.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('Quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '1500';
    const transferTitle = 'Fast food';
    const expectedTransferUserName = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferUserName} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('Mobile phone top-up', async ({ page }) => {
    // Arange
    const topUpAmount = '50';
    const topUpReceiver = '502 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);

    // Two option to catch input element
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.locator('#widget_1_topup_agreement').click();

    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('Correct balance after mobile phone top-up', async ({ page }) => {
    // Arange
    const topUpAmount = '50';
    const topUpReceiver = '502 xxx xxx';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);

    // Two option to catch input element
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.locator('#widget_1_topup_agreement').click();

    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
