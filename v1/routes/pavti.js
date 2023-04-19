const router = require("express").Router();
const Controller = require("../controller");
const Auth = require("../../common/authenticate");

router.post("/create", Auth.verifyAdmin, Controller.PavtiController.addNewBill);
router.get("/getAll", Auth.verifyAdmin, Controller.PavtiController.getAllPavti);
router.get(
  "/getPavti/:id",
  Auth.verifyAdmin,
  Controller.PavtiController.getAPavti
);
router.put(
  "/updatePavti/:id",
  Auth.verifyAdmin,
  Controller.PavtiController.updatePavti
);

router.delete(
  "/deletePavti/:id",
  Auth.verifyAdmin,
  Controller.PavtiController.deletePavti
);

router.post(
  "/expense",
  Auth.verifyAdmin,
  Controller.PavtiController.expenseTransaction
);

router.get(
  "/expenses",
  Auth.verifyAdmin,
  Controller.PavtiController.getAllExpenses
);

router.delete(
  "/expense/:id",
  Auth.verifyAdmin,
  Controller.PavtiController.deleteExpense
);

//bank
router.post(
  "/bank/create",
  Auth.verifyAdmin,
  Controller.PavtiController.addbankMoney
);

router.delete(
  "/bank/:id",
  Auth.verifyAdmin,
  Controller.PavtiController.removeBankMoney
);

router.get(
  "/bank",
  Auth.verifyAdmin,
  Controller.PavtiController.getAllBankMoney
);

router.get("/getAllInfo", Controller.PavtiController.allInfo);

module.exports = router;
