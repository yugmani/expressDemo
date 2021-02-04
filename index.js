const express = require("express");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const author = require("./author");
const Joi = require("joi");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

//middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true })); //key=value&key=value

app.use(express.static("public"));

app.set("view engine", "pug");

app.set("views", "./views"); //default optional

//third party middleware
app.use(morgan("tiny"));

//custom middleware
app.use(logger);

app.use(author);

app.use("/api/courses", courses);
app.use("/", home);

//Environment deelopment or production
// console.log("NODE_ENV: " + process.env.NODE_ENV);
// console.log("app:" + app.get("env"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

//to set production environment
//export NODE_ENV=production    -->in the console

//port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on the port ${port}...`);
});
