const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT;
const userRoute = require("./router/user");


// MiddleWAre
app.use(express.json());

// Api Routes
app.use("/api", userRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then((data) => {console.log("Connected Successfully")})
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
