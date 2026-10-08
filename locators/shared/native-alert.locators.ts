export const NativeAlertLocators = {
  // Android alert dialogs expose their positive button as android:id/button1.
  // (On iOS we use driver.acceptAlert(), so no selector is needed.)
  androidOkButton: 'android=new UiSelector().resourceId("android:id/button1")',
} as const;
