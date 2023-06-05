const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./src/db/connect");
const app = express();
const _ = require("lodash");
var cors = require("cors");
const authRouter = require("./src/routes/auth");
const { StatusCodes } = require("http-status-codes");

const Expense = require("./src/models/expense");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRouter);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
  console.log(checkedItemId);

  await Expense.findOneAndDelete({ _id: checkedItemId }, function (err) {
    if (err) {
      res.status(500).send("error thai 6e...");
    }
  });

  try {
    const expenses = await Expense.find({
      personId: "647b10038ddb90b857b504b2",
    });
    // console.log(expenses);
    // find all => find({}) => find all the items in the database-> empty curly braces
    res.render("list", { listTitle: "This Month", newListItems: expenses });
  } catch (err) {
    // console.log(err);
    res.status(500).send("error thai 6e...");
  }
});

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

  try {
    const expenses = await Expense.find({
      personId: "647b10038ddb90b857b504b2",
    });
    // console.log(expenses);
    // find all => find({}) => find all the items in the database-> empty curly braces
    res.render("list", { listTitle: "This Month", newListItems: expenses });
  } catch (err) {
    console.log(err);
    res.status(500).send("error thai 6e...");
  }
});

app.post("/homepage", async function (req, res) {
  try {
    const expenses = await Expense.find({
      personId: "647b10038ddb90b857b504b2",
    });
    // console.log(expenses);
    // find all => find({}) => find all the items in the database-> empty curly braces
    res.render("list", { listTitle: "This Month", newListItems: expenses });
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
