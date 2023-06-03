const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validateExpenseRequest = [
    check("personId").notEmpty().withMessage("Person Id is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("amount").notEmpty().withMessage("Amount is required"),
    check("createdAt").notEmpty().withMessage("Date is required"),
    check("category").notEmpty().withMessage("Category is required"),
];

const isExpenseValidated = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.array().length > 0) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: errors.array()[0].msg });
    }
    next();
}

module.exports = {
    isExpenseValidated,
    validateExpenseRequest
};