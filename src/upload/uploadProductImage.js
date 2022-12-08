const multer = require("multer");
const mkdir = require("mkdirp");
const limits = { fileSize: 1000 * 1000 * 0.5 }; // limit to 500kb 0.5 if 4 ===4mb
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdir("./public/uploads/productImg").then((made) => {
      cb(null, "./public/uploads/productImg");
    });
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: limits });

module.exports = upload;
