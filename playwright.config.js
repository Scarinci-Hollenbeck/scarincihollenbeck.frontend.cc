const { defineConfig } = require('@playwright/test');

const E2E_BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:7300';

module.exports = defineConfig({
  reporter: process.env.CI ? 'line' : 'list',
  projects: [
    {
      name: 'unit',
      testDir: './tests/unit',
    },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: { baseURL: E2E_BASE_URL },
    },
  ],
});
