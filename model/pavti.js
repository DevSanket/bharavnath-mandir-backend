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
    default: 0.0,
  },
  Dengidar_money: {
    type: mongoose.Types.Decimal128,
    default: 0.0,
  },
  Shera: {
    type: String,
    default: "",
  },
  transaction_id: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Pavti", PavtiSchema);
