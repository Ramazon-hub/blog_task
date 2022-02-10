const path = require("path");
const { v4: UUID } = require("uuid");
const multer = require("multer");
const { FILE_MAX_SIZE } = require("../config");
// let filename = "";
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // filename = `${UUID()}.${file.mimetype.split("/")[1]}`;
    cb(
      null,
      file.mimetype.split("/")[0] +
        "__" +
        UUID() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: fileStorageEngine,
  limits: { fileSize: FILE_MAX_SIZE * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.split("/")[0] === "image" ||
      file.mimetype.split("/")[0] === "video"
    ) {
      cb(null, true);
    } else {
      cb(null, false);

      req.fileFormatError = "Only image and video format allowed!";
    }
  },
});
module.exports = {
  upload,
};
