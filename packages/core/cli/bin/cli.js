#! /usr/bin/env node

console.log('bin entry')
require('../lib')(process.argv.slice(2))