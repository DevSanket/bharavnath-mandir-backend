const Model = require("../../model");

module.exports.addNewBill = async (req, res) => {
  try {
    //create pavti with all required Information
    const new_pavti = Model.Pavti.create(req.body);
    return res.status(200).json({ msg: "SUCCESSFULL", new_pavti });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_ADDING_PAVTI" });
  }
};

module.exports.getAllPavti = async (req, res) => {
  try {
    const getAll = Model.Pavti.find({});
    return res.status(200).json({ msg: "SUCCESSFULLY", data: getAll });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTING_ALL_PAVTI" });
  }
};

module.exports.searchForBill = async (req, res) => {
  try {
  } catch (err) {}
};
