import { test, expect } from "@playwright/test";

const baseURL = "http://localhost:5173";

test("Update Product Test", async ({ page }) => {
  await page.goto(`${baseURL}/products`);

  const productToUpdate = await page.$(".product-item:first-child");
  if (productToUpdate) {
    await productToUpdate.click("button.edit-product");

    await page.fill("#productName", "Updated Product");
    await page.fill("#productPrice", "150");
    await page.fill("#productDescription", "This is an updated product.");

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    const updatedProductName = await page.textContent(
      ".product-item:first-child .product-name"
    );
    expect(updatedProductName).toContain("Updated Product");
  }
});

test("Delete Product Test", async ({ page }) => {
  await page.goto(`${baseURL}/products`);

  const productToDelete = await page.$(".product-item:first-child");
  if (productToDelete) {
    await productToDelete.click("button.delete-product");
    await page.click(".delete-confirmation-modal button.confirm");
  }

  const productStillExists = await page.isVisible(".product-item:first-child");
  expect(productStillExists).toBeFalsy();
});
