export type Tab = 'Home' | 'Webview' | 'Login' | 'Forms' | 'Swipe' | 'Drag';

export const TabBarLocators = {
  /** Bottom tab, found by its accessibility id (works on both platforms). */
  tab: (name: Tab) => `~${name}`,

  /** Root element of each screen — used to confirm navigation worked. */
  screen: {
    Home: '~Home-screen',
    Login: '~Login-screen',
    Forms: '~Forms-screen',
    Swipe: '~Swipe-screen',
  },
} as const;
