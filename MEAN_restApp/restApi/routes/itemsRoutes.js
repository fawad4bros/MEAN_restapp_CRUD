const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authControllers");
const {
  items,
  singleItem,
  addItem,
  updateItem,
  deleteItem,
  fileUpload,
} = require("../controllers/itemsControllers");
router.get("/items", items);
router.get("/item/:id", singleItem);
router.post("/upload", verifyToken, addItem);
router.put("/update/:id", verifyToken, updateItem);
router.delete("/delete/:id", verifyToken, deleteItem);
router.post("/fileUpload", fileUpload);
module.exports = router;
//apply Jwt verifyToken,
