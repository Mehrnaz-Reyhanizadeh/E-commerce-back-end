const controller = require("../controller");
const _ = require("lodash");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        message: "this user is already exist",
        code: 400,
      });
    }

    // const {email,name,password}=req.body;
    // user= this.User({email,name,password});
    user = this.User(
      _.pick(req.body, [
        "lname",
        "fname",
        "phoneNumber",
        "address",
        "email",
        "password",
      ])
    );

    const salt = await bcript.genSalt(10);
    user.password = await bcript.hash(user.password, salt);
    await user.save();
    this.response({
      res,
      message: "the user successfuly registerd",
      code: 200,
      data: _.pick(user, ["_id", "lname", "fname", "email"]),
    });
  }
  async login(req, res) {
    // throw new Error("login faild");

    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        message: "invalid user or password",
        code: 400,
      });
    }
    const isValid = await bcript.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        message: "invalid user or password",
        code: 400,
      });
    }

    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    this.response({ res, message: "successfuly loged in", data: { token } });
  }
})();
