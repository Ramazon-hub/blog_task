const { Router } = require("express");
const { AUTH_SUPER_ADMIN } = require("../../middleware/auth");
const { imageUpload } = require("../../middleware/upload");
const router = Router();

const Controller = require("./controller");
router.post("/register", AUTH_SUPER_ADMIN, imageUpload, Controller.REGISTER);
router.post("/login", Controller.LOGIN);
router.delete("/", AUTH_SUPER_ADMIN, Controller.DELETE_ADMIN);
router.put("/", Controller.UPDATE_ADMIN);
router.get("/", AUTH_SUPER_ADMIN, Controller.GET_ADMIN);

module.exports = router;
