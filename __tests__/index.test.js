// @ts-check
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const pathFile1yml = getFixturePath('file1.yml');
const pathFile2yml = getFixturePath('file2.yml');

const pathFile1json = getFixturePath('file1.json');
const pathFile2json = getFixturePath('file2.json');

const pathFileOutput = getFixturePath('reference_file1.txt');
const dataFileOutput = readFileSync(pathFileOutput, { encoding: 'utf8', flag: 'r' });
const dataFileOutput2 = readFileSync(pathFileOutput, { encoding: 'utf8', flag: 'r' });

test('testing gendiff', () => {
  expect(genDiff(pathFile1yml, pathFile2yml)).toBe(dataFileOutput);
  expect(genDiff(pathFile1json, pathFile2json)).toBe(dataFileOutput);
});

test('testing gendiff plain', () => {
  expect(genDiff(pathFile1yml, pathFile2yml)).toBe(dataFileOutput2);
  expect(genDiff(pathFile1json, pathFile2json)).toBe(dataFileOutput2);
});
