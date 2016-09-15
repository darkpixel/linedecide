#!/usr/bin/env node
var readline = require('readline');
var yargs = require('yargs').argv;
var os = require('os');
var fs = require('fs');
var lineByLine = require('n-readlines');
var readlineSync = require('readline-sync');
var argv = require('yargs').
    usage('Usage: cat <somefile> | $0 --in-file file1.txt --left-file file2.txt --right-file file3.txt').
    help('h').
    alias('h', 'help').
    demand(['in-file', 'left-file', 'right-file']).
    argv;

var liner = new lineByLine(argv.inFile);

var line;
var pressedKey;
var lineNumber = 0;

console.log('You will be shown one line at a time.');
console.log('Press 1 to write the line to ' + argv.leftFile);
console.log('Press 2 to write the line to ' + argv.rightFile);
console.log('Press q to quit');
console.log('Press any other key to skip writing the line to either file');

while (line = liner.next()) {
  console.log('Line ' + lineNumber + ': ' + line);
  lineNumber++;
  pressedKey = readlineSync.keyIn('1 for ' + argv.leftFile + ' 2 for ' + argv.rightFile + ' 3 to skip: ');
  console.log('Pressed: ' + pressedKey);
  if (pressedKey == 1) {
    fs.appendFileSync(argv.leftFile, line + os.EOL);
  } else if (pressedKey == 2) {
    fs.appendFileSync(argv.rightFile, line + os.EOL);
  } else if (pressedKey == 'q') {
    break;
  } else {
    console.log('Skipped');
  }
}
