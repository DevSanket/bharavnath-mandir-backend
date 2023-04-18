const Model = require("../../model");

module.exports.login = async (req, res) => {
  try {
    const { mobile } = req.body;
    const login = await Model.Pavti.find({ mobile });

    if (login.length > 0) {
      return res.status(200).json({
        msg: "Successfull",
        user: {
          username: login[0].Dengidar_name,
          mobile,
        },
      });
    } else {
      return res.status(400).json({ error: "NO PAVTI" });
    }
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTING_LOGIN_USER" });
  }
};

module.exports.getAllPavti = async (req, res) => {
  try {
    const { mobile } = req.params;
    const data = await Model.Pavti.find({ mobile });
    return res.status(200).json({ msg: "Successfull", data });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "ERROR_WHILE_GETTING_USER_SIDE_PAVTI" });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const { mobile } = req.params;
    const getUser = await Model.Pavti.findOne({ mobile });
    if (getUser) {
      return res.status(200).json({ msg: "Successfull", user: getUser });
    } else {
      return res.status(400).json({ error: "NO User" });
    }
  } catch (error) {
    return res.status(400).json({ error: "NO User" });
  }
};

module.exports.downloadPavti = async (req, res) => {
  try {
  } catch (error) {}
};
