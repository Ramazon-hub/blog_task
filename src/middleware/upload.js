const { upload } = require("../utils/multer");
const { FILE_MAX_SIZE } = require("../config/index");

const imagesUpload = (req, res, next) => {
  return upload.array("postImages")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: `file max size ${FILE_MAX_SIZE} mg`,
        });
      }
      return res.status(400).json({
        message: err.message,
      });
    } else {
     return next()
    }
  });
};
const imageUpload = (req, res, next) => {
  return upload.single("avatar")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: `file max size ${FILE_MAX_SIZE} mg`,
        });
      }
      return res.status(400).json({
        message: err.message,
      });
    } else {
      return next();
    }
  });
};

module.exports = { imagesUpload, imageUpload };
