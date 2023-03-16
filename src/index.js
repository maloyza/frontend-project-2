/*  eslint linebreak-style: ["error", "windows"]  */

import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

function generateObjectDiff(obj, depth = 1) {
  const indent = ' '.repeat(depth * 2 - 2);
  const lines = Object.entries(obj).flatMap(([key, val]) => {
    switch (val.status) {
      case 'added':
        return `${indent}+ ${key}: ${JSON.stringify(val.value, null, 2)}`.split('\n');
      case 'removed':
        return `${indent}- ${key}: ${JSON.stringify(val.value, null, 2)}`.split('\n');
      case 'unchanged':
        return `${indent}  ${key}: ${JSON.stringify(val.value, null, 2)}`.split('\n');
      case 'changed':
        return [
          `${indent}- ${key}: ${JSON.stringify(val.value[0], null, 2)}`,
          `${indent}+ ${key}: ${JSON.stringify(val.value[1], null, 2)}`,
        ];
      default:
        return 1;
    }
  });
  return `{\n${lines.join('\n')}\n${' '.repeat(depth * 2 - 2)}}`;
}

function genDiff(obj1, obj2) {
  const removedKeys = _.difference(Object.keys(obj1), Object.keys(obj2));
  const addedKeys = _.difference(Object.keys(obj2), Object.keys(obj1));
  const commonKeys = _.intersection(Object.keys(obj1), Object.keys(obj2));
  const diff = {};
  commonKeys.map((key) => {
    const valBefore = obj1[key];
    const valAfter = obj2[key];
    if (valBefore === valAfter) {
      diff[key] = { status: 'unchanged', value: valBefore };
    } else {
      diff[key] = { status: 'changed', value: [valBefore, valAfter] };
    }
    return null;
  });
  addedKeys.map((key) => {
    diff[key] = { status: 'added', value: obj2[key] };
    return null;
  });
  removedKeys.map((key) => {
    diff[key] = { status: 'removed', value: obj1[key] };
    return null;
  });

  const diffResult = Object.keys(diff).sort().reduce((acc, key) => {
    const result = { ...acc };
    result[key] = diff[key];
    return result;
  }, {});

  return diffResult;
}

function loadJSON(pathToFile) {
  const fullPath = path.resolve(process.cwd(), pathToFile);
  const dataFile = readFileSync(fullPath, { encoding: 'utf8' });
  const result = JSON.parse(dataFile);
  return result;
}

export default (path1, path2) => generateObjectDiff(genDiff(loadJSON(path1), loadJSON(path2)));
