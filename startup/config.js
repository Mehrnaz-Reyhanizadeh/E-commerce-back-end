const cors = require("cors");
module.exports = function (app, express) {
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
};
