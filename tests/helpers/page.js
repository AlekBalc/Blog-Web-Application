export class Page {
    constructor(page) {
        this.url = "http://localhost:3000/";
        this.page = page;
        this.addBlogButton = this.page.locator(".submit-blog");
        this.newBlogTitle = this.page.locator(".title-input");
        this.newBlogContent = this.page.locator(".blog-content-input");
        this.heading = this.page.locator("h1");
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async addBlog(title, content) {
       await this.newBlogTitle.fill(title.toString());
       await this.newBlogContent.fill(content.toString());
       await this.addBlogButton.click();
    }

    async deleteBlog(title){
        const deleteButton = this.page.locator(`div>input[value='${title}'] ~ button.delete`);
        await deleteButton.click();
    }

    async getBlog(title) {
        return this.page.locator(`div.blog:has(input[value='${title}'])`);
    }

}