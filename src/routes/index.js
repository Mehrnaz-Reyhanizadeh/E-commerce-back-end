const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const commentRouter = require("./comment");
const adminRouter = require("./admin");
const { isLoggined, isAdmin } = require("./../middlewares/auth");
const error = require("../middlewares/error");

router.use("/auth", authRouter);

router.use("/user", isLoggined, userRouter);
router.use("/product", isLoggined, productRouter);
router.use("/comment", isLoggined, commentRouter);
router.use("/admin", isLoggined, isAdmin, adminRouter);
router.use(error);

module.exports = router;
