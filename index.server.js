const express = require("express");
require("dotenv").config();
const connectDB = require("./src/db/connect");
const app = express();
var cors = require("cors");
const authRouter = require("./src/routes/auth");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/api", authRouter);
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