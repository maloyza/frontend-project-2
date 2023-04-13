// @ts-check
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const stylish = readFileSync(getFixturePath('reference_file_stylish'), { encoding: 'utf8' });
const plain = readFileSync(getFixturePath('referenсе_file_plain'), { encoding: 'utf8' });
const json = readFileSync(getFixturePath('reference_file_json'), { encoding: 'utf8' });

test('test format JSON difference stylish', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'stylish')).toEqual(stylish);
});

test('test format JSON difference plain', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'plain')).toEqual(plain);
});

test('test format JSON difference json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'json')).toEqual(json);
});

test('test format YML difference stylish', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2, 'stylish')).toEqual(stylish);
});

test('test format YML difference plain', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2, 'plain')).toEqual(plain);
});

test('test format YML difference json', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2, 'json')).toEqual(json);
});
