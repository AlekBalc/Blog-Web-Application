// @ts-check
import { test, expect } from "@playwright/test"
import { Page } from "./helpers/page";
import { DeleteBlog } from "./helpers/request";
import { time } from "console";

test.describe("E2E UI tests for demo", async () => {
  let blogPage;
  test.beforeEach( async ({page}) => {
    blogPage = new Page(page);
  })

  test('Should have heading', async ({ page }) => {
    await blogPage.goto();
  
    await expect(blogPage.heading).toBeVisible();

    expect(await blogPage.heading.innerText()).toBe("Blog Application")
  });  

  test('Should create and delete post', async ({ page }) => {
    const timestamp = Date.now();
    await blogPage.goto();
  
    await blogPage.addBlog(timestamp, "Random content");

    const blog = await blogPage.getBlog(timestamp);
    expect(blog).toBeVisible();
    
    await blogPage.deleteBlog(timestamp);

    const blog2 = await blogPage.getBlog(timestamp);
    await expect(blog2).toHaveCount(0);
  });  

})

