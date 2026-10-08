import { driver } from '@wdio/globals';

export type PlatformLocator = { android: string; ios: string };

/** Pick the selector that belongs to the platform the current session runs on. */
export function byPlatform(locator: PlatformLocator): string {
  return driver.isAndroid ? locator.android : locator.ios;
}

function escapeQuotes(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/** Selector matching an element by (part of) its visible text — works on Android and iOS. */
export function byTextContains(text: string): string {
  const safe = escapeQuotes(text);
  return driver.isAndroid
    ? `android=new UiSelector().textContains("${safe}")`
    : `-ios predicate string:label CONTAINS "${safe}"`;
}
