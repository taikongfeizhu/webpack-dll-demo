# weboack-dll-demo

# 步骤一：安装依赖必备资源

```shell
$ npm install -g webpack webpack-dev-server gulp
$ npm install
```

# 步骤二：启动开发环境
```shell
$ npm run dev
```

# 步骤三：访问开发页面,代码改变页面会热更新
```shell
http://127.0.0.1:3001
```

# 步骤四：打包构建, dist中的生产环境中的资源包
```shell
$ npm run build
```

# 通用模块预编译：提前构建和提取node_modules中的通用依赖库
```shell
$ npm run dll
```

# 通用依赖资源：react，react-router,react-dom，history

# 页面开发资源静态地址:
* http://127.0.0.1:3001/static/common/debug/lib.js
* http://127.0.0.1:3001/static/js/manifest.js
* http://127.0.0.1:3001/static/js/vendor.js
* http://127.0.0.1:3001/static/js/app.js

## 书写规范
* eslint[http://eslint.org/]
* eslint-plugin-react[https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules]
* redux[https://github.com/erikras/ducks-modular-redux]

## 详细说明
webpack 构建性能优化策略小结 [https://segmentfault.com/a/1190000007891318]


        
