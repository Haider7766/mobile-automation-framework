import { $ } from '@wdio/globals';
import BasePage from '../../shared/base.page';
import { ProductDetailsLocators as L } from '../../../locators/mobile/mydemo/product-details.locators';

class ProductDetailsPage extends BasePage {
  async waitForScreen(): Promise<void> {
    await this.waitForShown(L.screen);
  }

  async addToCart(): Promise<void> {
    await this.tap(L.addToCartButton);
  }

  /** The number shown on the cart icon (appears once something is in the cart). */
  get cartCount() {
    return $(L.cartBadgeCount);
  }
}

export default new ProductDetailsPage();