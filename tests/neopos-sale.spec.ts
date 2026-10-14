import { expect } from '@wdio/globals';
import NeoposLoginPage from '../pages/neopos-login.page';
import NeoposDashboardPage from '../pages/neopos-dashboard.page';
import NeoposSalePage from '../pages/neopos-sale.page';
import { TestData } from '../data/test-data';

const login = TestData.neopos.login;
const dashboard = TestData.neopos.dashboard;
const sale = TestData.neopos.sale;

describe('NeoPOS — Sale', () => {
  it('logs in and shows the dashboard', async () => {
    await NeoposLoginPage.waitForScreen();
    await NeoposLoginPage.fillForm(login.username, login.password);
    await NeoposLoginPage.submit();

    await NeoposDashboardPage.waitForScreen();
  });

  it('opens the Sale screen', async () => {
    await NeoposDashboardPage.openItem(dashboard.items.sale);
    await NeoposSalePage.waitForScreen();

    expect(await NeoposSalePage.getHeading()).toBe(sale.expected.heading);
    expect(await NeoposSalePage.getAmount()).toBe(sale.expected.initialAmount);
  });
});