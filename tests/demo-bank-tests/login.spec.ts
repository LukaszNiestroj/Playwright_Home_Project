import { test, expect } from '@playwright/test';
import { loginData } from '../../test-data/login.data';
import { LoginPage } from '../../pages/login.page';
import { PulpitPage } from '../../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('Login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'Jan Demobankowy';
    // Act
    await loginPage.login(userId, userPassword);

    // Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
  });

  test('Unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';
    const incorrectUserId = 'tester';
    // Act
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test('Unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectPasswordId = 'test';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    // Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectPasswordId);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
  });
});
