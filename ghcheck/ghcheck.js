#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1')
  .command('list', 'List all available repositories')
  .command('search [query]', 'Search repositories by query')
  .command('info', 'Get information about various Github stats')
  .parse(process.argv);