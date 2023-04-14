const router = require("express").Router();
const Controller = require("../controller");
const Auth = require("../../common/authenticate");

router.post("/createAdmin", Controller.AdminController.createAdmin);
router.post("/login", Controller.AdminController.login);
router.get("/getUser", Auth.verifyAdmin, Controller.AdminController.getAdmin);

module.exports = router;
