import { $, expect } from '@wdio/globals';
import TabBarPage from '../../../pages/shared/tab-bar.page';
import { TabBarLocators } from '../../../locators/shared/tab-bar.locators';

const screens = ['Home', 'Login', 'Forms', 'Swipe'] as const;

describe('Mobile — Tab navigation', () => {
  for (const tab of screens) {
    it(`opens the ${tab} screen`, async () => {
      await TabBarPage.open(tab);
      await expect($(TabBarLocators.screen[tab])).toExist();
    });
  }
});
