import { test, expect } from '@playwright/test';
import { loginData } from '../../test-data/login.data';
import { LoginPage } from '../../pages/login.page';
import { PulpitPage } from '../../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });

  test('Quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '1500';
    const transferTitle = 'Fast food';
    const expectedTransferUserName = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferUserName} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    await pulpitPage.pulpitTransfer(receiverId, transferAmount, transferTitle);

    // Assert
    await expect(pulpitPage.pulpitTransferMessage).toHaveText(expectedMessage);
  });

  test('Mobile phone top-up', async ({ page }) => {
    // Arange
    const topUpAmount = '50';
    const topUpReceiver = '502 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    await pulpitPage.topUpTransfer(topUpReceiver, topUpAmount);

    // Assert
    await expect(pulpitPage.pulpitTransferMessage).toHaveText(expectedMessage);
  });

  test('Correct balance after mobile phone top-up', async ({ page }) => {
    // Arange
    const topUpAmount = '50';
    const topUpReceiver = '502 xxx xxx';
    const initialBalance = await pulpitPage.topupMoneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await pulpitPage.topUpTransfer(topUpReceiver, topUpAmount);

    // Assert
    await expect(pulpitPage.topupMoneyValueText).toHaveText(
      `${expectedBalance}`,
    );
  });
});
