import { test, expect } from '@playwright/test';
import { loginData } from '../../test-data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'Jan Demobankowy';
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';
    const incorrectUserId = 'tester';
    // Act
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();
    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('Unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectPasswordId = 'test';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPasswordId);
    await page.getByTestId('password-input').blur();
    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
