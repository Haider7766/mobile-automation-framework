export const ProductDetailsLocators = {
  screen: '~product screen',
  addToCartButton: '~Add To Cart button',
  // The cart icon in the header. Once the cart holds items, the icon shows their count
  // as a child text — that is what cartBadgeCount points at.
  cartBadge: '~cart badge',
  cartBadgeCount:
    'android=new UiSelector().description("cart badge").childSelector(new UiSelector().className("android.widget.TextView"))',
} as const;