import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import _ from 'lodash';
import parse from './parsers.js';

const getData = (filepath) => {
  const absolutePath = path.resolve(cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(filepath);

  return parse(content, format);
};

const formatValue = (value) => String(value);

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const keys = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);

  const lines = keys.flatMap((key) => {
    if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${formatValue(data1[key])}`;
    }

    if (!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${formatValue(data2[key])}`;
    }

    if (data1[key] === data2[key]) {
      return `    ${key}: ${formatValue(data1[key])}`;
    }

    return [
      `  - ${key}: ${formatValue(data1[key])}`,
      `  + ${key}: ${formatValue(data2[key])}`,
    ];
  });

  return ['{', ...lines, '}'].join('\n');
};

export default genDiff;
