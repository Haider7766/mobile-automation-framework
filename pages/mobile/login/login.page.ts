import BasePage from '../../shared/base.page';
import TabBarPage from '../../shared/tab-bar.page';
import { LoginLocators as L } from '../../../locators/mobile/login/login.locators';

class LoginPage extends BasePage {
  /** Go to the Login tab and wait for the screen. */
  async open(): Promise<void> {
    await TabBarPage.open('Login');
    await this.waitForShown(L.screen);
  }

  async login(email: string, password: string): Promise<void> {
    await this.tap(L.loginTab);
    await this.type(L.emailInput, email);
    await this.type(L.passwordInput, password);
    await this.hideKeyboard();
    await this.tap(L.loginButton);
  }

  async signUp(email: string, password: string, repeatPassword = password): Promise<void> {
    await this.tap(L.signUpTab);
    await this.type(L.emailInput, email);
    await this.type(L.passwordInput, password);
    await this.type(L.repeatPasswordInput, repeatPassword);
    await this.hideKeyboard();
    await this.tap(L.signUpButton);
  }
}

export default new LoginPage();
