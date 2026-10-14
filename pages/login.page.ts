import BasePage from './shared/base.page';
import { LoginLocators as L } from '../locators/login.locators';

class LoginPage extends BasePage {
  /** The app opens on the login screen; its sign-up link is what tells us it is shown. */
  async waitForScreen(): Promise<void> {
    await this.waitForShown(L.signupLink);
  }

  async openSignup(): Promise<void> {
    await this.tap(L.signupLink);
  }
}

export default new LoginPage();