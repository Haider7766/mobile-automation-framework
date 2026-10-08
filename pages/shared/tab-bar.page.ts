import BasePage from './base.page';
import { TabBarLocators, type Tab } from '../../locators/shared/tab-bar.locators';

class TabBarPage extends BasePage {
  async open(tab: Tab): Promise<void> {
    await this.tap(TabBarLocators.tab(tab));
  }
}

export default new TabBarPage();
