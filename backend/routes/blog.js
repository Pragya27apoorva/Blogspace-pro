const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const auth = require("../middleware/auth");

// CREATE BLOG
router.post("/", auth, async (req,res)=>{
  const blog = new Blog({
    ...req.body,
    author: req.user.id
  });

  await blog.save();
  res.json(blog);
});

// FEED
router.get("/feed", auth, async (req,res)=>{
  const user = await User.findById(req.user.id);

  const blogs = await Blog.find({
    author: { $in: user.following }
  }).populate("author","username");

  res.json(blogs);
});

// LIKE
router.post("/like/:id", auth, async (req,res)=>{
  const blog = await Blog.findById(req.params.id);

  if(!blog.likes.includes(req.user.id)){
    blog.likes.push(req.user.id);
  }

  await blog.save();
  res.json(blog);
});

// COMMENT
router.post("/comment/:id", auth, async (req,res)=>{
  const blog = await Blog.findById(req.params.id);

  blog.comments.push({
    text: req.body.text,
    user: req.user.id
  });

  await blog.save();
  res.json(blog);
});

module.exports = router;