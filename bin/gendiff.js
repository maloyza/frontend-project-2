#!/usr/bin/env node

import { program } from '../node_modules/commander/index.js';


program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-h, --help', 'display help for command');

program.on('option:help', () => {
    console.log(program.helpInformation());
});

program.parse(process.argv);
