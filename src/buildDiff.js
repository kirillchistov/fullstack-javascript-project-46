// Ключи объединяются и сортируются один раз на каждом уровне,
// а для вложенных объектов функция вызывает сама себя рекурсивно.
// nested — ключ есть в обоих объектах, и оба значения — обычные объекты;
// тогда есть children.
// unchanged — значение одинаковое.
// added — ключ только во втором объекте.
// removed — ключ только в первом объекте.
// changed — ключ есть в обоих, но значения разные;
// тогда храним value1 и value2.

import _ from 'lodash';

const isPlainObject = (value) => _.isObject(value) && !Array.isArray(value);

const buildDiff = (data1, data2) => {
  const keys = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);

  return keys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: buildDiff(data1[key], data2[key]),
      };
    }

    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }

    return {
      key,
      type: 'changed',
      value1: data1[key],
      value2: data2[key],
    };
  });
};

export default buildDiff;
