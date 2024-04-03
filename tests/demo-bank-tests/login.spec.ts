import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  // Arrange
  const userId = 'tester12';
  const userPassword = 'test1234';
  const expectedUserName = 'Jan Demobankowy';
  const expectedErrorMessage = 'ma min. 8 znaków';
  const incorrectUserId = 'tester';
  const incorrectPasswordId = 'test';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login with correct credentials', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Unsuccessful login with too short username', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();
    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      `identyfikator ${expectedErrorMessage}`,
    );
  });

  test('Unsuccessful login with too short password', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPasswordId);
    await page.getByTestId('password-input').blur();
    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      `hasło ${expectedErrorMessage}`,
    );
  });
});
