import { test, expect } from '@playwright/test';
import { loginData } from '../../test-data/login.data';
import { LoginPage } from '../../pages/login.page';
import { PulpitPage } from '../../pages/pulpit.page';

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
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.pulpitReceiverInput.selectOption(receiverId);
    await pulpitPage.pulpitAmountInput.fill(transferAmount);
    await pulpitPage.pulpitTranferTitleInput.fill(transferTitle);
    await pulpitPage.pulpitTranferButton.click();
    await pulpitPage.pulpitActionCloseButton.click();

    // Assert
    await expect(pulpitPage.pulpitTransferMessage).toHaveText(expectedMessage);
  });

  test('Mobile phone top-up', async ({ page }) => {
    // Arange
    const topUpAmount = '50';
    const topUpReceiver = '502 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topupReceiver.selectOption(topUpReceiver);
    await pulpitPage.topupAmount.fill(topUpAmount);

    // Two option to catch input element
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    await pulpitPage.topupAgreement.click();

    await pulpitPage.topupPhone.click();
    await pulpitPage.pulpitActionCloseButton.click();

    // Assert
    await expect(pulpitPage.pulpitTransferMessage).toHaveText(expectedMessage);
  });

  test('Correct balance after mobile phone top-up', async ({ page }) => {
    // Arange
    const pulpitPage = new PulpitPage(page);
    const topUpAmount = '50';
    const topUpReceiver = '502 xxx xxx';
    const initialBalance = await pulpitPage.topupMoneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await pulpitPage.topupReceiver.selectOption(topUpReceiver);
    await pulpitPage.topupAmount.fill(topUpAmount);

    // Two option to catch input element
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    await pulpitPage.topupAgreement.click();

    await pulpitPage.topupPhone.click();
    await pulpitPage.pulpitActionCloseButton.click();

    // Assert
    await expect(pulpitPage.topupMoneyValueText).toHaveText(
      `${expectedBalance}`,
    );
  });
});
