const Model = require("../../model");
const utility = require("../../common/utility");
const { Auth } = require("../../common/index");

module.exports.createAdmin = async (req, res, next) => {
  try {
    let findAdmin = await Model.Admin.findOne({ email: req.body.email });
    if (findAdmin) {
      throw new Error("Email Already exists");
    } else {
      const user = await Model.Admin.create(req.body);
      await user.setPassword(req.body.password);
      await user.save();

      return res.status(200).json({ msg: "ADMIN_REGISTER_SUCCESSFULLY", user });
    }
  } catch (error) {
    return res.status(400).json({ msg: "ERROR_WHILE_CREATING_ADMIN" });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // await Validation.Admin.validateLogin(req);
    let adminData = await Model.Admin.findOne({
      email: req.body.email,
    });
    if (!adminData) {
      res.status(401).send({ message: "INVALID_EMAIL" });
      //throw new Error("");
    }
    if (adminData && adminData.isBlocked) {
      res.status(400).send({ message: "ADMIN_BLOCKED" });
    }

    //await adminData.authenticate(req.body.password);
    let match = await utility.comparePasswordUsingBcrypt(
      req.body.password,
      adminData.password
    );

    if (!match) {
      // throw message.INVALID_CREDENTAILS;
      res.status(400).send({ message: "INVALID_CREDENTAILS" });
    }
    let accessTokenGenerate = await Auth.getToken({
      _id: adminData._id,
      role: adminData.role,
    });

    adminData = await Model.Admin.findOneAndUpdate(
      { _id: adminData._id },
      { $set: { accessToken: accessTokenGenerate } },
      { new: true }
    );
    // await adminData.save();

    return res.status(200).json({ msg: "ADMIN_LOGIN_SUCCESSFULLY", adminData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "ERROR_WHILE_LOGIN" });
  }
};

module.exports.getAdmin = async (req, res, next) => {
  try {
    let user = await Model.Admin.findOne({ _id: req.user._id });
    return res.status(200).json({ msg: "SUCCESSFULLY FETCHED", user });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_RETRIVING_ADMIN" });
  }
};
