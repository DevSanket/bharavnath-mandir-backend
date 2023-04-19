const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  money: {
    type: mongoose.Types.Decimal128,
    default: 0.0,
  },
  name: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enums: ["Income", "Expense"],
    default: "Income",
  },
});

module.exports = mongoose.model("transactions", TransactionSchema);
