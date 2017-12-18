// https://github.com/rauschma/tree-shaking-demo/blob/master/webpack.config.js
// https://webpack.js.org/guides/tree-shaking/

import { cube } from './helper';

function createComponet() {
  return cube(5)
}

document.body.appendChild(createComponet())
