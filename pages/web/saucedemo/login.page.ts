import { $, browser } from '@wdio/globals';
import { SauceDemoLocators as L } from '../../../locators/web/saucedemo/saucedemo.locators';

class SauceDemoLoginPage {
  async open(): Promise<void> {
    await browser.url('/'); // resolved against baseUrl from the web config
  }

  async login(username: string, password: string): Promise<void> {
    await $(L.usernameInput).setValue(username);
    await $(L.passwordInput).setValue(password);
    await $(L.loginButton).click();
  }

  get errorMessage() {
    return $(L.errorMessage);
  }

  get productsTitle() {
    return $(L.productsTitle);
  }
}

export default new SauceDemoLoginPage();
