const express = require("express");
const router = express.Router();

const adminRoutes = require("./admin/admin.routes");
const adminMiddleware = require("../middlewares/auth.middleware");

// *********************************************
//        API Routes
// *********************************************

router.get("/public", (req, res) => {
    res.send("Public API route");
});
router.get("/test", (req, res) => {
    res.send("Test API route");
});

// Admin Routes
router.use("/admin", adminMiddleware.adminAuthMiddleware, adminRoutes);



module.exports = router;