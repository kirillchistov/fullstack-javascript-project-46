// Форматер должен отдельно уметь:
// 1. Превращать обычные значения в строку.
// 2. Превращать вложенные объекты-значения в блок с отступами.
// 3. Обходить diff‑дерево и печатать строки со знаками +, - или пробелом.
// На каждый уровень добавляется 4 пробела,
// а для строк со спецсимволами используется смещение на 2 символа влево,
// чтобы + и - попадали в нужную колонку.

const indentSize = 4;

const getIndent = (depth, shift = 0) => ' '.repeat(depth * indentSize - shift);

const stringify = (value, depth) => {
  if (value === null) {
    return 'null';
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  );

  return ['{', ...lines, `${getIndent(depth)}}`].join('\n');
};

const formatLine = (indent, sign, key, value, depth) => {
  const stringifiedValue = stringify(value, depth);
  const separator = stringifiedValue === '' ? '' : ' ';
  return `${indent}${sign} ${key}:${separator}${stringifiedValue}`;
};

const iter = (tree, depth) => {
  const lines = tree.flatMap((node) => {
    const indent = getIndent(depth, 2);
    const bracketIndent = getIndent(depth);

    switch (node.type) {
      case 'nested':
        return `${indent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${bracketIndent}}`;

      case 'unchanged':
        return formatLine(indent, ' ', node.key, node.value, depth);

      case 'added':
        return formatLine(indent, '+', node.key, node.value, depth);

      case 'removed':
        return formatLine(indent, '-', node.key, node.value, depth);

      case 'changed':
        return [
          formatLine(indent, '-', node.key, node.value1, depth),
          formatLine(indent, '+', node.key, node.value2, depth),
        ];

      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

const formatStylish = (tree) => `{\n${iter(tree, 1)}\n}`;

export default formatStylish;
