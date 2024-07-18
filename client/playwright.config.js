// playwright.config.mjs
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run start",
    url: "http://localhost:5173/",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
  },
});
