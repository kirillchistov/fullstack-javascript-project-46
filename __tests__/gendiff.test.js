import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff flat json', () => {
  const filepath1 = path.join(__dirname, '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '__fixtures__', 'file2.json');
  const expected = fs.readFileSync(
    path.join(__dirname, '__fixtures__', 'expected.txt'),
    'utf-8',
  ).trim();

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
