import { test, expect } from '../fixtures/baseFixture';
import { PRODUCTS } from '../data/constants';

test.describe('Product page tests', { tag: ['@smoke', '@product'] }, () => {
  /**
  * @testrail 4
  */
  test('Verify that added product is present in the cart', async ({ standardUser }) => {
    await standardUser.app.products.open();
    await standardUser.app.products.addProductToCart(PRODUCTS.backpack);
    await standardUser.app.products.header.openCart();

    await expect(standardUser.app.cart.productNames).toContainText(PRODUCTS.backpack);
  });

  /**
  * @testrail 5
  */
  test('Verify that badge icon displayed if product is added to the cart', async ({ standardUser }) => {
    await standardUser.app.products.open();
    await standardUser.app.products.addProductToCart(PRODUCTS.tShirt);

    await expect(standardUser.app.products.header.cartItemCount).toBeVisible();
  });

  /**
  * @testrail 6
  */
  test("Verify that user is redirected from cart page back to products page when clicks on 'Continue Shopping' button", async ({
    standardUser,
  }) => {
    await standardUser.app.products.open();
    await standardUser.app.products.addProductToCart(PRODUCTS.backpack);
    await standardUser.app.products.header.openCart();
    await standardUser.app.cart.clickToContinueShopping();

    await expect(standardUser.page).toHaveURL(/.*inventory/);
  });

  /**
  * @testrail 7
  */
  test('Verify that products sorting from Z-A works correctly', async ({ standardUser }) => {
    await standardUser.app.products.open();
    const result = await standardUser.app.products.testSortByZA();

    expect(result).toBeTruthy();
  });

  /**
  * @testrail 8
  */
  test('Verify that products sorting from A-Z works correctly', async ({ standardUser }) => {
    await standardUser.app.products.open();
    const result = await standardUser.app.products.testSortByAZ();

    expect(result).toBeTruthy();
  });

  /**
  * @testrail 9
  */
  test('Verify that products sorting from low to high price works correctly', async ({ standardUser }) => {
    await standardUser.app.products.open();
    const result = await standardUser.app.products.testSortPriceLowHigh();

    expect(result).toBeTruthy();
  });

  /**
  * @testrail 10
  */
  test('Verify that products sorting from high to low price works correctly', async ({ standardUser }) => {
    await standardUser.app.products.open();
    const result = await standardUser.app.products.testSortPriceHighLow();

    expect(result).toBeTruthy();
  });
});
