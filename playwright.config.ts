import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export const BASE_URL = 'https://www.saucedemo.com/';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    [
      'monocart-reporter',
      {
        name: 'My Test Report',
        outputFile: './monocart-report/index.html',
        trend: './monocart-report/index.json',
        // zip: true,
        // onEnd: async (reportData, helper) => {
        //   await testrail(reportData, helper);
        // }
      },
    ],
    ['playwright-reporter-testrail', {
      domain: process.env.TESTRAIL_HOST,
      username: process.env.TESTRAIL_USERNAME,
      password: process.env.TESTRAIL_PASSWORD,
      includeAllCases: false,
      includeAttachments: true,
      closeRuns: false,
      apiChunkSize: 10,
      runNameTemplate: 'Playwright Run #{date}'
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 30_000,
    baseURL: BASE_URL,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    acceptDownloads: true,
    headless: Boolean(process.env.CI),
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
      },
    },
  ],
});
