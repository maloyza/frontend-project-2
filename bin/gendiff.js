import { program } from 'commander';
import loadJSONFile from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(loadJSONFile(filepath1, filepath2));
  });

program.parse(process.argv);
