const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/deletedProduct_controller");

router.get('/', controller.deletedProducts);

module.exports = router;