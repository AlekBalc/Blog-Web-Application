import express from "express";
import bodyParser from "body-parser";
import { Blog } from "./classes/blog.js"

const app = express();
const port = 3000;
let blogs = [];




app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", (req, res) => {
    const body = req.body;
    console.log(body);
    if(body._method === "DELETE") {
        let index = blogs.findIndex(blog => blog.id == body.id);
        blogs.splice(index, 1);
    } else if (body._method === "PUT") {
        console.log(body);
        let index = blogs.findIndex(blog => blog.id == body.id);
        blogs[index] = new Blog(body.title, body.content);

    } else {
        blogs.push(new Blog(body.title, body.content));
    }
    res.render("index.ejs", { blogs: blogs });
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
})