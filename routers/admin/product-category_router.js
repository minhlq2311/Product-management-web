const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/product-category_controller");

const multer = require('multer');
const upload = multer();
const validate = require('../../validates/admin/product-category_validate');
const uploadCloudinary = require('../../middlewares/admin/uploadCloudinary_middleware');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
  '/create', 
  upload.single('thumbnail'),
  uploadCloudinary.upload,
  validate.createPost,
  controller.createPost
);

router.get('/edit/:id', controller.edit);

router.patch(
  '/edit/:id',
  upload.single('thumbnail'),
  uploadCloudinary.upload,
  validate.createPost,
  controller.editPatch
)

router.get('/detail/:id', controller.detail);

router.delete('/delete/:id', controller.deleteCategory);

module.exports = router;