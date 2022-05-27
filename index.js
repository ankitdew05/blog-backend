const express = require('express');
const app = express();
require("./db/config");
const cors = require('cors');
require("dotenv").config();
const Blog = require("./db/Blog");
const Comment= require("./db/Comment")
const Contact= require("./db/Contact")
app.use(express.json());
app.use(cors());

app.get("/", (req,resp)=>{
resp.send("its Woking")
});

app.post("/add-blog", async (req, resp) => {
  let blog = new Blog(req.body);
  let result = await blog.save();
  resp.send(result);
});


app.get("/blogs", async (req, resp) => {
  let blogs = await Blog.find();
  if (blogs.length > 0) {
    resp.send(blogs);
  } else {
    resp.send({ result: "No result Found" });
  }
});

app.get("/blogs/:key", async (req, resp) => {
    const result = await Blog.findOne({ key: req.params.key });
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: "No result Found" });
    }
  });


app.delete("/blogs/:id", async (req, resp) => {
  const result = await Blog.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.post("/add-comment", async (req, resp) => {
    let comment = new Comment(req.body);
    let result = await comment.save();
    resp.send(result);
  });

  app.post("/contacts", async (req, resp) => {
    let contacts = new Contact(req.body);
    let result = await contacts.save();
    resp.send(result);
  });

  app.get("/search/:key", async (req, resp) => {
    let result = await Blog.find({
      $or: [
        { title: { $regex: req.params.key } },
        { summary: { $regex: req.params.key } },
        { content: { $regex: req.params.key } },
        { author: { $regex: req.params.key } },
      ],
    });
  
    resp.send(result);
  });

app.listen(process.env.PORT || 5000,()=>{
  console.log("working")
})

