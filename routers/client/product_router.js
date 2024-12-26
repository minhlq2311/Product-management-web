const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/product_controller")

router.get('/', controller.index);

router.get(`/:slugCategory`, controller.category);

router.get(`/detail/:slugProduct`, controller.detail);

module.exports = router;

//Thay app bằng router để đỡ phải truyền tham số app sang