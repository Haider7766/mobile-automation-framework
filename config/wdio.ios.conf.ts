import path from 'node:path';
import { ROOT, sharedConfig } from './wdio.shared.conf';
import { iosCapabilities } from './capabilities';

const APPIUM_PORT = Number(process.env.APPIUM_PORT || 4723);

// iOS automation needs macOS + Xcode (simulator or a real device). The same
// specs and page objects run unchanged — only the capabilities differ.
export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: [path.join(ROOT, 'tests/mobile/**/*.spec.ts')],

  hostname: '127.0.0.1',
  port: APPIUM_PORT,
  path: '/',

  capabilities: [iosCapabilities()],

  services: [
    [
      'appium',
      {
        args: { address: '127.0.0.1', port: APPIUM_PORT },
        logPath: path.join(ROOT, 'reports', 'appium'),
          appiumStartTimeout: 90_000,
      },
    ],
  ],
};
