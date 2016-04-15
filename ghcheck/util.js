var fs = require('fs');
var readlineSync = require('readline-sync');

function getConfig() {
  // Attempt to load config file
  try {
    var config = require('./config.json');
    return config;
  }
  catch (e) {
    var username = readlineSync.question('Github Username:');
    var password = readlineSync.question('Github Password:');
    var user = {
      username: username,
      password: password
    };
    fs.writeFile("config.json", JSON.stringify(user), "utf8", function(){
      var config = require('./config.json');
      return config;
    });
  }
}

exports.config  getConfig();
