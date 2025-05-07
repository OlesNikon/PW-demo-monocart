import { expect, Locator } from '@playwright/test';
import { AppPage } from '../abstractClasses';
import { step } from '../../misc/reporters/step';
import { Credentials } from '../../types/Credentials';

export class LoginPage extends AppPage {
  public pagePath = '/';

  readonly loginForm: Locator = this.page.locator('#login_button_container');
  readonly userNameInputField: Locator = this.page.locator('[data-test="username"]');
  readonly passwordInputField: Locator = this.page.locator('[data-test="password"]');
  readonly loginButton: Locator = this.page.locator('[data-test="login-button"]');
  readonly errorAlert: Locator = this.page.locator('h3[data-test="error"]');

  @step()
  async expectLoaded(message = 'Expected Login to be loaded') {
    await expect(this.loginForm, message).toBeVisible();
  }

  @step()
  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  @step()
  async login(credentials: Credentials): Promise<void> {
    await this.userNameInputField.fill(credentials.userName);
    await this.passwordInputField.fill(credentials.password);
    await this.submitLogin();
  }
}
