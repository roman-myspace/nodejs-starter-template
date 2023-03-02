const express = require("express");
const router = express.Router();
const apiRoutes = require("./api.routes");
const authRoutes = require("./auth.routes");



// *********************************************
//        API Pre-defined Routes
// *********************************************
router.get("/", (req, res) => {
    // res.send("Greeting");
    res.send({
        title: "greeting"
    });
});
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;