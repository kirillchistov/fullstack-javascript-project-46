import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.each([
  ['json', 'file1.json', 'file2.json'],
  ['yml', 'file1.yml', 'file2.yml'],
])('gendiff flat %s', (_format, file1, file2) => {
  const filepath1 = path.join(__dirname, '..', 'data', file1);
  const filepath2 = path.join(__dirname, '..', 'data', file2);
  const expected = fs.readFileSync(
    path.join(__dirname, '__fixtures__', 'expected.txt'),
    'utf-8',
  ).trim();

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
