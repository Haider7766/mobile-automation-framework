import { requireEnv } from '../utils/env';

// QA test account of the NeoPOS app. The values live in .env only, never in the repository.
export const neoposLoginData = {
  get username() { return requireEnv('NEOPOS_USERNAME'); },
  get password() { return requireEnv('NEOPOS_PASSWORD'); },
};