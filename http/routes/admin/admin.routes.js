const express = require("express");
const router = express.Router();

const utils = require("../../../utils/media");

const blogController = require("../../controllers/admin/blogsController");
const userController = require("../../controllers/admin/usersController");
const mediaController = require("../../controllers/admin/mediaController");


// Blogs Routes 
router.post("/new_blog", blogController.newBlog);
router.get("/get_all_blog", blogController.getAllBlog);
router.get("/get_specific_blog/:slug", blogController.getSpecificBlog);
router.post("/update_blog", blogController.updateBlog);
router.post("/delete_blog", blogController.deleteBlog);


// Users Routes
router.get("/get_users", userController.getAllUsers);
router.post("/register_user", userController.registerUser);
router.get("/get_specific_user/:username", userController.getSpecificUser);
router.post("/update_user", userController.updateUser);
router.post("/delete_user", userController.deleteUser);


// Media Library Routes
router.post("/upload_media", utils.upload("mediaFile"), mediaController.uploadNew);
router.get("/list_all_media", mediaController.listAllMediaFiles);
router.post("/get_specific_media_file", mediaController.getSpecificFile);
router.post("/delete_specific_media_file", mediaController.deleteFile);


module.exports = router;