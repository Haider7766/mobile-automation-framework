// Installs (or updates) the app build on the connected device.
// Run it ONCE when a new build arrives:  npm run install:app
// Test runs with ANDROID_APP_PACKAGE set only launch the already-installed app.
import 'dotenv/config';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const configured = process.env.ANDROID_APP;
if (!configured) {
  console.error('ANDROID_APP is not set in .env (e.g. ANDROID_APP=apps/mydemo.apk)');
  process.exit(1);
}

const apk = path.resolve(configured);
if (!existsSync(apk)) {
  console.error(`APK not found: ${apk}`);
  process.exit(1);
}

const args = [];
if (process.env.ANDROID_UDID) args.push('-s', process.env.ANDROID_UDID);
args.push('install', '-r', '-g', apk); // -r replace (keeps data), -g grant runtime permissions

console.log(`adb ${args.join(' ')}`);
try {
  execFileSync('adb', args, { stdio: 'inherit' });
  console.log('Installed.');
} catch {
  console.error('Install failed. After a version-downgrade error run "adb uninstall <package>" and retry.');
  process.exit(1);
}