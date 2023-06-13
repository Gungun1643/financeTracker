const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validateExpenseRequest = [
  check("goalType").notEmpty().withMessage("Type of goal is required"),
  check("goalName").notEmpty().withMessage("Name of goal is required"),
  check("goalAmount").notEmpty().withMessage("Amount of goal is required"),
//   check("createdAt").notEmpty().withMessage("Date is required"),
//   check("category").notEmpty().withMessage("Category is required"),
];

const isGoalValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: errors.array()[0].msg });
  }
  next();
};

module.exports = {
  isGoalValidated,
  validateGoalRequest
};
