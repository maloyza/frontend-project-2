import _ from 'lodash';

const buildAst = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    if (!_.has(data2, key)) return { key, status: 'removed', value: data1[key] };
    if (!_.has(data1, key)) return { key, status: 'added', value: data2[key] };
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        status: 'nested',
        children: buildAst(data1[key], data2[key]),
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        status: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return { key, status: 'unchanged', value: data1[key] };
  });
  return result;
};

export default buildAst;
