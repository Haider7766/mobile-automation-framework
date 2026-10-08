# Mobile Automation Framework — WebdriverIO + Appium + TypeScript

A test-automation framework for **Android, iOS and web**, built on the **Page Object Model**.
One set of page objects and specs runs on both mobile platforms; only the capabilities differ.

| | |
|---|---|
| Runner | [WebdriverIO](https://webdriver.io) v10 (Mocha, `expect-webdriverio` assertions) |
| Mobile engine | [Appium](https://appium.io) 3 — UiAutomator2 (Android) and XCUITest (iOS) drivers |
| Language | TypeScript |
| Reporting | Spec reporter in the console, JUnit XML + failure screenshots in `reports/` |
| CI | GitHub Actions workflow with an Android emulator (`.github/workflows/android.yml`) |

## Why this layout

The structure mirrors a Playwright POM project, so it is familiar to anyone who has used one:

```
config/                 wdio.shared / android / ios / web configs + capabilities
locators/
  shared/               platform helpers, tab bar, native alert
  mobile/<module>/      selectors only — no logic
  web/<module>/
pages/
  shared/               BasePage (waits, tap, type), TabBar, NativeAlert
  mobile/<module>/      actions built from locators ("login", "signUp", ...)
  web/<module>/
tests/
  mobile/<module>/      specs call page methods only — never raw selectors
  web/<module>/
data/test-data.ts       static test data (secrets come from the environment)
utils/                  env helpers, unique-value generators
scripts/                downloads the public sample app
```

**Rules of the house**

- Specs never contain selectors or sleeps. Selectors live in `locators/`, behaviour in `pages/`.
- Anything used by every module (navigation, alerts, waits) lives in `shared/` and is reused, not copied.
- Accessibility ids (`~id`) are used wherever possible because they are identical on Android and iOS.
  When a screen genuinely differs per platform, use `byPlatform({ android, ios })` from `locators/shared/platform.ts`.
- Secrets are never hardcoded: `data/test-data.ts` reads them from the environment.

## Prerequisites

| For | You need |
|---|---|
| Everything | Node.js 20+ (see `.nvmrc`), Git |
| Android | JDK 17+, Android Studio (SDK + an emulator/AVD), `ANDROID_HOME` set, `platform-tools` on `PATH` |
| iOS | macOS, Xcode, an iOS simulator (cannot run on Windows/Linux) |
| Web | Google Chrome |

Check an Android machine with: `npm run doctor:android` — it lists exactly what is missing
(`ANDROID_HOME` and `adb`/`emulator` are required; `bundletool` and `gstreamer` are optional).

## Quick start (Android)

```bash
npm ci                         # installs WebdriverIO, Appium AND the Android/iOS drivers (no global installs)
cp .env.example .env           # Windows PowerShell: Copy-Item .env.example .env
npm run get:app:android        # downloads the public sample app into apps/
# start an emulator from Android Studio (Device Manager) and wait until it has booted
npm run doctor:android
npm run test:android
```

Appium is started and stopped automatically by the test run — there is no separate server to manage.

Other commands:

```bash
npm run test:ios       # macOS only: npm run get:app:ios first
npm run test:web       # desktop Chrome; set HEADLESS=false in .env to watch it
npm run typecheck
npx wdio run config/wdio.android.conf.ts --spec tests/mobile/login/login.spec.ts   # one spec
```

## Configuration

Everything is driven by environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `MOBILE_EMAIL`, `MOBILE_PASSWORD` | Credentials used by the mobile specs |
| `ANDROID_APP` / `IOS_APP` | Path or `https://` URL of **your** build (defaults to the sample app in `apps/`) |
| `ANDROID_DEVICE_NAME`, `ANDROID_PLATFORM_VERSION`, `ANDROID_UDID` | Pick a specific emulator/device |
| `IOS_DEVICE_NAME`, `IOS_PLATFORM_VERSION`, `IOS_UDID` | Pick a specific simulator/device |
| `WEB_BASE_URL`, `WEB_USERNAME`, `WEB_PASSWORD`, `HEADLESS` | Web sample |

To test your own app, point `ANDROID_APP`/`IOS_APP` at your build and replace the sample module
(`locators|pages|tests/mobile/login`) with your own screens.

## Adding a new module (e.g. "Profile")

1. Create `locators/mobile/profile/profile.locators.ts` — selectors only.
2. Create `pages/mobile/profile/profile.page.ts` — extend `BasePage`, expose user actions (`open()`, `updateName()`, ...).
3. Create `tests/mobile/profile/profile.spec.ts` — call page methods and assert with `expect(...)`.
4. Reuse `shared/` for navigation, alerts and waits instead of re-implementing them.

## Finding locators

Use [Appium Inspector](https://github.com/appium/appium-inspector): start an emulator, connect it to
`http://127.0.0.1:4723` with the same capabilities as `config/capabilities.ts` (start Appium with
`npx appium` first), then click any element to see its accessibility id / resource-id / XPath.
When a build changes, you normally only edit the matching file in `locators/`.

## Sample app

The sample specs target WebdriverIO's public
[native demo app](https://github.com/webdriverio/native-demo-app) (v2.2.0): login, sign-up,
and tab navigation. `npm run get:app:android` / `get:app:ios` download it into `apps/`
(binaries are git-ignored).

## Reports

- Console: spec reporter
- `reports/junit/*.xml`: JUnit results (consumed by Azure Pipelines / GitHub / Jenkins test tabs)
- `reports/screenshots/`: one screenshot per failed test
- `reports/appium/`: Appium server log

## CI

`.github/workflows/android.yml` boots an Android emulator on a GitHub-hosted runner and runs the suite.
The same four steps work on any CI (Azure Pipelines, Jenkins, ...): install Node + JDK + Android SDK,
`npm ci`, make the app build available, `npm run test:android`, publish `reports/`.
Provide credentials as CI secrets (`MOBILE_EMAIL`, `MOBILE_PASSWORD`), never in the repo.

## Security

- `.env` is git-ignored — only `.env.example` (placeholders / public demo values) is committed.
- Before every push: `git ls-files .env` must print nothing.
- If a real credential is ever committed, rotate it immediately and remove it from history.
