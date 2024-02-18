import express from "express";
import bodyParser from "body-parser";
import { Blog } from "./classes/blog.js"

const app = express();
const port = 3000;
let blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api", (req, res) => {
    res.status(200).json(blogs);
})

app.get("/api/:id", (req, res) => {
        try{
            const id = parseInt(req.params.id);
            let index = blogs.findIndex(blog => blog.id == id);
            if(index < 0) {
                res.status(404).json({ message: "incorrect id"});
            }
            res.status(200).json(blogs[index]);
        } catch (err) {
            res.status(404).json();
        }

})

app.post("/api", (req, res) => {
    const body = req.body;
    const newBlog = new Blog(body.title, body.content)
    blogs.push(newBlog);
    res.status(201).json( {id: newBlog.id} );
})

app.delete("/api/:id", (req, res) => {
    try{
        const id = parseInt(req.params.id);
        let index = blogs.findIndex(blog => blog.id == id);
        const blog = blogs[index];
        blogs.splice(index, 1);
        res.status(200).json(blog);
    } catch {
        res.status(404).json();
    }
   
})

app.put("/api/:id", (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const body = req.body;
        let index = blogs.findIndex(blog => blog.id === id);
        const blog = blogs[index];
        
        blog.content = body.content;
        blog.title = body.title;
        blogs[index] = blog;
        res.status(200).json(blog);
    } catch {
        res.status(404).json();
    }

})



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