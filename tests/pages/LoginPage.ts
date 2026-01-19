import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    // NOTE: selectors may need adjustment once you inspect the DOM.
    this.email = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    this.password = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i));
    this.submit = page.getByRole('button', { name: /log in|sign in/i });
  }

  async goto() {
    await this.page.goto('/login?returnTo=%2F', { waitUntil: 'domcontentloaded' });
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }

  async assertLoggedIn() {
    // Generic post-login assertions that usually work even if UI changes:
    await expect(this.page).not.toHaveURL(/\/login/i);
  }
}

