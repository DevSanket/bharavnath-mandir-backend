const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  date: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  money: {
    type: mongoose.Types.Decimal128,
    default: 0.0,
  },
});

module.exports = mongoose.model("expense", ExpenseSchema);
