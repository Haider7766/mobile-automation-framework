// Accessibility ids (the "~" prefix) are shared by Android and iOS, so one
// locator works on both. If a screen needs platform-specific selectors, use
// byPlatform({ android: '...', ios: '...' }) from locators/shared/platform.
export const LoginLocators = {
  screen: '~Login-screen',

  loginTab: '~button-login-container',
  signUpTab: '~button-sign-up-container',

  emailInput: '~input-email',
  passwordInput: '~input-password',
  repeatPasswordInput: '~input-repeat-password',

  loginButton: '~button-LOGIN',
  signUpButton: '~button-SIGN UP',
} as const;
