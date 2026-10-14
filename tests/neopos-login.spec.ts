import { expect } from '@wdio/globals';
import NeoposLoginPage from '../pages/neopos-login.page';
import { TestData } from '../data/test-data';

const data = TestData.neopos.login;

describe('NeoPOS — Login', () => {
  it('shows the login screen', async () => {
    await NeoposLoginPage.waitForScreen();
  });

  it('fills the login form', async () => {
    await NeoposLoginPage.fillForm(data.username, data.password);
    await NeoposLoginPage.submit();

    expect(await NeoposLoginPage.getUsernameValue()).toBe(data.username);
  });
});