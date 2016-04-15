#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');
var readlineSync = require('readline-sync');
var fs = require('fs');
var GitHubApi = require("github");

program
  .option('-t, --type [all|owner|public|private]', 'List repositories of a specified type', /^(all|owner|public|private|member)$/i)
  .option('-s, --sort [created|updated|pushed|full_name]', 'Sort results by various values', /^(created|updated|pushed|full_name)$/i)
  .parse(process.argv);

// Get config file
var config = require('./config.json');
if (config.username === "" || config.password === "") {
  var username = readlineSync.question('Github Username:');
  var password = readlineSync.question('Github Password:');
  config.username = username;
  config.password = password;
  var user = {
    username: username,
    password: password
  };
  fs.writeFile("config.json", JSON.stringify(user), "utf8");
}

// Create new github object
var github = new GitHubApi({
  // required
  version: "3.0.0",
  // optional
  debug: true,
  protocol: "https",
  host: "api.github.com",
  timeout: 5000,
  headers: {
      "user-agent": "ghcheck"
  }
});

// Authenticate the user
github.authenticate({
  type: "basic",
  username: config.username,
  password: config.password
});

// Create option object
var options = {
  type: "all",
  sort: "full_name",
  per_page: 100
};

// Modify option object
if (program.type) {
  options.type = program.type;
}

if (program.sort) {
  options.sort = program.sort;
}

// List results
github.repos.getAll(options, function(err, results) {
  for (var index in results) {
    var repo = results[index];
    console.log("--------------------------------------------------------------------------------");
    var string = chalk.green(chalk.bold(repo.name)) +
                  "\n" + repo.description +
                  "\n" + chalk.blue(chalk.underline(repo.url));
    console.log(string);
    console.log("--------------------------------------------------------------------------------");
  }
});
