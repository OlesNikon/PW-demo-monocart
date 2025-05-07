import { test, expect } from '../fixtures/baseFixture';
import { STANDARD_USER, INVALID_USER } from '../data/credentials';

test.describe('Login form tests', () => {
  test('Verify that user can login with valid credentials', async ({ app }) => {
    await app.login.open();
    await app.login.login(STANDARD_USER);

    await expect(app.products.productsTitle).toBeVisible();
  });

  test('Verify that user can not login with invalid credentials', async ({ app }) => {
    await app.login.open();
    await app.login.login(INVALID_USER);

    await expect(app.login.errorAlert).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Verify that user can not login without credentials', async ({ app }) => {
    await app.login.open();
    await app.login.submitLogin();

    await expect(app.login.userNameInputField).toHaveClass(/error/);
    await expect(app.login.passwordInputField).toHaveClass(/error/);
  });
});
