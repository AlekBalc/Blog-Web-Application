export class Blog {
    constructor(title, content) {
        this.id = Date.now();
        this.title = title;
        this.content = content;
    }
}