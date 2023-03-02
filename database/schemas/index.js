const mongoose = require("mongoose");

const User = mongoose.Schema({
    full_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, required: true, default: "user" }, 
    token: { type: String },
    created_at: { type: Date, default: Date.now() }
});


const Blogs = mongoose.Schema({
    title: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    excerpt: { type: String, require: true },
    description: { type: String, require: true },
    featured_image: { type: String, require: true },
    created_by: { type: Object },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: null },
    tags: { type: Array },
    status: { type: String }
});

const Media = mongoose.Schema({
    filename: { type: String, required: true },
    name: { type: String, require: true },
    ext: { type: String, require: true },
    directory: { type: String, require: true },
    mime_type: { type: String, required: true },
    url: { type: String, require: true },
    size: { type: String, require: true },
    sizeInBytes: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
})

const AdminSession = mongoose.Schema({
    session_hash: { type: String, required: true },
    expire_at: { type: Date }
})

module.exports = {
    User,
    Blogs,
    Media
}