const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/auth");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");


router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);



router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);
router.route("/xyz").post((req, res) => {
  console.log(req.body);
  res.send("Hello ");
});


module.exports = router;