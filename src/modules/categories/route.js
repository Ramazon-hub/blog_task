const { Router } = require("express");
const { AUTH_ADMIN } = require("../../middleware/auth");
const router = Router();

const Controller = require("./controller");
router.post("/", AUTH_ADMIN, Controller.POST);
router.put("/", AUTH_ADMIN, Controller.UPDATE_CATEGORY);
router.delete("/", AUTH_ADMIN, Controller.DELETE_CATEGORY);
router.get("/", Controller.ALL_CATEGORY);

module.exports = router;
