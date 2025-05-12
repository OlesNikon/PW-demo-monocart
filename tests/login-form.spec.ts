import { test, expect } from '../fixtures/baseFixture';
import { STANDARD_USER, INVALID_USER } from '../data/credentials';

test.describe('Login form tests', { tag: ['@smoke', '@login'] }, () => {
  test('Verify that user can login with valid credentials', { tag: ['@1-1-1'] }, async ({ app }) => {
    await app.login.open();
    await app.login.login(STANDARD_USER);

    await expect(app.products.productsTitle).toBeVisible();
  });

  test('Verify that user can not login with invalid credentials', { tag: ['@1-1-2'] }, async ({ app }) => {
    await app.login.open();
    await app.login.login(INVALID_USER);

    await expect(app.login.errorAlert).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Verify that user can not login without credentials', { tag: ['@1-1-3'] }, async ({ app }) => {
    await app.login.open();
    await app.login.submitLogin();

    await expect(app.login.userNameInputField).not.toHaveClass(/error/);
    await expect(app.login.passwordInputField).toHaveClass(/error/);
  });
});
