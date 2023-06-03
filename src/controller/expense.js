const { StatusCodes } = require("http-status-codes");
const Expense = require("../models/expense");

// write function to add expense in expense collection
const addExpense = async (req, res) => {
    const { personId, description, amount, createdAt, category } = req.body;
    if (!personId || !description || !amount || !createdAt || !category) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
        });
    }
    
    const expenseData = {
        personId,
        description,
        amount,
        createdAt,
        category,
    };
    
    Expense.create(expenseData).then((data, err) => {
        if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
        else
            res
            .status(StatusCodes.CREATED)
            .json({ message: "Expense added Successfully" });
        });
}

// write function to get all expenses with unique personId
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ personId: req.body.personId });
        res.status(StatusCodes.OK).json({ expenses });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
}

module.exports = { addExpense, getAllExpenses };
