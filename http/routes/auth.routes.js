const express = require("express");
const router = express.Router();

const authController = require("../controllers/admin/authController");

// *********************************************
//        Auth Routes
// *********************************************

router.post("/admin/signin", authController.signinAdmin);
router.post("/admin/register", authController.registerAdmin);

module.exports = router;