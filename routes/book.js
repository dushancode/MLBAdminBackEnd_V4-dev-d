const express = require("express");

const bookController = require("../controllers/book");
const { uploadImages } = require("../middleware/uploadImage");
const router = express.Router();

router.post("/store", bookController.storeBook);

module.exports = router;
