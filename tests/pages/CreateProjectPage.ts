import { expect, type Locator, type Page } from '@playwright/test';

export class CreateProjectPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to project creation flow from project selector
   */
  async openProjectSelector() {
    // Click on project selector button (e.g., "REG_06/")
    await this.page.getByRole('button', { name: /REG_06/ }).click();
    // Click "Add project" button
    await this.page.getByRole('button', { name: 'plus Add project' }).click();
  }

  /**
   * Fill basic project information (Step 1: General)
   */
  async fillProjectDetails(projectName: string, description: string) {
    await this.page.getByRole('textbox', { name: '* Project name' }).click();
    await this.page.getByRole('textbox', { name: '* Project name' }).fill(projectName);
    
    await this.page.getByRole('textbox', { name: 'Description' }).click();
    await this.page.getByRole('textbox', { name: 'Description' }).fill(description);
  }

  /**
   * Select project color (handles color picker interaction)
   */
  async selectProjectColor() {
    // Clear existing color
    await this.page.locator('.ant-color-picker-clear').first().click();
    // Click on color saturation area multiple times to select a color
    const saturation = this.page.locator('.ant-color-picker-saturation');
    await saturation.click();
    await saturation.click();
    await saturation.click();
    // Select "Transparent" option
    await this.page.getByText('Transparent', { exact: true }).click();
    // Click on palette saturation again
    await this.page.locator('[id=":r2p:"] > .ant-popover-inner-content > .ant-color-picker-inner > .ant-color-picker-inner-content > .ant-color-picker-panel > .ant-color-picker-select > .ant-color-picker-palette > .ant-color-picker-saturation').click();
  }

  /**
   * Upload project logo
   */
  async uploadLogo(filePath: string) {
    await this.page.locator('.ant-select.ant-select-outlined.ant-select-in-form-item > .ant-select-selector').first().click();
    await this.page.getByRole('button', { name: 'Click to upload or drag and' }).click();
    await this.page.locator('#rc_select_1').setInputFiles(filePath);
  }

  /**
   * Navigate to next step in wizard
   */
  async clickNext() {
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  /**
   * Navigate back in wizard
   */
  async clickBack() {
    await this.page.getByRole('button', { name: 'Back' }).click();
  }

  /**
   * Add a connector (file upload)
   */
  async addConnector(filePath: string, connectorTitle: string) {
    await this.page.getByRole('button', { name: 'plus Add connector' }).click();
    const uploadButton = this.page.getByRole('button', { name: 'Click to upload or drag and drop Supported file types: CSV, PPTX, XLSX, HYPER' });
    await uploadButton.click();
    await uploadButton.setInputFiles(filePath);
    
    await this.page.getByRole('textbox', { name: '* Connector title' }).click();
    await this.page.getByRole('textbox', { name: '* Connector title' }).fill(connectorTitle);
    
    await this.clickNext();
    await this.clickNext();
    await this.page.getByRole('button', { name: 'Create connector' }).click();
  }

  /**
   * Complete project creation
   */
  async createProject() {
    // Navigate through wizard steps if needed
    await this.page.goto('https://stage.newtonresearch.ai/projects/new#general');
    await this.clickNext();
    await this.clickNext();
    await this.page.getByRole('button', { name: 'Create project' }).click();
  }

  /**
   * Verify project was created successfully
   */
  async assertProjectCreated(projectName: string) {
    await expect(this.page.getByRole('heading', { name: projectName })).toBeVisible({ timeout: 20000 });
  }

  /**
   * Logout from the application
   */
  async logout(projectName: string) {
    await this.page.getByRole('button', { name: projectName }).click();
    await this.page.getByRole('button', { name: 'More options' }).click();
    await this.page.getByText('Log out').click();
  }
}
