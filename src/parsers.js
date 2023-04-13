import YAML from 'js-yaml';

const parsers = {
  yaml: YAML.load,
  yml: YAML.load,
  json: JSON.parse,
};

const parse = (fileData, format) => {
  const parser = parsers[format];
  return parser(fileData);
};

export default parse;
