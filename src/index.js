import { readFileSync } from 'fs';
import path from 'path';
import parser from './parsers.js';
import buildAST from './diff.js';
import convertToAst from './stylish.js';

export const loadFile = (filePath) => {
  const fileData = readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  const fileExtension = path.extname(filePath).substr(1);
  const fileContent = parser(fileData, fileExtension);
  return fileContent;
};

export default (filePath1, filePath2) => {
  const fileContent1 = loadFile(filePath1);
  const fileContent2 = loadFile(filePath2);
  return convertToAst(buildAST(fileContent1, fileContent2));
};
