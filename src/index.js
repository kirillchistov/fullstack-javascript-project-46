import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import formatStylish from './formatters/stylish.js';

const getData = (filepath) => {
  const absolutePath = path.resolve(cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(filepath);

  return parse(content, format);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildDiff(data1, data2);

  switch (format) {
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default genDiff;
