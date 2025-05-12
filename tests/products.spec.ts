import { test, expect } from '../fixtures/baseFixture';
import { PRODUCTS } from '../data/constants';

test.describe('Product page tests', { tag: ['@smoke', '@product'] }, () => {
  test('Verify that added product is present in the cart', { tag: ['@1-1-4'] }, async ({ standardUser }) => {
    await standardUser.app.products.open();
    await standardUser.app.products.addProductToCart(PRODUCTS.backpack);
    await standardUser.app.products.header.openCart();

    await expect(standardUser.app.cart.productNames).toContainText(PRODUCTS.backpack);
  });

  test('Verify that badge icon displayed if product is added to the cart', { tag: ['@1-1-5'] }, async ({ standardUser }) => {
    await standardUser.app.products.open();
    await standardUser.app.products.addProductToCart(PRODUCTS.tShirt);

    await expect(standardUser.app.products.header.cartItemCount).toBeVisible();
  });

  test("Verify that user is redirected from cart page back to products page when clicks on 'Continue Shopping' button", { tag: ['@1-1-6'] }, async ({
    standardUser,
  }) => {
    await standardUser.app.products.open();
    await standardUser.app.products.addProductToCart(PRODUCTS.backpack);
    await standardUser.app.products.header.openCart();
    await standardUser.app.cart.clickToContinueShopping();

    await expect(standardUser.page).toHaveURL(/.*inventory/);
  });

  test('Verify that products sorting from Z-A works correctly', { tag: ['@1-1-7'] }, async ({ standardUser }) => {
    await standardUser.app.products.open();
    const result = await standardUser.app.products.testSortByZA();

    expect(result).toBeTruthy();
  });

  test('Verify that products sorting from A-Z works correctly', { tag: ['@1-1-8'] }, async ({ standardUser }) => {
    await standardUser.app.products.open();
    const result = await standardUser.app.products.testSortByAZ();

    expect(result).toBeTruthy();
  });

  test('Verify that products sorting from low to high price works correctly', { tag: ['@1-1-9'] }, async ({ standardUser }) => {
    await standardUser.app.products.open();
    const result = await standardUser.app.products.testSortPriceLowHigh();

    expect(result).toBeTruthy();
  });

  test('Verify that products sorting from high to low price works correctly', { tag: ['@1-1-10'] }, async ({ standardUser }) => {
    await standardUser.app.products.open();
    const result = await standardUser.app.products.testSortPriceHighLow();

    expect(result).toBeTruthy();
  });
});
