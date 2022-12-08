const controller = require("../controller");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async comments(req, res) {
    const comment = await this.Comment.find();
    this.response({ res, message: "ok", data: comment });
  }

  async postComment(req, res) {
    const product = await this.Product.findById(req.params.id);
    if (!product) {
      return this.response({
        res,
        code: 400,
        message: "product doesn't exist.",
      });
    }
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await this.User.findById(decoded._id);

    const comment = new this.Comment({
      content: req.body.content,
      name: user._id,
      productId: product._id,
    });

    await comment.save();
    this.response({ res, data: product, message: "ok" });
  }
  async deleteComment(req, res) {
    const comment = await this.Comment.findById(req.params.id);
    if (!comment)
      this.response({ code: 400, res, message: "this comment doesn't exist" });
    comment.remove();

    this.response({ res, message: "message delete successfuly" });
  }
  async updateComment(req, res) {
    const comment = await this.Comment.findById(req.params.id);
    if (!comment)
      this.response({ code: 400, res, message: "this comment doesn't exist" });

    comment.content = req.body.content;
    await comment.save();
    this.response({
      res,
      message: "message update successfuly",
      data: comment,
    });
  }
  async getProductsComments(req, res) {
    const comment = await this.Comment.find({
      productId: req.params.productId,
    });

    if (!comment)
      this.response({
        code: 400,
        res,
        message: "comment for this product doesn't exist",
      });

    this.response({
      res,
      message: "message update successfuly",
      data: comment,
    });
  }
})();
