import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  // Arrange
  const userId = 'tester12';
  const userPassword = 'test1234';
  const expectedUserName = 'Jan Demobankowy';
  const expectedErrorMessage = 'ma min. 8 znaków'
  
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
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
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();
    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      `identyfikator ${expectedErrorMessage}`,
    );
  });

  test('Unsuccessful login with too short password', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill('test');
    await page.getByTestId('password-input').blur();
    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      `hasło ${expectedErrorMessage}`,
    );
  });
});
