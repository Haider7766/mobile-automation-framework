import { $ } from '@wdio/globals';
import BasePage from '../../shared/base.page';
import { ProductsLocators as L } from '../../../locators/mobile/mydemo/products.locators';

class ProductsPage extends BasePage {
  async waitForScreen(): Promise<void> {
    await this.waitForShown(L.screen);
  }

  /** The product with this name on the list — for assertions. */
  product(name: string) {
    return $(L.productByName(name));
  }

  async openProduct(name: string): Promise<void> {
    await this.tap(L.productByName(name));
  }
}

export default new ProductsPage();