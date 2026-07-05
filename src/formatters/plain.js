// Логика здесь строит полный путь до свойства через массив ancestry,
// а потом соединяет его через точку.
// Составные значения не разворачиваются, а заменяются маркером [complex value]

import _ from 'lodash';

const isPlainObject = (value) => _.isObject(value) && !Array.isArray(value);

const stringify = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (value === null) {
    return 'null';
  }

  return String(value);
};

const iter = (tree, ancestry) => tree
  .flatMap((node) => {
    const property = [...ancestry, node.key].join('.');

    switch (node.type) {
      case 'nested':
        return iter(node.children, [...ancestry, node.key]);

      case 'added':
        return `Property '${property}' was added with value: ${stringify(node.value)}`;

      case 'removed':
        return `Property '${property}' was removed`;

      case 'changed':
        return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  })
  .join('\n');

const formatPlain = (tree) => iter(tree, []);

export default formatPlain;
