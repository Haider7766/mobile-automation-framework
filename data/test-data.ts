import { requireEnv } from '../utils/env';

/**
 * Static test data — the equivalent of a Cypress fixture file.
 * Secrets are read from the environment (see .env.example), never hardcoded.
 */
export const TestData = {
  mobile: {
    get email() { return requireEnv('MOBILE_EMAIL'); },
    get password() { return requireEnv('MOBILE_PASSWORD'); },
  },

  // MyDemo app (Sauce Labs "My Demo App")
  mydemo: {
    // Secrets: read from .env only when a test uses them.
    get username() { return requireEnv('MYDEMO_USERNAME'); },
    get password() { return requireEnv('MYDEMO_PASSWORD'); },

    product: { name: 'Sauce Labs Backpack' },

    // What the app is expected to show after an action.
    expected: { cartCount: '1' },

    shippingAddress: {
      fullName: 'Rebecca Winter',
      addressLine1: 'Mandorley 112',
      city: 'Truro',
      zipCode: '89750',
      country: 'United Kingdom',
    },

    // 4111 1111 1111 1111 is a standard test card number that passes card validation.
    // The app adds the spaces and the "/" itself, so only the digits are typed.
    payment: {
      fullName: 'Rebecca Winter',
      cardNumber: '4111111111111111',
      expirationDate: '0330',
      securityCode: '123',
    },
  },
};