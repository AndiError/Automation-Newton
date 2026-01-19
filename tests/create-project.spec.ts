import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { CreateProjectPage } from './pages/CreateProjectPage';

test.describe('Create Project', () => {
  test('user can create a new project with connector (stage)', async ({ page }) => {
    const email = process.env.E2E_EMAIL;
    const password = process.env.E2E_PASSWORD;

    expect(email, 'Missing E2E_EMAIL env var').toBeTruthy();
    expect(password, 'Missing E2E_PASSWORD env var').toBeTruthy();

    // Login first
    const login = new LoginPage(page);
    await login.goto();
    await login.login(email!, password!);
    await login.assertLoggedIn();

    // Navigate to a project home to access project selector
    await page.goto('https://stage.newtonresearch.ai/project/90/home');

    // Initialize Create Project Page Object
    const createProject = new CreateProjectPage(page);

    // Open project creation flow
    await createProject.openProjectSelector();

    // Fill project details
    const projectName = `New Project TEst QA ${Date.now()}`; // Add timestamp to avoid duplicates
    const description = 'New test description';
    await createProject.fillProjectDetails(projectName, description);

    // Select project color
    await createProject.selectProjectColor();

    // Upload logo (place test files in fixtures/ folder)
    await createProject.uploadLogo('fixtures/toyota-gif.gif');

    // Navigate through wizard
    await createProject.clickNext();
    await createProject.clickBack(); // Test back navigation
    await createProject.clickNext(); // Continue forward

    // Add connector (place test files in fixtures/ folder)
    // Example:
    const connectorTitle = `3Toyota_Sales_Analysis2024s ${Date.now()}`;
    await createProject.addConnector('fixtures/3Toyota_Sales_Analysis2024.xlsx', connectorTitle);

    // Create the project
    await createProject.createProject();

    // Verify project was created
    await createProject.assertProjectCreated(projectName);

    // Optional: Logout (uncomment if needed)
    // await createProject.logout(projectName);
  });
});
