const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/my-account_controller")
const multer = require('multer');
const upload = multer();
const uploadCloudinary = require('../../middlewares/admin/uploadCloudinary_middleware');

router.get('/', controller.index);

router.get('/edit', controller.edit);

router.patch(
  '/edit', 
  upload.single('avatar'),
  uploadCloudinary.upload,
  controller.editPatch
);

module.exports = router;