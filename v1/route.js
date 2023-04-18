const router = require("express").Router();
const Routes = require("./routes");

router.use("/admin", Routes.AdminRoutes);
router.use("/pavti", Routes.PavtiRoutes);
router.use("/user", Routes.UserRoutes);

module.exports = router;
