import { driver } from '@wdio/globals';
import BasePage from './base.page';
import { NativeAlertLocators as L } from '../../locators/shared/native-alert.locators';

/** Native OS alert dialogs (e.g. "You are logged in!"). */
class NativeAlertPage extends BasePage {
  async accept(): Promise<void> {
    if (driver.isIOS) {
      await driver.acceptAlert();
    } else {
      await this.tap(L.androidOkButton);
    }
  }
}

export default new NativeAlertPage();
