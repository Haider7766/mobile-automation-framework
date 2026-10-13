import { byTextContains } from './shared/platform';

// NoteFlow's screens are HTML inside a WebView, but the page source exposes them as native
// views. The inputs have no id or description, so each one is found through the label view
// that sits right before it ("Nome", "Email", "Password").
export const SignupLocators = {
  /** The heading shown on the sign-up screen. */
  title: () => byTextContains('Crea il tuo account'),
  nameInput: '//android.view.View[@text="Nome"]/following-sibling::android.widget.EditText[1]',
  emailInput: '//android.view.View[@text="Email"]/following-sibling::android.widget.EditText[1]',
  passwordInput: '//android.view.View[@text="Password"]/following-sibling::android.widget.EditText[1]',
  createAccountButton: () => byTextContains('Crea account'),
  loginLink: '~Accedi',
} as const;