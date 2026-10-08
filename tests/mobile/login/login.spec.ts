import { expect } from '@wdio/globals';
import LoginPage from '../../../pages/mobile/login/login.page';
import NativeAlertPage from '../../../pages/shared/native-alert.page';
import { TestData } from '../../../data/test-data';

describe('Mobile — Login', () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it('logs in with valid credentials', async () => {
    await LoginPage.login(TestData.mobile.email, TestData.mobile.password);

    await expect(NativeAlertPage.byText('You are logged in!')).toBeDisplayed();
    await NativeAlertPage.accept();
  });

  it('rejects an invalid email address', async () => {
    await LoginPage.login('not-an-email', TestData.mobile.password);

    await expect(LoginPage.byText('Please enter a valid email address')).toBeDisplayed();
  });

  it('rejects a password shorter than 8 characters', async () => {
    await LoginPage.login(TestData.mobile.email, 'short1');

    await expect(LoginPage.byText('Please enter at least 8 characters')).toBeDisplayed();
  });
});
