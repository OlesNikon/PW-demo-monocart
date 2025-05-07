import { expect, Locator } from '@playwright/test';
import { AppPage } from '../abstractClasses';
import { Header } from '../components/header.component';
import { step } from '../../misc/reporters/step';
import { compareArrays } from '../../utils/arrayUtils';

export class ProductsPage extends AppPage {
  public pagePath = '/inventory.html';

  public header = new Header(this.page);

  readonly productsTitle: Locator = this.page.locator('[data-test="title"]').getByText('Products');
  readonly productSortContainer: Locator = this.page.locator("[data-test='product-sort-container']");
  readonly allProductsList: Locator = this.page.locator('div.inventory_item');
  readonly productNames: Locator = this.page.locator('.inventory_item_name');
  readonly productPrices: Locator = this.page.locator('.inventory_item_price');

  @step()
  async expectLoaded(message = 'Expected Products to be loaded') {
    await expect(this.productsTitle, message).toBeVisible();
  }

  @step()
  private async clickProductButton(productName: string, buttonLabe: string): Promise<void> {
    const product = this.allProductsList.filter({ hasText: productName });
    const addToCartButton = product.locator(`button:has-text("${buttonLabe}")`);
    await addToCartButton.click();
  }

  @step()
  async addProductToCart(productName: string): Promise<void> {
    await this.clickProductButton(productName, 'Add to cart');
  }

  @step()
  async removeProductToCart(productName: string): Promise<void> {
    await this.clickProductButton(productName, 'Remove');
  }

  @step()
  async sortBy(filer: string): Promise<void> {
    await this.productSortContainer.selectOption({ label: filer });
  }

  @step()
  async getAndSortProductNames(sortOption: string): Promise<string[]> {
    await this.sortBy(sortOption);
    const productNamesAfterSort = await this.productNames.allInnerTexts();

    return productNamesAfterSort;
  }

  @step()
  async getAndSortProductPrices(sortOption: string): Promise<number[]> {
    await this.sortBy(sortOption);
    const productPricesAfterSortStrings = await this.productPrices.allInnerTexts();
    const productPricesAfterSort = productPricesAfterSortStrings.map((price) => parseFloat(price.replace('$', '')));

    return productPricesAfterSort;
  }

  @step()
  async testSortByAZ(): Promise<boolean> {
    const productNamesAfterSort = await this.getAndSortProductNames('Name (A to Z)');
    const expectedSortedNames = [...productNamesAfterSort].sort();

    return compareArrays(expectedSortedNames, productNamesAfterSort);
  }

  @step()
  async testSortByZA(): Promise<boolean> {
    const productNamesAfterSort = await this.getAndSortProductNames('Name (Z to A)');
    const expectedSortedNames = [...productNamesAfterSort].sort().reverse();

    return compareArrays(expectedSortedNames, productNamesAfterSort);
  }

  @step()
  async testSortPriceLowHigh(): Promise<boolean> {
    const productPricesAfterSort = await this.getAndSortProductPrices('Price (low to high)');
    const expectedSortedPrices = [...productPricesAfterSort].sort((a, b) => a - b);

    return compareArrays(expectedSortedPrices, productPricesAfterSort);
  }

  @step()
  async testSortPriceHighLow(): Promise<boolean> {
    const productPricesAfterSort = await this.getAndSortProductPrices('Price (high to low)');
    const expectedSortedPrices = [...productPricesAfterSort].sort((a, b) => b - a);

    return compareArrays(expectedSortedPrices, productPricesAfterSort);
  }
}
