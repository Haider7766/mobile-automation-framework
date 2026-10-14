import { uniqueEmail } from '../utils/helpers';
import { requireEnv } from '../utils/env';

// Created once per test run, so every use of signupData.email is the same address.
const email = uniqueEmail('qa');

export const signupData = {
  name: 'QA Tester',
  email,
  get password() { return requireEnv('NOTEFLOW_SIGNUP_PASSWORD'); },
};