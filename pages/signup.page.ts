import BasePage from './shared/base.page';
import { SignupLocators as L } from '../locators/signup.locators';

class SignupPage extends BasePage {
  async waitForScreen(): Promise<void> {
    await this.waitForShown(L.title());
  }

  async fillName(name: string): Promise<void> {
    await this.type(L.nameInput, name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.type(L.emailInput, email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.type(L.passwordInput, password);
  }

  async fillForm(name: string, email: string, password: string): Promise<void> {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.hideKeyboard();
  }

  async getNameValue(): Promise<string> {
    return this.getText(L.nameInput);
  }
}

export default new SignupPage();