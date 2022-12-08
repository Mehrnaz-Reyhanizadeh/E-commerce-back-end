const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const User = require("./../models/user");
const Product = require("./../models/product");
const Comment = require("./../models/comment");

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.Product = Product;
    this.Comment = Comment;
  }

  validationbody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach((err) => messages.push(err.msg));
      res.status(400).json({
        message: "validator error",
        data: messages,
      });
      return false;
    }
    return true;
  }

  validate(req, res, next) {
    if (!this.validationbody(req, res)) {
      return;
    }
    next();
  }

  response({ res, message, code = 200, data = {} }) {
    res.status(code).json({
      message,
      data,
    });
  }
};
