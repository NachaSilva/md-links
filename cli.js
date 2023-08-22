const mdLinks = require('.index.js');
const path = require('path');

const args = process.argv.slice(2);
const filePath = args[0];

const options = {
    validate: args.includes('--validate'),
};

