import _ from 'lodash';

const symbols = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  nested: ' ',
};

const indent = (depth) => ' '.repeat(depth);

const convertToFlat = (data) => {
  if (!_.isPlainObject(data)) return data;
  return _.keys(data).map((key) => ({ key, status: 'unchanged', value: data[key] }));
};

const getObjectString = (data, depth) => {
  if (!_.isObject(data)) return data;
  return _.keys(data).map((key) => `{\n  ${indent(depth + 4)}${key}: ${data[key]}\n  ${indent(depth)}}`);
};

const formatDiff = (ast, depth = 1) => {
  const result = [];
  ast.forEach((elem) => {
    if (elem.status === 'nested') {
      result.push(`${indent(depth)}${symbols.nested} ${elem.key}: {\n`);
      result.push(formatDiff(elem.children, depth + 4));
      result.push(`${indent(depth)}  }\n`);
    } else if (_.isPlainObject(elem.value)) {
      result.push(`${indent(depth)}${symbols[elem.status]} ${elem.key}: {\n`);
      result.push(formatDiff(convertToFlat(elem.value), depth + 4));
      result.push(`${indent(depth)}  }\n`);
    } else if (elem.status === 'changed') {
      result.push(`${indent(depth)}${symbols.removed} ${elem.key}: ${getObjectString(elem.value1, depth)}\n`);
      result.push(`${indent(depth)}${symbols.added} ${elem.key}: ${getObjectString(elem.value2, depth)}\n`);
    } else {
      result.push(`${indent(depth)}${symbols[elem.status]} ${elem.key}: ${elem.value}\n`);
    }
  });
  return result.join('');
};

const convertToAst = (astDiff) => `{\n${formatDiff(astDiff)}}`;

export default convertToAst;
