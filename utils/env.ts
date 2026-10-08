import 'dotenv/config';

/**
 * Read a required environment variable. Credentials and other secrets are
 * never hardcoded in this repo — they come from `.env` locally (copy
 * `.env.example`) or from CI secrets in a pipeline.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env and fill it in (or set it as a CI secret).`,
    );
  }
  return value;
}

export function optionalEnv(name: string, fallback: string): string {
  return process.env[name] || fallback;
}
