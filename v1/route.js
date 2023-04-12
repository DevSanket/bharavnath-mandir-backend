const router = require("express").Router();
const Routes = require("./routes");

router.use("/admin", Routes.AdminRoutes);
router.use("/pavti", Routes.PavtiRoutes);

module.exports = router;
