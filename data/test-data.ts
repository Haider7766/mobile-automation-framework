import { optionalEnv, requireEnv } from '../utils/env';

/**
 * Static test data — the equivalent of a Cypress fixture file.
 * Secrets are read from the environment (see .env.example), never hardcoded.
 */
export const TestData = {
  mobile: {
    get email() { return requireEnv('MOBILE_EMAIL'); },
    get password() { return requireEnv('MOBILE_PASSWORD'); },
  },
  web: {
    baseUrl: optionalEnv('WEB_BASE_URL', 'https://www.saucedemo.com'),
    get username() { return requireEnv('WEB_USERNAME'); },
    get password() { return requireEnv('WEB_PASSWORD'); },
  },
};
