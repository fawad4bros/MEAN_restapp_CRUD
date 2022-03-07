const mongoose = require("mongoose");
const fs = require("fs");
const ItemsModel = require("../models/items");
const multer = require("../lib/multer");
const { serverImagesPath } = require("../lib/config/config");

// Get Single item

const singleItem = async (req, res) => {
  await ItemsModel.findOne({ id: req.params.id })
    .then((item) => {
      if (!item) {
        return res.status(404).json({
          message: `No item found with id ${{ id: req.params.id }}`,
        });
      } else {
        return res.status(200).json({
          item: item,
        });
      }
    })
    .catch((err) => {
      //if promise not resolved
      return res.status(500).json({
        message: err.message,
        //500 Internal Server Error
      });
    });
};

// Get Items

const items = async (req, res) => {
  await ItemsModel.find()
    .then((items) => {
      return res.status(200).send(items);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
        //500 Internal Server Error
      });
    });
};

// Adding Item

const addItem = async (req, res) => {
  const uploadItem = new ItemsModel({
    _id: new mongoose.Types.ObjectId(),
    id: req.body.id,
    title: req.body.title,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    featured: req.body.featured,
    image: req.body.image.image,
    imagePath: req.body.image.imagePath,
  });
  await uploadItem
    .save()
    .then((result) => {
      return res.status(201).json({
        item: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

//Update Item

const updateItem = (req, res) => {
  const filter = { id: req.params.id };
  const update = {
    title: req.body.title,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    featured: req.body.featured,
    image: req.body.image.image,
    imagePath: req.body.image.imagePath,
  };
  const option = { new: false };
  ItemsModel.findOneAndUpdate(filter, update, option)
    .then((result) => {
      const path = `public/images/${result.image}`;
      try {
        fs.unlinkSync(path);
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
      return res.status(201).json({
        previousItem: result,
      });
    })
    .catch((err) => {
      return res.json({
        message: err.message,
      });
    });
};

//Delete Item

const deleteItem = async (req, res) => {
  await ItemsModel.findOneAndRemove({ id: req.params.id })
    .then((item) => {
      if (!item) {
        //True if no item found
        return res.status(404).json({
          message: `item not found with id: ${req.params.id}`,
        });
      } else {
        const path = `public/images/${item.image}`;
        try {
          fs.unlinkSync(path);
          return res.status(200).json({
            message: `item deleted ${item.name}`,
            item: item,
          });
        } catch (err) {
          res.status(500).json({
            error: err,
          });
        }
      }
    })
    .catch((err) => {
      //if promise not resolved
      return res.status(500).json({
        message: err.message,
        //500 Internal Server Error
      });
    });
};

//File Upload

const fileUpload = async (req, res) => {
  multer.uploadFile(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    } else {
      if (req.file === undefined) {
        return res.json({
          message: "No image File was provided",
        });
      } else {
        return res.status(200).json({
          imagePath: serverImagesPath + req.file.filename,
          image: req.file.filename,
        });
      }
    }
  });
};

module.exports = {
  singleItem,
  items,
  addItem,
  updateItem,
  deleteItem,
  fileUpload,
};
