import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const buildPropertyPath = (parent, key) => (parent ? `${parent}.${key}` : key);

function renderAst(elem, parent = '') {
  const {
    status, key, value, valueBefore, valueAfter, children,
  } = elem;

  switch (status) {
    case 'nested':
      return children
        .map((child) => renderAst(child, buildPropertyPath(parent, key)))
        .filter((result) => result !== null)
        .join('\n');
    case 'updated': {
      const oldValue = stringifyValue(valueBefore);
      const newValue = stringifyValue(valueAfter);
      const propertyPath = buildPropertyPath(parent, key);

      return `Property '${propertyPath}' was ${status}. From ${oldValue} to ${newValue}`;
    }

    case 'removed': {
      const propertyPath = buildPropertyPath(parent, key);
      return `Property '${propertyPath}' was ${status}`;
    }

    case 'added': {
      const propertyPath = buildPropertyPath(parent, key);
      const valueString = stringifyValue(value);
      return `Property '${propertyPath}' was ${status} with value: ${valueString}`;
    }

    case 'unupdated':
      return null;

    default:
      throw new Error('Unknown state!');
  }
}

const renderDiff = (astDifference) => astDifference
  .map((elem) => renderAst(elem))
  .filter((result) => result !== null)
  .join('\n');

export default renderDiff;
