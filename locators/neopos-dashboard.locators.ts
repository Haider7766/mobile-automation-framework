// NeoPOS dashboard: the grid of menu tiles shown after login.
export const NeoposDashboardLocators = {
  menu: 'id=com.croem.pospagoandroid:id/rv_dashboard_items',
  userName: 'id=com.croem.pospagoandroid:id/tv_user_name',
  logoutButton: 'id=com.croem.pospagoandroid:id/img_logout',

  /** One menu tile, found by the name written on it (Sale, Pre-Auth, Reports, ...). */
  item: (name: string) =>
    `android=new UiSelector().resourceId("com.croem.pospagoandroid:id/tv_item_name").text("${name.replace(/"/g, '\\"')}")`,
} as const;