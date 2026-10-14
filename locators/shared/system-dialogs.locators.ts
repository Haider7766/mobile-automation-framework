export const SystemDialogsLocators = {
  // One-time dialog Android shows when a freshly installed build opens.
  // "android:id/button1" is the id of EVERY standard alert dialog's positive button, so the
  // button text is part of the selector — otherwise other dialogs could be tapped by accident.
  dontShowAgainButton: 'android=new UiSelector().resourceId("android:id/button1").textContains("show")',
} as const;