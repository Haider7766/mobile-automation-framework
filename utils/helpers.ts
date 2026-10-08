/** Last 6 digits of the current timestamp — short, but different on every run. */
function shortUniqueDigits(): string {
  return Date.now().toString().slice(-6);
}

/** e.g. uniqueCode('QA') -> "QA482913" */
export function uniqueCode(prefix: string): string {
  return `${prefix}${shortUniqueDigits()}`;
}

/** e.g. uniqueEmail('qa') -> "qa.482913@example.com" — handy for sign-up flows. */
export function uniqueEmail(prefix = 'qa'): string {
  return `${prefix}.${Date.now()}@example.com`;
}
