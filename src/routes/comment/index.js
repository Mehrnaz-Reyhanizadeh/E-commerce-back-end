const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.comments);
router.post("/postComment/:id", controller.postComment);
router.delete("/deleteComment/:id", controller.deleteComment);
router.put("/updateComment/:id", controller.updateComment);
router.get("/getProductsComments/:productId", controller.getProductsComments);

module.exports = router;
