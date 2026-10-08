import path from 'node:path';
import { ROOT, sharedConfig } from './wdio.shared.conf';
import { TestData } from '../data/test-data';

const headless = process.env.HEADLESS !== 'false';

// Desktop-browser config: the same framework can drive the web app as well.
export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: [path.join(ROOT, 'tests/web/**/*.spec.ts')],
  baseUrl: TestData.web.baseUrl,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: headless ? ['--headless=new', '--window-size=1440,900'] : ['--window-size=1440,900'],
      },
    },
  ],
};
