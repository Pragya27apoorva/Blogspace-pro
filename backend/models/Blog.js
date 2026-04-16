const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  comments: [
    {
      text: String,
      user: String,
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);