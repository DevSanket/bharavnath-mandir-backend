const router = require("express").Router();
const Controller = require("../controller");

router.post("/login", Controller.User.login);
router.get("/getAllPavti/:mobile", Controller.User.getAllPavti);
router.get("/getUser/:mobile", Controller.User.getUser);
module.exports = router;
