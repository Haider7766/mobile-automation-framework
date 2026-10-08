import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import type { Options } from '@wdio/types';
import { logScreenSummary, saveFailureScreenshot } from '../utils/diagnostics';

export const ROOT = process.cwd();

/**
 * Settings shared by every platform config (Android, iOS, web).
 * Think of this as the equivalent of the common parts of playwright.config.ts.
 */
export const sharedConfig: Options.Testrunner = {
  runner: 'local',
  tsConfigPath: path.join(ROOT, 'tsconfig.json'),

  // Real devices/emulators are a scarce, stateful resource — run one session at a time.
  maxInstances: 1,

  logLevel: 'warn',
  waitforTimeout: 15_000,
  // A request to the device that gets no answer is retried. For debugging, set
  // WDIO_CONNECTION_TIMEOUT_MS=45000 and WDIO_CONNECTION_RETRIES=0 so a dead device
  // fails in about a minute instead of several.
  connectionRetryTimeout: Number(process.env.WDIO_CONNECTION_TIMEOUT_MS ?? 120_000),
  connectionRetryCount: Number(process.env.WDIO_CONNECTION_RETRIES ?? 2),

  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 180_000 },

  reporters: [
    'spec',
    [
      'junit',
      {
        outputDir: path.join(ROOT, 'reports', 'junit'),
        outputFileFormat: (options: { cid: string }) => `results-${options.cid}.xml`,
      },
    ],
  ],

  // Runs once per session, right after the device/browser session is created.
  before: async function () {
    // UiAutomator2 waits for the UI to go "idle" before every interaction (default: 10 s).
    // Apps with constant animations never go idle, which makes each step very slow or
    // makes requests time out. A small value keeps the stability benefit without the hang.
    // Tune with ANDROID_WAIT_FOR_IDLE_MS in .env (0 disables the wait completely).
    if (browser.isAndroid) {
      const idleMs = Number(process.env.ANDROID_WAIT_FOR_IDLE_MS ?? 250);
      await browser.updateSettings({ waitForIdleTimeout: idleMs });
    }
  },

  // On failure, keep a screenshot and print what the device is actually showing, so the
  // cause is visible without re-running (see utils/diagnostics.ts). Both are time-capped,
  // so a dead device session cannot hang the run.
  afterTest: async function (test, _context, { passed }) {
    if (passed) return;
    await saveFailureScreenshot(test.title);
    await logScreenSummary(test.title);
  },
};