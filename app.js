require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const oracledb = require("oracledb");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
app.use(express.json());

app.use("/api/users", userRouter);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});