const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    author: String,
    key: String,
    url: String,

});

module.exports = mongoose.model("blogs",blogSchema);