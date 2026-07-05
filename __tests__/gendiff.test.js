import { test, expect, describe } from '@jest/globals';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const getDataPath = (filename) => path.join(__dirname, '..', 'data', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('gendiff', () => {
  test.each([
    ['json', 'file1.json', 'file2.json'],
    ['yml', 'file1.yml', 'file2.yml'],
  ])('gendiff stylish %s', (_format, file1, file2) => {
    const filepath1 = getDataPath(file1);
    const filepath2 = getDataPath(file2);
    const expected = readFixture('expected-stylish.txt');

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test.each([
    ['json', 'file1.json', 'file2.json'],
    ['yml', 'file1.yml', 'file2.yml'],
  ])('gendiff plain %s', (_format, file1, file2) => {
    const filepath1 = getDataPath(file1);
    const filepath2 = getDataPath(file2);
    const expected = readFixture('expected-plain.txt');

    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected);
  });

  test.each([
    ['json', 'file1.json', 'file2.json'],
    ['yml', 'file1.yml', 'file2.yml'],
  ])('gendiff json %s', (_format, file1, file2) => {
    const filepath1 = getDataPath(file1);
    const filepath2 = getDataPath(file2);
    const expected = readFixture('expected-json.txt');

    expect(genDiff(filepath1, filepath2, 'json')).toBe(expected);
  });
});
