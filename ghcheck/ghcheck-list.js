#!/usr/bin/env node
var program = require('commander');

program
	.option('-s, --stale', 'List stale repositories')
	.parse(process.argv);

// TODO: List repositories

if (program.stale) {
	console.log('listing stale repositories...');
}