import { expect } from '@wdio/globals';
import LoginPage from '../pages/login.page';
import SignupPage from '../pages/signup.page';
import { TestData } from '../data/test-data';

const data = TestData.noteflow.signup;

describe('NoteFlow — Sign up', () => {
  it('opens the sign-up screen from the login screen', async () => {
    await LoginPage.waitForScreen();
    await LoginPage.openSignup();

    await SignupPage.waitForScreen();
  });

  it('fills the sign-up form', async () => {
    await SignupPage.fillForm(data.name, data.email, data.password);

    expect(await SignupPage.getNameValue()).toBe(data.name);
  });
});