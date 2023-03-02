const Schemas = require("../schemas");
const mongoose = require("mongoose");

module.exports = {
    User: mongoose.model("User", Schemas.User),
    Blogs: mongoose.model("Blogs", Schemas.Blogs),
    Media: mongoose.model("Media", Schemas.Media)
}