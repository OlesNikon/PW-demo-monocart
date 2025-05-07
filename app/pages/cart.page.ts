import { expect, Locator } from '@playwright/test';
import { AppPage } from '../abstractClasses';
import { Header } from '../components/header.component';
import { step } from '../../misc/reporters/step';

export class CartPage extends AppPage {
  public pagePath = '/cart.html';

  public header = new Header(this.page);

  readonly cartTitle: Locator = this.page.locator('[data-test="title"]').getByText('Your Cart');
  readonly productNames: Locator = this.page.locator('.cart_item .inventory_item_name');
  readonly continueShoppingButton: Locator = this.page.locator("[data-test='continue-shopping']");

  @step()
  async expectLoaded(message = 'Expected Cart to be loaded') {
    await expect(this.cartTitle, message).toBeVisible();
  }

  @step()
  async clickToContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
