import BasePage from './base.page';
import { SystemDialogsLocators as L } from '../../locators/shared/system-dialogs.locators';

/** One-time system pop-ups that can appear on a freshly installed build. */
class SystemDialogsPage extends BasePage {
  /** Dismisses the "don't show me again" dialog if it appears; does nothing otherwise. */
  async dismissFirstLaunchDialog(): Promise<boolean> {
    return this.tapIfShown(L.dontShowAgainButton, 4000);
  }
}

export default new SystemDialogsPage();