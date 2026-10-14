import BasePage from './shared/base.page';
import { NeoposLoginLocators as L } from '../locators/neopos-login.locators';

class NeoposLoginPage extends BasePage {
  async waitForScreen(): Promise<void> {
    await this.waitForShown(L.title);
  }

  async fillUsername(username: string): Promise<void> {
    await this.type(L.usernameInput, username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.type(L.passwordInput, password);
  }

  async fillForm(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.hideKeyboard();
  }

  async getUsernameValue(): Promise<string> {
    return this.getText(L.usernameInput);
  }
  async submit(): Promise<void> {       
    await this.tap(L.loginButton);
  }
}

export default new NeoposLoginPage();