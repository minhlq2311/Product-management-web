const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/search_controller.js")

router.get('/', controller.index);

module.exports = router;