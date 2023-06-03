const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/auth");
const { addExpense, getAllExpenses } = require("../controller/expense");
const {isExpenseValidated, validateExpenseRequest} = require("../validators/expense");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");

// /api/signin
router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);
// /api/signup
router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);


// /api/expense
router.route("/expense").post(validateExpenseRequest, isExpenseValidated, addExpense);
// /api/getAllExpenses
router.route("/getAllExpenses").get(getAllExpenses);

module.exports = router;