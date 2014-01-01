#!/usr/bin/env node

var cli = require('./cli.js')();

var movieTitle = process.argv.splice(2).join(' ');
cli.launch(movieTitle, console.log);
