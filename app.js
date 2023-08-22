const express = require("express");
const morgan = require("morgan");
const app = express();
const moment = require('moment');
const hbs = require('hbs');


//  Appl configs 
require("./config/db.config");
const session = require("./config/session.config");
require("./config/hbs.config");

//  Configure view engine 
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//  logger 
app.use(morgan("dev"));

//  session middleware 
app.use(session);

//  Support req.body 
app.use(express.urlencoded({ extended: true }));

/** Congiure static files*/ 
app.use(express.static("public"));

//  Helper
hbs.registerHelper('formatDate', function (timestamp) {
  return moment(timestamp).fromNow();
});

//  Routes 
const router = require("./config/routes.config");
app.use(router);

app.listen(3000, () => {
  console.log("Ready!");
});