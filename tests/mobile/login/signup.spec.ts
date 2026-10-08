import { expect } from '@wdio/globals';
import LoginPage from '../../../pages/mobile/login/login.page';
import NativeAlertPage from '../../../pages/shared/native-alert.page';
import { TestData } from '../../../data/test-data';
import { uniqueEmail } from '../../../utils/helpers';

describe('Mobile — Sign up', () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it('signs up with a fresh email address', async () => {
    await LoginPage.signUp(uniqueEmail('qa'), TestData.mobile.password);

    await expect(NativeAlertPage.byText('You successfully signed up!')).toBeDisplayed();
    await NativeAlertPage.accept();
  });

  it('rejects mismatched passwords', async () => {
    await LoginPage.signUp(uniqueEmail('qa'), TestData.mobile.password, `${TestData.mobile.password}x`);

    await expect(LoginPage.byText('Please enter the same password')).toBeDisplayed();
  });
});
