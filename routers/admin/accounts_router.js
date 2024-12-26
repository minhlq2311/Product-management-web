const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/accounts_controller");
const multer = require('multer');
const uploadCloudinary = require('../../middlewares/admin/uploadCloudinary_middleware');
const upload = multer();
const validate = require('../../validates/admin/account_validate');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
  '/create', 
  upload.single("avatar"),
  uploadCloudinary.upload, 
  validate.createPost, 
  controller.createPost
);

router.get('/edit/:id', controller.edit);

router.get('/detail/:id', controller.detail);

router.delete('/delete/:id', controller.deleteAccount);

router.patch(
  '/edit/:id', 
  upload.single("avatar"),
  uploadCloudinary.upload,
  validate.editPatch,
  controller.editPatch);

module.exports = router;