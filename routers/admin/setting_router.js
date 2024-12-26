const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/settings_controller");
const multer = require('multer');
const upload = multer();
const uploadCloudinary = require('../../middlewares/admin/uploadCloudinary_middleware');

router.get('/general', controller.general);

router.patch('/general',
  upload.single("logo"),
  uploadCloudinary.upload,
  controller.generalPatch
);

module.exports = router;
