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
    const getAll = await Model.Pavti.find({});
    return res.status(200).json({ msg: "SUCCESSFULLY", data: getAll });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTING_ALL_PAVTI" });
  }
};

module.exports.getAPavti = async (req, res) => {
  try {
    const id = req.params.id;

    const getData = await Model.Pavti.find({ _id: id });
    return res.status(200).json({ msg: "SUCCESSFULL", pavti: getData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "ERROR_WHILE_GETTING_DATA" });
  }
};

module.exports.updatePavti = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      pavti_no,
      pavti_Date,
      Dengidar_name,
      Dengidar_money,
      Dengidar_Address,
      Shera,
    } = req.body;

    const updateData = await Model.Pavti.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          pavti_no,
          pavti_Date,
          Dengidar_name,
          Dengidar_money,
          Dengidar_Address,
          Shera,
        },
      }
    );
    await updateData.save();

    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    return res.status(400).json({ error: "GETTING_ERROR_WHILE_UPDATE" });
  }
};

//delete a perticular pavti

module.exports.deletePavti = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPavti = await Model.Pavti.findOneAndDelete({ _id: id });

    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "ERROR_WHILE_DELETING_PAVTI" });
  }
};
