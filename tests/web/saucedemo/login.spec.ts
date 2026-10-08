import { expect } from '@wdio/globals';
import LoginPage from '../../../pages/web/saucedemo/login.page';
import { TestData } from '../../../data/test-data';

describe('Web — Login (Sauce Demo)', () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it('logs in with valid credentials', async () => {
    await LoginPage.login(TestData.web.username, TestData.web.password);

    await expect(LoginPage.productsTitle).toHaveText('Products');
  });

  it('shows an error for a wrong password', async () => {
    await LoginPage.login(TestData.web.username, 'definitely-wrong');

    await expect(LoginPage.errorMessage).toBeDisplayed();
    await expect(LoginPage.errorMessage).toHaveText(expect.stringContaining('do not match'));
  });
});
