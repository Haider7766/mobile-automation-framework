import { $, driver } from '@wdio/globals';
import { byTextContains } from '../../locators/shared/platform';

/**
 * Small helpers every mobile page object builds on. Keeping waits and
 * interactions here means page classes read like user actions and tests
 * never contain raw selectors or sleeps.
 */
export default abstract class BasePage {
  /** Wait until the element is visible, then tap it. */
  protected async tap(selector: string): Promise<void> {
    const element = $(selector);
    await element.waitForDisplayed();
    await element.click();
  }

  /** Wait for an input, clear it and type the value. */
  protected async type(selector: string, value: string): Promise<void> {
    const element = $(selector);
    await element.waitForDisplayed();
    await element.setValue(value);
  }
  /** Wait until the element is visible, then return its text. */
  protected async getText(selector: string): Promise<string> {
    const element = $(selector);
    await element.waitForDisplayed();
    return element.getText();
  }
  /**
   * Tap an element only if it shows up within `timeout` ms — for optional pop-ups that appear
   * on some devices/first launches but not always. Returns whether it was tapped.
   */
  async tapIfShown(selector: string, timeout = 3000): Promise<boolean> {
    const element = $(selector);
    try {
      await element.waitForDisplayed({ timeout });
    } catch {
      return false;
    }
    await element.click();
    return true;
  }

  /** Wait until an element is shown (or, with shown=false, gone). */
  async waitForShown(selector: string, shown = true): Promise<void> {
    await $(selector).waitForDisplayed({ reverse: !shown });
  }

  /** Element matching some visible text — for assertions like expect(page.byText('...')).toBeDisplayed(). */
  byText(text: string) {
    return $(byTextContains(text));
  }

  /** Close the soft keyboard if it is covering the screen. */
  async hideKeyboard(): Promise<void> {
    try {
      if (await driver.isKeyboardShown()) await driver.hideKeyboard();
    } catch {
      // Some screens/platforms refuse to hide the keyboard — not a test failure.
    }
  }
}