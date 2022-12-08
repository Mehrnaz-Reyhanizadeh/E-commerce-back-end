const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.products);
router.get("/:name", controller.product);

module.exports = router;
