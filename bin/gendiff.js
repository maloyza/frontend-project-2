#!/usr/bin/env node

import { program } from '../node_modules/commander';

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'display help for command')
    .action((options) => {
        console.log(options);
    });
    
