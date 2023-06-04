const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");


const validateSignUpRequest = [
check("firstName").notEmpty().withMessage("First Name is required"),
check("lastName").notEmpty().withMessage("Last Name is required"),
check("email").isEmail().withMessage("Valid Email required"),
check("password")
   .isLength({ min: 6 })
   .withMessage("Password must be at least 6 character long"),
];