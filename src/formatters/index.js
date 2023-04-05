import convertToAst from './stylish.js';
import diffAst from './plain.js';

const formatters = {
  stylish: convertToAst,
  plain: diffAst,
};

export default (ast, formatName = 'stylish') => formatters[formatName](ast);
