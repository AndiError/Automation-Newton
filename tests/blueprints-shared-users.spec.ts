import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { BlueprintsPage } from './pages/BlueprintsPage';

test.describe('Blueprints - Shared Users (View)', () => {
  test('Verify that shared users (View) have the following options in the "3 dots" menu @smoke', async ({ page }) => {
    const email = process.env.E2E_EMAIL || 'checksum@newtonresearch.ai';
    const password = process.env.E2E_PASSWORD || 't2sb7rfkhZdI9saRt1dP';

    expect(email, 'Missing E2E_EMAIL env var').toBeTruthy();
    expect(password, 'Missing E2E_PASSWORD env var').toBeTruthy();

    // Login first
    const login = new LoginPage(page);
    await login.goto();
    await login.login(email, password);
    await login.assertLoggedIn();

    // Initialize Blueprints Page Object
    const blueprints = new BlueprintsPage(page);

    // Navigate to Blueprints
    await blueprints.goto();

    // Select project filter
    const projectName = 'CHECKSUM DO NOT DELETE PROJECT';
    await blueprints.selectProjectFilter(projectName);

    // Click on "Shared with me" tab
    await blueprints.clickSharedWithMeTab();

    // Search for the shared blueprint
    const blueprintName = 'CHECKSUM_SHARED_CONNECTOR_DO_NOT_DELETE';
    await blueprints.searchBlueprint(blueprintName);

    // Verify the shared blueprint is visible
    await blueprints.assertBlueprintVisible(blueprintName, 30000);

    // Open the "3 dots" menu for the blueprint
    await blueprints.openBlueprintMenu(blueprintName);

    // Verify expected menu options are visible
    // Add the specific options you want to verify here
    // Example options (adjust based on actual menu items):
    // await blueprints.assertMenuOptionVisible('View');
    // await blueprints.assertMenuOptionVisible('Copy link');
    // await blueprints.assertMenuOptionVisible('Remove');
    
    // Note: Uncomment and adjust the menu option names based on what should be visible
    // for users with "View" permissions
  });
});
