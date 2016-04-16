#!/usr/bin/env node

// Load modules
var program = require('commander');
var chalk = require('chalk');

// Print program information
program
  .version('0.0.1')
  .command('list', 'List all available repositories')
  .command('search [query]', 'Search repositories by query')
  .command('login', 'Update login information')
  .parse(process.argv);