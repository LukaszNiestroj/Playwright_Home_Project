import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  // Arrange
  const userId = 'tester12';
  const userPassword = 'test1234';
  const expectedUserName = 'Jan Demobankowy';

  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/'
    await page.goto(url);
  })
  

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
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('Unsuccessful login with too short password', async ({ page }) => {
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill('test');
    await page.getByTestId('password-input').blur();
  

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });
});  