import _ from 'lodash';

export default function genDiff(data1, data2) {
  const commonKeys = _.intersection(Object.keys(data1), Object.keys(data2));
  const removedKeys = _.difference(Object.keys(data1), Object.keys(data2));
  const addedKeys = _.difference(Object.keys(data2), Object.keys(data1));
  const result = [
    ...commonKeys.map((key) => {
      const value1 = data1[key];
      const value2 = data2[key];
      if (value1 === value2) {
        return [key, { status: 'unchanged', value: value1 }];
      }
      return [key, { status: 'changed', valueBefore: value1, valueAfter: value2 }];
    }),
    ...addedKeys.map((key) => [key, { status: 'added', value: data2[key] }]),
    ...removedKeys.map((key) => [key, { status: 'removed', value: data1[key] }]),
  ];
  return Object.fromEntries(result);
}
