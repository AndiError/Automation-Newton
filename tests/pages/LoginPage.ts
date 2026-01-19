import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginStart: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly showPassword: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selectors based on your working scenario (Playwright codegen output).
    this.loginStart = page.getByRole('button', { name: 'Login' });
    this.email = page.getByRole('textbox', { name: 'Email address' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.showPassword = page.getByRole('switch', { name: 'Show password' });
    this.submit = page.getByRole('button', { name: 'Continue', exact: true });
  }

  async goto() {
    await this.page.goto('/login?returnTo=%2F', { waitUntil: 'domcontentloaded' });
  }

  async login(email: string, password: string) {
    await this.loginStart.click();
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }

  async assertLoggedIn() {
    // Basic post-login assertion:
    await expect(this.page).not.toHaveURL(/\/login/i);
  }
}

