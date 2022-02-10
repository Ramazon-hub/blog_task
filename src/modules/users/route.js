const { Router } = require("express");
const { AUTH_USER, AUTH_ADMIN } = require("../../middleware/auth");
const { imageUpload } = require("../../middleware/upload");
const router = Router();

const Controller = require("./controller");
router.post("/register", imageUpload, Controller.REGISTER);
router.post("/login", Controller.LOGIN);
router.delete("/", AUTH_USER, Controller.DELETE_USER);
router.put("/", AUTH_USER, imageUpload, Controller.UPDATE_USER);
router.get("/", AUTH_ADMIN, Controller.GET_USER);

module.exports = router;
