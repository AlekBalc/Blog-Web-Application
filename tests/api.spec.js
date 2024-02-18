// @ts-check
import { test, expect } from "@playwright/test"
import { DeleteBlog, getBlog, getBlogs, postBlog } from "./helpers/request";



test.describe("E2E API tests for demo", async () => {
  test('Should create and delete post', async ({ request }) => {
    const postResponse = await postBlog(request, "test title", "test content");
    expect(postResponse.status()).toBe(201);
    
    const postResultJSON = await postResponse.json();
    const blogId = postResultJSON.id;

    const getResponse = await getBlog(request, blogId);
    expect(getResponse.status()).toBe(200);

    const deleteResponse = await DeleteBlog(request, blogId);
    expect(deleteResponse.status()).toBe(200);

    const getResponse2 = await getBlog(request, blogId);
    expect(getResponse2.status()).toBe(404);
  });
})