import { signupData } from './signup.data';

/**
 * Static test data — the equivalent of a Cypress fixture file.
 * One file per screen under data/<app>/, collected here so tests import a single object.
 * Secrets are read from the environment (see .env.example), never hardcoded.
 */
export const TestData = {
  noteflow: {
    signup: signupData,
  },
};