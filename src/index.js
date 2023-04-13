import { readFileSync } from 'fs';
import path from 'path';
import parser from './parsers.js';
import compilerAST from './diff.js';
import formatter from './formatters/index.js';

const dataFormat = (filePath) => path.extname(filePath).substr(1);

function loadFile(filePath) {
  const fileData = readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  const fileExtension = dataFormat(filePath);
  const fileContent = parser(fileData, fileExtension);
  return fileContent;
}

export default function genDiff(filePath1, filePath2, formatName) {
  const fileContent1 = loadFile(filePath1);
  const fileContent2 = loadFile(filePath2);
  const astDifference = compilerAST(fileContent1, fileContent2);
  return formatter(astDifference, formatName);
}
