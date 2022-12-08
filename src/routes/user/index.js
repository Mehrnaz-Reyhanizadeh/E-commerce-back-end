const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.dashboard);
router.get("/getMe", controller.getMe);
router.put("/updateMe", controller.updateMe);

module.exports = router;
