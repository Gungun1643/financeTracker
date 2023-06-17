const { StatusCodes } = require("http-status-codes");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const signUp = async (req, res) => {
  // const { firstName, lastName, email, password } = req.body;
  
  const email=req.body.Email;
  const password=req.body.Password;
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  
  if (!firstName || !lastName || !email || !password) {
    _personId="";
    return  "Please Provide Required Information"
    // return res.status(StatusCodes.BAD_REQUEST).json({
    //   message: "Please Provide Required Information",
    // });
  }

  const hash_password = await bcrypt.hash(password, 10);

  const userData = {
    firstName,
    lastName,
    email,
    hash_password,
    balance: 0,
    budget: 0,
    income:0,
    expenditure: 0,
    provisionalBalance: 0,
    remainingToSpend: 0,
    coins: 0
  };

  const user = await User.findOne({ email });
  if (user) {
    // return res.status(StatusCodes.BAD_REQUEST).json({
    //   message: "User already registered",
    // });
    _personId="";
    return "User already registered";
  } else {
    try {
      const user = await User.create(userData)
      
      if (user){
        // res.status(StatusCodes.BAD_REQUEST).json({ err });
        _personId=user._id;
        return true;
      }else{
        _personId="";
        return "Something went wrong!!!"
        // console.log(data);
      }
    } catch (error) {
      _personId="";
      return "Something went wrong!!!";
    }

  }
};
const signIn = async (req,res) => {
  var email=req.body.Email;
  password=req.body.Password;
  // console.log(req.body.Email);s
  try {
    if (!email || !password) {
      // res.status(StatusCodes.BAD_REQUEST).json({
      //   message: "Please enter email and password",
      // });
      _personId="";
      return "Please enter email and password";
    }
    
    const user = await User.findOne({ email: email });
    
    if (user) {
      const correct = await bcrypt.compare(password, user.hash_password)
      if(correct){
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
          );
        const { _id, firstName, lastName, email, role, fullName } = user;
        // res.status(StatusCodes.OK).json({
        //   token,
        //   user: { _id, firstName, lastName, email, role, fullName },
        // });
        _personId=_id;
        return true;
        // return {
        //   token,
        //   user: { _id, firstName, lastName, email, role, fullName },
        // }

      }else{
        _personId="";
        return "Incorrect Password";

      }
      //  .then(correct => {
      //   if(correct){
      //     const token = jwt.sign(
      //       { _id: user._id, role: user.role },
      //       process.env.JWT_SECRET,
      //       { expiresIn: "30d" }
      //       );
      //     const { _id, firstName, lastName, email, role, fullName } = user;
      //     // res.status(StatusCodes.OK).json({
      //     //   token,
      //     //   user: { _id, firstName, lastName, email, role, fullName },
      //     // });
      //     return {
      //       token,
      //       user: { _id, firstName, lastName, email, role, fullName },
      //     }
      //   }else{
      //     // res.status(StatusCodes.UNAUTHORIZED).json({
      //     //   message: "Something went wrong!",
      //     // });
      //     return "Incorrect Password";
      //   }
      //  })
    } else {
      // res.status(StatusCodes.BAD_REQUEST).json({
      //   message: "User does not exist..!",
      // });
      _personId="";
      return "User does not exist..!";
    }
  } catch (error) {
    // res.status(StatusCodes.BAD_REQUEST).json({ error });
    _personId="";
    return "Failed";
  }
};
module.exports = { signUp, signIn };
