import BasePage from './shared/base.page';
import { NeoposDashboardLocators as L } from '../locators/neopos-dashboard.locators';

class NeoposDashboardPage extends BasePage {
  async waitForScreen(): Promise<void> {
    await this.waitForShown(L.menu);
  }

  async openItem(name: string): Promise<void> {
    await this.tap(L.item(name));
  }
}

export default new NeoposDashboardPage();