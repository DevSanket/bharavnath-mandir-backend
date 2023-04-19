const Model = require("../../model");

module.exports.addNewBill = async (req, res) => {
  try {
    //create pavti with all required Information
    const { Dengidar_name, Dengidar_money, pavti_Date } = req.body;
    const transaction = await Model.Transaction.create({
      name: Dengidar_name,
      money: Dengidar_money,
      date: pavti_Date,
      status: "Income",
    });
    await transaction.save();
    const new_pavti = await Model.Pavti.create({
      transaction_id: transaction._id,
      ...req.body,
    });
    await new_pavti.save();
    return res.status(200).json({ msg: "SUCCESSFULL", new_pavti });
  } catch (error) {
    console.log(error);
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

    const updateTransaction = await Model.Transaction.findOneAndUpdate(
      { _id: updateData.transaction_id },
      {
        $set: {
          money: Dengidar_money,
        },
      }
    );

    updateTransaction.save();

    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "GETTING_ERROR_WHILE_UPDATE" });
  }
};

//delete a perticular pavti

module.exports.deletePavti = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPavti = await Model.Pavti.findOneAndDelete({ _id: id });
    const deleteTransaction = await Model.Transaction.findOneAndDelete({
      _id: deletedPavti.transaction_id,
    });
    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "ERROR_WHILE_DELETING_PAVTI" });
  }
};

//create a expense transaction

module.exports.expenseTransaction = async (req, res) => {
  try {
    const { title, money, date } = req.body;
    const transaction = await Model.Transaction.create({
      name: title,
      money,
      status: "Expense",
      date,
    });
    await transaction.save();
    const expense = await Model.Expense.create({
      transaction_id: transaction._id,
      ...req.body,
    });
    await expense.save();

    return res.status(200).json({ msg: "Successfull", expense });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_ADDING_EXPENCE" });
  }
};

module.exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Model.Expense.find();
    return res.status(200).json({ msg: "Successfull", expenses });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTING_EXPENSES" });
  }
};

module.exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExpense = await Model.Expense.findOneAndDelete({ _id: id });
    const deleteTransaction = await Model.Transaction.findOneAndDelete({
      _id: deleteExpense.transaction_id,
    });
    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_DELETING_EXPENSE" });
  }
};

module.exports.addbankMoney = async (req, res) => {
  try {
    const { money, date } = req.body;
    const transaction = await Model.Transaction.create({
      name: "बँकेचे व्याज",
      money,
      date,
      status: "Income",
    });
    transaction.save();
    const bankMoney = await Model.Bank.create({
      transaction_id: transaction._id,
      ...req.body,
    });

    await bankMoney.save();
    return res.status(200).json({ msg: "Successfull", bankMoney });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_ADD_BANK_MONEY" });
  }
};

module.exports.removeBankMoney = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBankMoney = await Model.Bank.findOneAndDelete({ _id: id });
    const deleteTransaction = await Model.Transaction.findOneAndDelete({
      _id: deleteBankMoney.transaction_id,
    });

    return res.status(200).json({ msg: "Successfull" });
  } catch (error) {
    return res.status(400).json({ error: "ERROR_WHILE_DELETING_BANK_MONEY" });
  }
};

module.exports.getAllBankMoney = async (req, res) => {
  try {
    const getAll = await Model.Bank.find({});
    return res.status(200).json({ msg: "Successfull", data: getAll });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "ERROR_WHILE_GETTING_ALL_BANK_MONEY" });
  }
};

module.exports.allInfo = async (req, res) => {
  try {
    let dengi_rs = 0;
    let expense_rs = 0;
    let bank_rs = 0;

    const getDengidar = await Model.Pavti.find({});
    getDengidar.map((pavti) => {
      dengi_rs = parseFloat(pavti.Dengidar_money) + parseFloat(dengi_rs);
    });

    const expense = await Model.Expense.find({});
    expense.map((ex) => {
      expense_rs = parseFloat(ex.money) + parseFloat(expense_rs);
    });

    const BankMoney = await Model.Bank.find({});
    BankMoney.map((bank) => {
      bank_rs = parseFloat(bank.money) + parseFloat(bank_rs);
    });

    const allTransactions = await Model.Transaction.find({});

    return res.status(200).json({
      msg: "Successfull",
      dengi_rs,
      expense_rs,
      bank_rs,
      allTransactions,
    });
  } catch (err) {
    return res.status(400).json({ error: "ERROR_WHILE_GETTTING_DATA" });
  }
};
