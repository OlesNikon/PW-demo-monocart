import { test as base, Browser, BrowserContext, Page } from '@playwright/test';
import { Application } from '../app';

type AppUser = {
  app: Application;
  page: Page;
  context: BrowserContext;
  browser: Browser;
};

const baseTest = base.extend<{ app: Application }>({
  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },
});

const test = baseTest.extend<{
  standardUser: AppUser;
}>({
  standardUser: async ({ browser }, use) => {
    const context = await browser.newContext();
    await context.addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        domain: 'www.saucedemo.com',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: false,
      },
    ]);
    // @ts-expect-error - adding custom property to context
    context.APPIAN_ROLE = 'StandardUser';

    const page = await context.newPage();
    const app = new Application(page);
    await use({ app, page, context, browser });
  },
});

export { test };
export { expect } from '@playwright/test';
