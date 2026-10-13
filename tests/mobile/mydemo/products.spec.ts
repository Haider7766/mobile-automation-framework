import { expect } from '@wdio/globals';
import ProductsPage from '../../../pages/mobile/mydemo/products.page';
import ProductDetailsPage from '../../../pages/mobile/mydemo/product-details.page';
import SystemDialogsPage from '../../../pages/shared/system-dialogs.page';
import { TestData } from '../../../data/test-data';

const data = TestData.mydemo;

describe('MyDemo — Products', () => {
  before(async () => {
    // Once per session: a fresh install can show a one-time dialog. Not a test step.
    await SystemDialogsPage.dismissFirstLaunchDialog();
  });

  it('shows the product list when the app opens', async () => {
    await ProductsPage.waitForScreen();

    await expect(ProductsPage.product(data.product.name)).toBeDisplayed();
  });

  it('opens the product details', async () => {
    await ProductsPage.openProduct(data.product.name);

    await ProductDetailsPage.waitForScreen();
  });

  it('adds the product to the cart', async () => {
    await ProductDetailsPage.addToCart();

    await expect(ProductDetailsPage.cartCount).toHaveText(data.expected.cartCount);
  });
});