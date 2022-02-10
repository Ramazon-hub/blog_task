const { Router } = require("express");
const { AUTH_ADMIN } = require("../../middleware/auth");
const { imagesUpload } = require("../../middleware/upload");
const router = Router();

const Controller = require("./controller");
router.post("/", AUTH_ADMIN, imagesUpload, Controller.POST);
router.put("/", AUTH_ADMIN, imagesUpload, Controller.UPDATE_POST);
router.delete("/", AUTH_ADMIN, Controller.DELETE_POST);
router.get("/", Controller.ALL_POST);
router.get("/:categoryId", Controller.ALL_POST_BY_CATEGORY);

module.exports = router;
