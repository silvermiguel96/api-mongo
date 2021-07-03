require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.host || "localhost";
const mongoose = require("./api/config/database/config");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
app.set("secretKey", process.env.SECRET_KEY || "mongodb");

const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "connection error:"));
dbConnection.once("open", function () {
  console.log("Conexion a la base de mongo exitosa!");
});

function authToken(required, response, next) {
  let token = "";
  if (required.headers.authorization) {
    token = required.headers.authorization.substring(7);
  }
  jwt.verify(token, required.app.get("secretKey"), function (error, data) {
    if (error) {
      response.status(403).json(error);
    } else {
      console.log('data del token', data)
      required.body.userId = data.id;
      required.body.userEmaill = data.email;
      next();
    }
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", require("./api/routers/user"));

app.use("/users/private", authToken, require("./api/routers/userPrivate"));

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});
