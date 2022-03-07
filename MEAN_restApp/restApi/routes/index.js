const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const itemRoutes = require("./itemsRoutes");

router.use("/auth", authRoutes);
router.use("/items", itemRoutes);

module.exports = router;
