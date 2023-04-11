const router = require("express").Router();
const Routes = require("./routes");

router.use("/admin", Routes.AdminRoutes);

module.exports = router;
