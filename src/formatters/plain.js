import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renderTree = (ast, parentKey = '') => {
  const result = ast.flatMap((node) => {
    const currentKey = parentKey + node.key;
    switch (node.status) {
      case 'nested':
        return renderTree(node.children, `${currentKey}.`);
      case 'updated':
        return `Property '${currentKey}' was ${node.status}. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'removed':
        return `Property '${currentKey}' was ${node.status}`;
      case 'added':
        return `Property '${currentKey}' was ${node.status} with value: ${stringify(node.value)}`;
      default:
        return '';
    }
  });
  return result.join('\n');
};

export default (diffAst) => renderTree(diffAst);
