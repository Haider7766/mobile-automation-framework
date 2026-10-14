import BasePage from './shared/base.page';
import { NeoposSaleLocators as L } from '../locators/neopos-sale.locators';

class NeoposSalePage extends BasePage {
  async waitForScreen(): Promise<void> {
    await this.waitForShown(L.heading);
  }

  async getHeading(): Promise<string> {
    return this.getText(L.heading);
  }

  async getAmount(): Promise<string> {
    return this.getText(L.amount);
  }
}

export default new NeoposSalePage();