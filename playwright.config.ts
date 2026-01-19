import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env locally (GitHub Actions will use Secrets -> env vars)
dotenv.config();

const baseURL = process.env.BASE_URL ?? 'https://stage.newtonresearch.ai';

export default defineConfig({
  testDir: './tests',
  timeout: 100_000,
  expect: { timeout: 50_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});

