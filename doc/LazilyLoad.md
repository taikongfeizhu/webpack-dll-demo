# React 懒加载组件

这个组件是提取自 webpack [Lazy Loading - React](https://webpack.js.org/guides/lazy-load-react/)。

针对 webpack 的代码做了微调，增加了一个更加方便的调用方法。

安装方式：
> npm install --save @someok/lazilyload

## 测试准备

虽然本组件没有提供测试代码，不过为了保证你的测试代码能够成功，还需要安装下面组件以便 babel
能够正确解决 `import('xxx'')` 语法。

> npm install --save-dev babel-plugin-dynamic-import-node

然后在 `.babelrc` 的 `env > test` 区域增加如下配置： 
```json
{
    "env": {
        "test": {
            "presets": [
                "env",
                "react"
            ],
            "plugins": [
                "dynamic-import-node"
            ]
        }
    }
}
```

## 示例

使用方式可参考 `example/src` 下的代码。

### 简单方式

```javascript
import {lazilyComponent} from '@someok/lazilyload';

const Comp1 = (props) => lazilyComponent(import('./Comp1'))(props);
const Comp2 = (props) => lazilyComponent(import('./Comp2'))(props);

ReactDom.render(
    (<div>
        <Comp1/>
        <Comp2/>
    </div>),
    document.getElementById('root')
);
```

### 复杂方式

```javascript
import LazilyLoad, {importLazy} from '@someok/lazilyload';

const MultiComp = () => {
    return (
        <LazilyLoad
            modules={{
                Comp1: () => importLazy(import('./Comp1')),
                Comp2: () => importLazy(import('./Comp2')),
            }}
        >
            {({Comp1, Comp2}) => (
                <div>
                    <Comp1/>
                    <Comp2/>
                </div>
            )}
        </LazilyLoad>
    );
};


ReactDom.render(
    <MultiComp/>,
    document.getElementById('root')
);
```

EOF
