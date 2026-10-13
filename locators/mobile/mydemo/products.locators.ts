import { byTextContains } from '../../shared/platform';

// Products screen of the MyDemo app. Selectors only — no logic here.
export const ProductsLocators = {
  screen: '~products screen',
  productCard: '~store item',
  productName: '~store item text',
  productPrice: '~store item price',
  cartBadge: '~cart badge',
  menuButton: '~open menu',
  sortButton: '~sort button',

  /** A product found by the name shown on it. The name comes from test data. */
  productByName: (name: string) => byTextContains(name),
} as const;