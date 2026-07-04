// load преобразует YAML-строку в JS-объект
// JSON.parse преобразует JSON-строку в JS-объект
import { load } from 'js-yaml';

const parse = (content, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
    case '.yml':
      return load(content);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default parse;
