import { readFileSync } from 'fs';
import path from 'path';
import parsers from './parsers.js';
import genDiff from './diff.js';

const symbols = {
  unchanged: ' ',
  added: '+',
  removed: '-',
};

function formatDiff(diff, depth = 1) {
  const indent = '  '.repeat(depth);
  const sortedKeys = Object.keys(diff).sort();
  const lines = sortedKeys.map((key) => {
    const {
      status, value, valueBefore, valueAfter,
    } = diff[key];
    if (status === 'changed') {
      return `${indent}${symbols.removed} ${key}: ${valueBefore}\n${indent}${symbols.added} ${key}: ${valueAfter}\n`;
    }
    return `${indent}${symbols[status]} ${key}: ${value}\n`;
  });
  return `{\n${lines.join('')}}`;
}

export function loadFiles(filePath) {
  const fileContent = readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  const fileExtension = path.extname(filePath).substr(1);
  const parsedFileContent = parsers(fileContent, fileExtension);
  return parsedFileContent;
}

export default (filePath1, filePath2) => {
  const fileContent1 = loadFiles(filePath1);
  const fileContent2 = loadFiles(filePath2);
  return formatDiff(genDiff(fileContent1, fileContent2));
};
