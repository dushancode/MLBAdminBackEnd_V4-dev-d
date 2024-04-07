const express = require("express");

const authController = require("../controllers/auth");
const router = express.Router();
const { uploadImages } = require("../middleware/uploadImage");
const { uploadFiles } = require("../middleware/uploadFiles");
const upload = require("../multer");

router.post("/forget-password", authController.forgetPassword);
router.post("/verify-forget-code", authController.verifyCode);
router.post("/change-password", authController.updatePassword);

router.post("/upload-image", upload.single('pictures'), authController.sendResponse);
router.post("/upload-file", uploadFiles, authController.sendResponse);

module.exports = router;
