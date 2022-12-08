const controller = require("../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async products(req, res) {
    const product = await this.Product.find();
    this.response({ res, message: "ok", data: product });
  }
  async product(req, res) {
    const product = await this.Product.find({ model: req.params.model });
    if (!product) {
      return this.response({
        res,
        code: 400,
        message: "product doesn't exist.",
      });
    }
    this.response({ res, data: product, message: "ok" });
  }
})();
