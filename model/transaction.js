const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
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
  mobile: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("transactions", TransactionSchema);
