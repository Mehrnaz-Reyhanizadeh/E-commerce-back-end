const controller = require("../controller");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcript = require("bcrypt");

module.exports = new (class extends controller {
  async dashboard(req, res) {
    res.send("user dashboard");
  }
  async getMe(req, res) {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await this.User.findById(decoded._id);
    this.response({
      res,
      data: _.pick(user, ["fname", "lname", "address", "phoneNumber", "email"]),
    });
  }
  async updateMe(req, res) {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await this.User.findById(decoded._id);
    user.lname = req.body.lname;
    user.fname = req.body.fname;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.email = req.body.email;
    user.password = req.body.password;

    const salt = await bcript.genSalt(10);
    user.password = await bcript.hash(user.password, salt);
    await user.save();
    this.response({
      res,
      data: _.pick(user, ["fname", "lname", "address", "phoneNumber", "email"]),
    });
  }
})();
