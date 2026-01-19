import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login', () => {
  test('user can log in (stage)', async ({ page }) => {
    const email = process.env.E2E_EMAIL;
    const password = process.env.E2E_PASSWORD;

    expect(email, 'Missing E2E_EMAIL env var').toBeTruthy();
    expect(password, 'Missing E2E_PASSWORD env var').toBeTruthy();

    const login = new LoginPage(page);
    await login.goto();
    await login.login(email!, password!);
    await login.assertLoggedIn();
  });
});

