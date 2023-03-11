#!/usr/bin/env node

import { program } from 'commander';


program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-h, --help', 'display help for command')
    .option('-f, --format <type>', 'output format');

program.on('option:help', () => {
    console.log(program.helpInformation());
});

program.parse(process.argv);
