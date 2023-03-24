import { readFileSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';

const symbols = {
  unchanged: ' ',
  added: '+',
  removed: '-',
};

const formatDiff = (diff, depth = 1) => {
  const indent = '  '.repeat(depth);
  const sortedKeys = Object.keys(diff).sort();
  const lines = sortedKeys.map((key) => {
    const {
      status, value, valueBefore, valueAfter,
    } = diff[key];
    if (status === 'changed') {
      return `${indent}${symbols.removed} ${key}: ${valueBefore}\r\n${indent}${symbols.added} ${key}: ${valueAfter}\r\n`;
    }
    return `${indent}${symbols[status]} ${key}: ${value}\r\n`;
  });
  return `{\r\n${lines.join('')}}`;
};

const generateDiff = (data1, data2) => {
  const commonKeys = _.intersection(Object.keys(data1), Object.keys(data2));
  const removedKeys = _.difference(Object.keys(data1), Object.keys(data2));
  const addedKeys = _.difference(Object.keys(data2), Object.keys(data1));

  const result = [
    ...commonKeys.map((key) => {
      const value1 = data1[key];
      const value2 = data2[key];
      if (value1 === value2) {
        return [key, { status: 'unchanged', value: value1 }];
      }
      return [key, { status: 'changed', valueBefore: value1, valueAfter: value2 }];
    }),
    ...addedKeys.map((key) => [key, { status: 'added', value: data2[key] }]),
    ...removedKeys.map((key) => [key, { status: 'removed', value: data1[key] }]),
  ];
  return Object.fromEntries(result);
};

export const loadJsonFile = (path) => {
  const fullPath = resolve(process.cwd(), path);
  const data = readFileSync(fullPath, { encoding: 'utf8', flag: 'r' });
  return JSON.parse(data);
};

export default (path1, path2) => formatDiff(generateDiff(loadJsonFile(path1), loadJsonFile(path2)));
