import { expect, Locator } from '@playwright/test';
import { Component } from '../abstractClasses';
import { step } from '../../misc/reporters/step';

export class Header extends Component {
  readonly headerContainer: Locator = this.page.locator('[data-test="header - container"]');
  readonly cartButton: Locator = this.page.locator('#shopping_cart_container a');
  readonly cartItemCount: Locator = this.cartButton.locator('[data-test="shopping-cart-badge"]');

  @step()
  async expectLoaded(message = 'Expected Header to be loaded') {
    await expect(this.headerContainer, message).toBeVisible();
  }

  @step()
  async openCart(): Promise<void> {
    await this.cartButton.click();
  }

  @step()
  async getCartItemCount(): Promise<number> {
    const itemCount = +(await this.page.locator('.shopping_cart_badge').innerText());
    return itemCount;
  }
}
