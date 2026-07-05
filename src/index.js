import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const getData = (filepath) => {
  const absolutePath = path.resolve(cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath);

  return parse(content, extension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildDiff(data1, data2);

  return format(diff, formatName);
};

export default genDiff;
