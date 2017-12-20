// https://github.com/rauschma/tree-shaking-demo/blob/master/webpack.config.js
// https://webpack.js.org/guides/tree-shaking/
// https://zhuanlan.zhihu.com/p/27980441 scope-hosting

import { cube } from './helper';

function createComponet() {
  return cube(5);
}

document.body.appendChild(createComponet());
