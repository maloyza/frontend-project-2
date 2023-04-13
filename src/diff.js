import _ from 'lodash';

export default function compilerAST(fileContent1, fileContent2) {
  const keys = _.sortBy(_.union(Object.keys(fileContent1), Object.keys(fileContent2)));
  const getDifference = (array1, array2, key) => {
    switch (true) {
      case _.has(array1, key) && _.has(array2, key):
        if (_.isObject(array1[key]) && _.isObject(array2[key])) {
          return { key, status: 'nested', children: compilerAST(array1[key], array2[key]) };
        }
        if (array1[key] === array2[key]) {
          return { key, status: 'unupdated', value: array1[key] };
        }
        return {
          key,
          status: 'updated',
          valueBefore: array1[key],
          valueAfter: array2[key],
        };
      case _.has(array1, key):
        return { key, status: 'removed', value: array1[key] };
      default:
        return { key, status: 'added', value: array2[key] };
    }
  };
  return keys.map((key) => getDifference(fileContent1, fileContent2, key));
}
