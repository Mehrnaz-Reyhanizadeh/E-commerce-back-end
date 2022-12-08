const controller = require("../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async dashboard(req, res) {
    res.send("admin dashboard");
  }
  async postProduct(req, res) {
    let product = await this.Product.findOne({ name: req.body.name });
    if (product) {
      return this.response({
        res,
        message: "this product is already exist",
        code: 400,
      });
    }

    product = this.Product(
      _.pick(req.body, [
        "name",
        "description",
        "img",
        "price",
        "model",
        "brand",
      ])
    );
    product.img = req.file.path.replace(/\\/g, "/");
    await product.save();
    this.response({
      res,
      data: _.pick(req.body, [
        "name",
        "price",
        "description",
        "model",
        "brand",
      ]),
    });
  }
})();
