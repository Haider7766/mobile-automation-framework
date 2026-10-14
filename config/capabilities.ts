import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

/**
 * Resolve the app under test. Accepts a local path (relative to the repo) or an
 * http(s) URL (useful with cloud device farms). Fails early with a helpful message.
 */
function resolveApp(envName: string, defaultFile: string, downloadScript: string): string {
  const configured = process.env[envName] || path.join('apps', defaultFile);
  if (/^https?:\/\//i.test(configured)) return configured;

  const absolute = path.resolve(ROOT, configured);
  if (!fs.existsSync(absolute)) {
    throw new Error(
      [
        `App not found: ${absolute}`,
        `  - put your app build there, or`,
        `  - run "${downloadScript}" to fetch the public sample app, or`,
        `  - point ${envName} in .env at your own build.`,
      ].join('\n'),
    );
  }
  return absolute;
}

export function androidCapabilities(): WebdriverIO.Capabilities {
  const caps: Record<string, unknown> = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 240,
    // Turns window animations off while the session runs (restored automatically afterwards).
    'appium:disableWindowAnimation': true,
    // Emulators can be slow on first boot — be generous.
    'appium:adbExecTimeout': 60_000,
    'appium:uiautomator2ServerInstallTimeout': 90_000,
  };
  if (process.env.ANDROID_APP_PACKAGE) {
    // The build is ALREADY installed on the device: Appium only launches it, it never installs.
    // Install a new build once with:  npm run install:app
    caps['appium:appPackage'] = process.env.ANDROID_APP_PACKAGE;
  } else {
    // Appium installs the APK itself (it skips the install when the same version is there).
    caps['appium:app'] = resolveApp('ANDROID_APP', 'android.wdio.native.app.v2.2.0.apk', 'npm run get:app:android');
    // Reinstall even when the version code is the same — for one run after a new build.
    if (process.env.ANDROID_FORCE_INSTALL === 'true') caps['appium:enforceAppInstall'] = true;
  }
  // Experiment/diagnostic switch: keep the app's data between sessions (default is a reset).
  if (process.env.ANDROID_NO_RESET === 'true') caps['appium:noReset'] = true;
  if (process.env.ANDROID_PLATFORM_VERSION) caps['appium:platformVersion'] = process.env.ANDROID_PLATFORM_VERSION;
  if (process.env.ANDROID_UDID) caps['appium:udid'] = process.env.ANDROID_UDID;
  return caps as WebdriverIO.Capabilities;
}

export function iosCapabilities(): WebdriverIO.Capabilities {
  const caps: Record<string, unknown> = {
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 16',
    'appium:app': resolveApp('IOS_APP', 'ios.simulator.wdio.native.app.v2.2.0.zip', 'npm run get:app:ios'),
    'appium:newCommandTimeout': 240,
    'appium:wdaLaunchTimeout': 120_000,
  };
  if (process.env.IOS_PLATFORM_VERSION) caps['appium:platformVersion'] = process.env.IOS_PLATFORM_VERSION;
  if (process.env.IOS_UDID) caps['appium:udid'] = process.env.IOS_UDID;
  return caps as WebdriverIO.Capabilities;
}
