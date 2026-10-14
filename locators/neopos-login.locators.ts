// NeoPOS (com.croem.pospagoandroid) login screen. The app gives every control a resource id,
// so those are used instead of text (the screen is in Spanish).
export const NeoposLoginLocators = {
  /** The "INICIAR SESIÓN" heading. */
  title: 'id=com.croem.pospagoandroid:id/tv_login',
  usernameInput: 'id=com.croem.pospagoandroid:id/et_username',
  passwordInput: 'id=com.croem.pospagoandroid:id/et_password',
  showPasswordButton: '~Mostrar contraseña',
  loginButton: 'id=com.croem.pospagoandroid:id/btn_login',
  errorMessage: 'id=com.croem.pospagoandroid:id/tv_error_msg',
} as const;