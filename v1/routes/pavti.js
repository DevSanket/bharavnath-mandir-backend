const router = require("express").Router();
const Controller = require("../controller");
const Auth = require("../../common/authenticate");

router.post("/create", Auth.verifyAdmin, Controller.PavtiController.addNewBill);
router.get("/getAll", Auth.verifyAdmin, Controller.PavtiController.getAllPavti);

module.exports = router;
