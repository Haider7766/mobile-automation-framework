import { signupData } from './signup.data';
import { neoposLoginData } from './neopos-login.data';
import { neoposDashboardData } from './neopos-dashboard.data';
import { neoposSaleData } from './neopos-sale.data';

/**
 * Static test data — the equivalent of a Cypress fixture file.
 * One file per screen under data/, collected here so tests import a single object.
 * Secrets are read from the environment (see .env.example), never hardcoded.
 */
export const TestData = {
  noteflow: {
    signup: signupData,
  },
  neopos: {
    login: neoposLoginData,
    dashboard: neoposDashboardData,
    sale: neoposSaleData,
  },

};