const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./src/db/connect");
const app = express();
const _ = require("lodash");
var cors = require("cors");
const authRouter = require("./src/routes/auth");
const { StatusCodes } = require("http-status-codes");
const Goal = require("./src/models/goal");
// call the schema
const User = require("./src/models/auth");
const mongoose = require("mongoose");
const Expense = require("./src/models/expense");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRouter);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

global._personId = "";

global._income = 2000;
global._expenditure = 0;
global._budget = 1000;
global._provisionalBalance = _income - _budget;
global._dashOffset=100;
global._remainingToSpend = _budget - _expenditure;
//the above require word to be used here
// const goalList = {
//   name: String,
//   items: [Goal]
// };
// const Goals = mongoose.model("Goals", goalList);


app.get("/", async function (req, res) {
  try {
    // find all => find({}) => find all the items in the database-> empty curly braces
    res.render("loginsignup", {});
  } catch (err) {
    console.log(err);
    res.status(500).send("error thai 6e...");
  }
});

app.post("/delete", async function (req, res) {
  const checkedItemId = req.body.checkbox;
  await Expense.findByIdAndDelete(checkedItemId)
    .then((response) => {
      // console.log(response);
      _expenditure = _expenditure - response.amount;
      _remainingToSpend = _budget - _expenditure;
      // console.log("Deleted Successfully");
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send("error thai 6e...");
    });

  // await Expense.findOneAndDelete({_id:checkedItemId}, function(err){
  //   if (err) {
  //     res.status(500).send("error thai 6e...");
  //   }
  // });

  try {
    const expenses = await Expense.find({
      personId: "647b10038ddb90b857b504b2",
    });
    // console.log(expenses);
    // find all => find({}) => find all the items in the database-> empty curly braces
    res.render("list", { listTitle: "This Month", newListItems: expenses, _dashOffset:50 });
  } catch (err) {
    // console.log(err);
    res.status(500).send("error thai 6e...");
  }
});
/*****************************updation of the css of the circle *********************** */
// app.get("/post", (req,res)=> {

//   console.log("****************************** ");
//   console.log("expenditure: "+_expenditure);
//   console.log("remaingToSpent: "+_remainingToSpend);
//   const per= (_remainingToSpend/_budget)*100;
//   console.log("precentage is : "+per);
//   const newDashArray=(per*472)/100;
//   console.log("newDashArray is : "+newDashArray);
//   const newDashOffset=472-newDashArray;
//   console.log("newDashOffset is : "+newDashOffset);
  
//   var element = document.getElementsByClassName("circle");
//   console.log("element is : "+element);
//   element.style.strokeDashoffset =newDashOffset+"px";
//   res.render("index.server.js" , {newDashOffset:newDashOffset});
  
// })



/******************************************************************** */
// "/"+ listName ..
// adding expenses
app.post("/", async function (req, res) {
  const personId = "647b10038ddb90b857b504b2";
  const description = req.body.Description;
  const amount = req.body.Amount;
  const category = req.body.Category;
  const dt = req.body.DateOfTransaction;

  const expenseData = new Expense({
    personId: personId,
    description: description,
    amount: amount,
    createdAt: dt,
    category: category,
  });

  await Expense.create(expenseData).then((data, err) => {
    if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
    else {
    }
  });
  /*here is the balance updation part */
  _expenditure = _expenditure + parseInt(amount);
  _remainingToSpend = _budget - _expenditure;

  const bal = {
    income: _income,
    expenditure: _expenditure,
    budget: _budget,
    provisionalBalance: _provisionalBalance,
    remainingToSpend: _remainingToSpend,
  };
/***************change the css of the circle ***************************** */
console.log("****************************** ");
console.log("expenditure: "+_expenditure);
console.log("remaingToSpent: "+_remainingToSpend);
const per= (_remainingToSpend/_budget)*100;
console.log("precentage is : "+per);
const newDashArray=(per*472)/100;
console.log("newDashArray is : "+newDashArray);
const newDashOffset=472-newDashArray;
console.log("newDashOffset is : "+newDashOffset);

// var element = document.getElementsByClassName("circle");
// console.log("element is : "+element);
// element.style.strokeDashoffset =newDashOffset+"px";
/****************************************************** */



  try {
    var response = await User.findOneAndUpdate({ _id: personId }, bal);
  } catch (err) {
    console.log(err);
  }

  try {
    const expenses = await Expense.find({
      personId: "647b10038ddb90b857b504b2",
    });
    // console.log(expenses);
    // find all => find({}) => find all the items in the database-> empty curly braces
    res.render("list", { listTitle: "This Month", newListItems: expenses, _dashOffset:newDashOffset });
  } catch (err) {
    console.log(err);
    res.status(500).send("error thai 6e...");
  }
});

/*****************************this is to add goal Items***********************************  */
app.post("/addGoal", async function (req, res) {
  // const personId = "647b10038ddb90b857b504b2";
  const goalType = req.body.goalType;
  const goalName = req.body.goalName;
  const goalValue = req.body.goalValue;

  const goalData = new Goal({
    goalType: goalType,
    goalName: goalName,
    goalValue: goalValue,
  });
  await goalData.save();

  // await Goal.create(goalData).then((data, err) => {
  //   if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
  //   else {

  //   }
  // });
  // _expenditure = _expenditure + parseInt(amount);
  // _remainingToSpend = _budget - _expenditure;

  // const bal = {
  //   income: _income,
  //   expenditure: _expenditure,
  //   budget: _budget,
  //   provisionalBalance: _provisionalBalance,
  //   remainingToSpend: _remainingToSpend,
  // };

  // try {
  //   var response = await User.findOneAndUpdate({ _id: personId }, );
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    // const goal = await Goal.find({
    //   personId: "647b10038ddb90b857b504b2",
    // });
    // await goal.save();
    // console.log(expenses);
    // find all => find({}) => find all the items in the database-> empty curly braces
    /******************************************************************** */
    /*we need to make another list here named Goals==> then render the newly inserted data over there  */
    // res.render("list", { listTitle: "This Month", newListItems: expenses });
    // const foundList = await List.findOne({ name: listName });
    // if (foundList) {
    //   foundList.items.push(item);
    //   await foundList.save();
    const foundList = await goalList.findOne({ name: "Goals" });
    if (foundList) {
      foundList.goals.push(goalData);
      await foundList.save();
      res.redirect("/homepage");
    }
    res.redirect("/homepage");
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send("error ");
  }
});

/************************************************************** */
app.post("/homepage", async function (req, res) {
  // const email = req.body.Email;
  // const password = req.body.Password;
  // console.log(email);
  // await signIn(req, res);

  try {
    const values = await User.findById("647b10038ddb90b857b504b2");
    _income = values.income;
    _expenditure = values.expenditure;
    _budget = values.budget;
    _provisionalBalance = values.provisionalBalance;
    _remainingToSpend = values.remainingToSpend;

    const expenses = await Expense.find({
      personId: "647b10038ddb90b857b504b2",
    });

    // console.log(expenses);
    // find all => find({}) => find all the items in the database-> empty curly braces
    res.render("list", { listTitle: "This Month", newListItems: expenses ,_dashOffset:0});
  } catch (err) {
    console.log(err);
    res.status(500).send("error thai 6e...");
  }
});

//Port and Connect to DB
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};

start();
