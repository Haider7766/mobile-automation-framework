// Downloads WebdriverIO's public "native demo app" so the sample tests can run
// out of the box. Usage:  node scripts/download-sample-app.mjs <android|ios>
import { createWriteStream, existsSync, mkdirSync, renameSync } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

const VERSION = 'v2.2.0';
const BASE_URL = `https://github.com/webdriverio/native-demo-app/releases/download/${VERSION}`;
const FILES = {
  android: `android.wdio.native.app.${VERSION}.apk`,
  ios: `ios.simulator.wdio.native.app.${VERSION}.zip`,
};

const platform = process.argv[2];
if (!FILES[platform]) {
  console.error('Usage: node scripts/download-sample-app.mjs <android|ios>');
  process.exit(1);
}

const file = FILES[platform];
const destination = path.resolve('apps', file);

if (existsSync(destination)) {
  console.log(`Already downloaded: ${destination}`);
  process.exit(0);
}

mkdirSync(path.dirname(destination), { recursive: true });
const url = `${BASE_URL}/${file}`;
console.log(`Downloading ${url}`);

const response = await fetch(url, { redirect: 'follow' });
if (!response.ok || !response.body) {
  console.error(`Download failed: HTTP ${response.status}`);
  process.exit(1);
}

// Write to a temp name first so an interrupted download is never mistaken for a good file.
const partial = `${destination}.part`;
await pipeline(Readable.fromWeb(response.body), createWriteStream(partial));
renameSync(partial, destination);
console.log(`Saved to ${destination}`);
