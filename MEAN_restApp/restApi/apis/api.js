const express = require("express");
const router = express.Router();
const routes = require("../routes/index");
router.use("/api", routes);
module.exports = router;
