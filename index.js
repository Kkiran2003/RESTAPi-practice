const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override")
const port = 8080;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"))
app.set("views", path.join(__dirname, "/views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

let posts = [
    {
        id: uuidv4(),
        username: "K.Kiran",
        content: "Do it for yourself"
    },
    {
        id: uuidv4(),
        username: "K.Diksha",
        content: "live a life Bindass"
    },
    {
        id: uuidv4(),
        username: "Gourav",
        content: "find piece"
    }
]

//show posts
app.get("/posts", (req, res) => {
   return res.render("index.ejs", { posts })
})
//display forms
app.get("/posts/new", (req, res) => {
    return res.render("new.ejs")
})
//create new posts
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4()
    posts.push({ id, username, content })
    return res.redirect("/posts")
})
//display single post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.send("post not found")
    }
  return  res.render("show.ejs", { post, title: "post details" })
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id)

    if (!post) {
        return res.send("no such post")
    }
   return res.render("edit.ejs", { post });
})

//update post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let { content } = req.body;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.send("post not found");
    }
    post.content = content;
   return res.redirect("/posts")
})

app.delete("/posts/:id",(req,res) =>{
    let {id} = req.params;
      posts = posts.filter((p) => id !== p.id);
    if(!posts){

        return  res.send("delete failed")
    }
    return res.redirect("/posts")

})

app.listen(port, () => {
    console.log(`server listen port ${port}`)
}
)
