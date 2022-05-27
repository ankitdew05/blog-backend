const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    blogname: String,
});

module.exports = mongoose.model("comment",commentSchema);