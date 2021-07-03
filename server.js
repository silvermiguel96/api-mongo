require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.host || "localhost";
const mongoose = require('./api/config/database/config')
const bodyParser = require("body-parser");



const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function() {
    console.log("Conexion a la base de mongo exitosa!")
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', require('./api/routers/user'));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});
