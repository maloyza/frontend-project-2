import _ from 'lodash';

const symbols = {
  unupdated: ' ',
  added: '+',
  removed: '-',
  nested: ' ',
};

const indentSize = 4;
const makeIndent = (depth, spaces = 2) => ' '.repeat(depth * indentSize - spaces);

function stringify(value, depth) {
  if (!_.isObject(value)) {
    return value;
  }
  const indent = makeIndent(depth);
  const entries = Object.entries(value).map(([key, val]) => `${indent}  ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${makeIndent(depth - 1)}  }`;
}

function renderAstNode(node, depth) {
  const {
    key, value, valueBefore, valueAfter, status, children,
  } = node;
  const indent = makeIndent(depth);

  switch (status) {
    case 'added':
    case 'removed':
    case 'unupdated':
      return `${indent}${symbols[status]} ${key}: ${stringify(value, depth + 1)}`;
    case 'updated':
      return `${indent}${symbols.removed} ${key}: ${stringify(valueBefore, depth + 1)}\n${indent}${symbols.added} ${key}: ${stringify(valueAfter, depth + 1)}`;
    case 'nested':
      return `${indent}${symbols[status]} ${key}: {\n${children.map((childNode) => renderAstNode(childNode, depth + 1)).join('\n')}\n${makeIndent(depth)}  }`;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
}

export default (astDifference) => `{\n${astDifference.map((node) => renderAstNode(node, 1)).join('\n')}\n}`;
