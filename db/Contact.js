const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: String,
});

module.exports = mongoose.model("contacts",contactSchema);