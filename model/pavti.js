const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PavtiSchema = new Schema({
  pavti_no: {
    type: Number,
    required: true,
  },
  pavti_Date: {
    type: String,
    default: "",
  },
  Dengidar_name: {
    type: String,
    default: "",
  },
  Dengidar_Address: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  Dengidar_money: {
    type: String,
    default: "",
  },
  Shera: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Pavti", PavtiSchema);
