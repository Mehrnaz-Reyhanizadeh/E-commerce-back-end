const express = require("express");
const router = express.Router();
const controller = require("./controller");
const uploadProductImage = require("../../upload/uploadProductImage");

router.get("/", controller.dashboard);
router.post(
  "/postProduct",
  uploadProductImage.single("img"),
  (req, res, next) => {
    if ("!req.file") {
      req.body.img = null;
    } else {
      req.body.img = req.file.filename;
    }
    next();
  },
  controller.postProduct
);

module.exports = router;
