import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login', () => {
  test('user can log in and start a new conversation (stage)', async ({ page }) => {
    const email = process.env.E2E_EMAIL;
    const password = process.env.E2E_PASSWORD;

    expect(email, 'Missing E2E_EMAIL env var').toBeTruthy();
    expect(password, 'Missing E2E_PASSWORD env var').toBeTruthy();

    const login = new LoginPage(page);
    await login.goto();
    await login.login(email!, password!);
    await login.assertLoggedIn();

    // Open specific project home (from your scenario) – adjust ID if needed
    await page.goto('https://stage.newtonresearch.ai/project/90/home');

    // Click "New Conversation"
    await page.getByRole('menuitem', { name: 'New Conversation' }).getByRole('img').click();

    // Type a message
    const messageBox = page.getByRole('textbox', { name: 'Type a message...' });
    await messageBox.click();
    await messageBox.fill('Tell me your name');
    await page.locator('xpath=/html/body/div/div/div/div/div/div/div/main/div/div/div[2]/footer/div/button').click();



    // Choose Newton and verify its text appears
    // Wait up to 20 seconds for the element containing 'Newton' (with or without dot)
    await expect(page.getByText(/Newton is working on request/)).toBeVisible({ timeout: 20000 });
    

  });
});

