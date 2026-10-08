import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

/** Reject if the promise does not settle within `ms` milliseconds. */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${ms} ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/** Unique values of one XML attribute (e.g. content-desc) found in a page source. */
export function extractAttribute(source: string, attribute: string): string[] {
  const pattern = new RegExp(`\\s${attribute}="([^"]*)"`, 'g');
  const values = new Set<string>();
  for (const match of source.matchAll(pattern)) {
    const value = match[1]
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#10;/g, ' ')
      .trim();
    if (value) values.add(value.length > 60 ? `${value.slice(0, 57)}...` : value);
  }
  return [...values];
}

function safeName(title: string): string {
  return title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

/** Failure screenshot. Capped at 10 s so a dead session can never hang the run. */
export async function saveFailureScreenshot(title: string): Promise<void> {
  try {
    const dir = path.join(ROOT, 'reports', 'screenshots');
    fs.mkdirSync(dir, { recursive: true });
    await withTimeout(browser.saveScreenshot(path.join(dir, `${Date.now()}-${safeName(title)}.png`)), 10_000);
  } catch (error) {
    console.warn(`Could not save a failure screenshot: ${(error as Error).message}`);
  }
}

/**
 * Prints what the device is really showing when a test fails: which app is in front, the
 * accessibility ids and the visible texts. A wrong locator can then be fixed from the
 * console output alone. The full page source is also saved under reports/page-source/.
 */
export async function logScreenSummary(title: string): Promise<void> {
  try {
    const source = await withTimeout(browser.getPageSource(), 10_000);

    const dir = path.join(ROOT, 'reports', 'page-source');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${Date.now()}-${safeName(title)}.xml`), source);

    const show = (values: string[]) => (values.length ? values.slice(0, 40).join(' | ') : '(none)');
    console.log(
      [
        '',
        `--- Screen diagnostics: ${title} ---`,
        `apps on screen    : ${show(extractAttribute(source, 'package'))}`,
        `accessibility ids : ${show(extractAttribute(source, 'content-desc'))}`,
        `visible texts     : ${show(extractAttribute(source, 'text'))}`,
        '---',
      ].join('\n'),
    );
  } catch (error) {
    console.warn(`Could not read the screen state: ${(error as Error).message}`);
  }
}