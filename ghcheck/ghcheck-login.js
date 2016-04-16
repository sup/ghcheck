#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');
var readlineSync = require('readline-sync');
var fs = require('fs');

// Get config file
var config = require('./config.json');

// Show currently logged in user
console.log("Currently logged in as " + config.username);
var update = readlineSync.question('Would you like to update your account information?: ');

if (update.toLowerCase() == "y" || update.toLowerCase() == "yes") {
  var username = readlineSync.question('Github Username: ');
  var password = readlineSync.question('Github Password: ');
  config.username = username;
  config.password = password;
  var user = {
    username: username,
    password: password
  };
  fs.writeFile("config.json", JSON.stringify(user), "utf8");
}

