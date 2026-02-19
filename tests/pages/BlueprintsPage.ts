import { expect, type Locator, type Page } from '@playwright/test';

export class BlueprintsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to Blueprints page
   */
  async goto() {
    await this.page.getByRole('menuitem', { name: 'Blueprints' }).click();
    // Verify we're on Blueprints page
    await expect(
        this.page.locator('h1', { hasText: 'Blueprints' })
    ).toBeVisible();
  }

  /**
   * Select project from project filter dropdown
   */
  async selectProjectFilter(projectName: string) {
    // Click project filter button
    await this.page.locator("button[class*='_projectFilter_']").click();
    
    // Select project from dropdown
    await this.page
      .locator('.ant-dropdown-menu')
      .getByRole('menuitem', { name: projectName })
      .click();

    // Wait for page to settle
    await this.page.waitForTimeout(1000);

    // Verify loading spinner is gone
    await expect(
      this.page.locator('[class*="spinner"], [class*="loading"]'),
      'Verify the loading spinner is not visible'
    ).not.toBeVisible({ timeout: 30000 });
  }

  /**
   * Click on "Shared with me" tab
   */
  async clickSharedWithMeTab() {
    await expect(
      this.page.getByTitle('Shared with me'),
      "Expect the 'Shared with me' tab to be visible"
    ).toBeVisible();

    await this.page.getByTitle('Shared with me').click();

    // Verify loading spinner is gone
    await expect(
      this.page.locator('[class*="spinner"], [class*="loading"]'),
      'Verify the loading spinner is not visible'
    ).not.toBeVisible({ timeout: 30000 });
  }

  /**
   * Search for a blueprint by name
   */
  async searchBlueprint(blueprintName: string) {
    // Click on the search button
    await this.page
      .locator('[class*="_searchWrapper_"]')
      .locator('button')
      .last()
      .click();

    // Wait for search input to be visible
    const searchInput = this.page.getByRole('combobox', { name: 'Search' }).last();
    await expect(
      searchInput,
      'Wait for search input to be visible'
    ).toBeVisible({ timeout: 10000 });

    // Enter search keyword
    await searchInput.fill(blueprintName);

    // Press Enter to search
    await this.page.keyboard.press('Enter');

    // Verify loading spinner is gone
    await expect(
      this.page.locator('[class*="spinner"], [class*="loading"]'),
      'Verify the loading spinner is not visible'
    ).not.toBeVisible();
  }

  /**
   * Verify a blueprint is visible on the page
   */
  async assertBlueprintVisible(blueprintName: string, timeout: number = 10000) {
    await expect(
      this.page.getByText(blueprintName),
      `Verify the shared blueprint "${blueprintName}" is visible`
    ).toBeVisible({ timeout });
  }

  /**
   * Click on "3 dots" menu for a blueprint
   */
  async openBlueprintMenu(blueprintName: string) {
    // Find the blueprint card/row and click its 3 dots menu
    // Try multiple strategies to find the menu button
    const blueprintText = this.page.getByText(blueprintName);
    
    // Strategy 1: Look for button with "More options" or similar near the blueprint
    const menuButton = this.page
      .locator(`[class*="blueprint"], [class*="card"], [class*="item"]`)
      .filter({ has: blueprintText })
      .getByRole('button', { name: /more|options|menu|\.\.\./i })
      .first();
    
    if (await menuButton.count() > 0) {
      await menuButton.click();
    } else {
      // Strategy 2: Look for any button with aria-label containing "more" or "options"
      await this.page
        .locator('button[aria-label*="more"], button[aria-label*="options"], button[aria-label*="menu"]')
        .first()
        .click();
    }
  }

  /**
   * Verify specific menu options are visible in "3 dots" menu
   */
  async assertMenuOptionVisible(optionName: string) {
    await expect(
      this.page.getByRole('menuitem', { name: optionName }),
      `Menu option "${optionName}" should be visible`
    ).toBeVisible({ timeout: 5000 });
  }
}
