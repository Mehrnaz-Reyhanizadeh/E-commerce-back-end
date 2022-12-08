const expressValidator = require("express-validator");

const check = expressValidator.check;

module.exports = new (class {
  registerValidator() {
    return [
      check("email").isEmail().withMessage("email is invalid"),
      check("lname").not().isEmpty().withMessage("first name can't be empty"),
      check("fname").not().isEmpty().withMessage("last name can't be empty"),
      check("address").not().isEmpty().withMessage("address can't be empty"),
      check("phoneNumber")
        .not()
        .isEmpty()
        .withMessage("phone number can't be empty"),
      check("password").not().isEmpty().withMessage("password can't be empty"),
    ];
  }
  logiValidator() {
    return [
      check("email").isEmail().withMessage("email is invalid"),
      check("password").not().isEmpty().withMessage("password can't be empty"),
    ];
  }
})();
