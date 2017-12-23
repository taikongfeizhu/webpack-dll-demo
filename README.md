
# Webpack-dll-demo

**本项目已经完全支持react和webpack最新版本，一键无痛安装，欢迎体验**

设计初衷：项目中集成了webpack和react全家桶，方便用户能快速了解基于webpack的工程化搭建和配置技巧，同时也是笔者在segmentfault的博文[《webpack 构建性能优化策略小结》](https://segmentfault.com/a/1190000007891318)的工程示例demo，后续会做到持续更新，同步跟进webpack的一些实用特性和最佳实践。

## 整合完成的功能模块

热更新、ES6/7、LESS、Router4、redux、webpack3、async／await、前端node服务器，按需加载，见下图：

- [x] ES6/7
    - [x] babel-presets-env
    - [x] babel-presets-react
    - [x] babel-transform-decorators-legacy
    - [x] babel-transform-async-to-generator
- [ ] 热更新(HMR)
    - [x] react-hot-loader
- [x] LESS
    - [x] css
    - [x] less
    - [x] postcss
    - [x] css modules 
- [x] webpack
     - [x] code splting
     - [x] dllPlugin
     - [x] happypack
     - [x] bundleAnalyzerPlugin
     - [x] uglifyjs-webpack-plugin
- [x] webpack-dev-server
     - [x] axios
     - [x] hmr
     - [x] mock
     - [x] http-proxy-middleware
- [x] react
     - [x] react 16+
     - [ ] preact
     - [x] react router4
     - [x] antd desigin
     - [x] react-redux
     - [x] redux-saga
     - [x] immutablejs
     - [x] purerender


#### 版本更新内容

1、采用dllplugin + commonchunk的方式进行通用模块提取，提升构建性能

2、React16更新变化请看官方文档：https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html

3、新增preact支持，如果你觉得preact的兼容性不好，可以切换回react，只需要删除webpack.config的alias的几行配置。

```javascript
 'react': __PREACT__ ? 'preact-compat/dist/preact-compat' : 'react', //如果你不想要preact，可以删除这一行
'react-dom': __PREACT__ ? 'preact-compat/dist/preact-compat' : 'react-dom', //如果你不想要preact，可以删除这一行
'create-react-class': 'preact-compat/lib/create-react-class' //如果你不想要preact，可以删除这一行
```

==========================

#### Installation 教程

1、 拉取项目到本地开发目录下
```shell
git clone git@github.com:taikongfeizhu/webpack-dll-demo.git
```

2、 安装依赖包，如果安装时间过长可以修改npm的registry,推荐实用npm5+或者yarn进行安装

```shell
npm config set registry https://registry.npm.taobao.org
```

```shell
npm install 或者 yarn install
```

3、运行demo。
 ```shell
 npm start
 ```

3、打开浏览器访问3000端口.
```shell
http://127.0.0.1:3000
```

4、打包发布: 注意修改publicPath以适配生产环境地址，本例中提供了两套打包方案分别对应webpack.config.prod.js和webpack.config.opt.js，后者为优化配置，构建速度为前着的两倍左右，可供参考：

```shell
标准构建
npm run build

优化构建
npm run build:opt
```

5、为了方便用户能直接感受和领略webpack3的两大新特性：tree-shaking和scope Hoisting，项目中也配置了支持如下特性的简要配置，在tree-shaking专属文件夹中，执行如下脚本即可体验：
```shell
npm run tree
```

===========================================

#### 关于DOC文档教程
docs中的文档教程为网上收集的一些webpack+react开发的最佳实践，部分内容存在知识点更新问题，可以作为学习参考资料使用


#### 关于react-router4的注意事项

react-router2和react-router4为跨代升级的两个版本，互不兼容，但是官方承诺会同时维护，所以可以根据实际项目和掌握情况灵活使用，本例子中在router加载的时候将redux中的state和redux-saga也做成了动态注入，实现了component和state都为异步注入的形式提升性能，具体实现后续会有专门的文章来介绍，可以先看项目中的routes和views的代码实现

#### 项目结构

```text
├── bin                     # dev-server的启动脚本
├── config                  # 工程依赖基础配置
├── doc                     # 可供学习和参考的文档资料
├── package.json            # 资源依赖配置json文件
├── public                  # 外链加载的静态资源和bundle之外的资源(externals)
├── README.md               # 使用文档
├── server                  # dev-server的配置脚本
├── src                     # 前端开发相关的入口目录
│   ├── api                 # api请求库和api接口地址配置
│   ├── components          # 前端通用组件封装，可以跨业务模块使用
│   ├── constant            # 常量配置文件
│   ├── containers          # app入口和router模块的容器组件
│   ├── index.html          # 单页应用html
│   ├── index.js            # 单页应用的entry对应文件
│   ├── layout              # app的展示型组件入口
│   ├── routes              # 路由配置表
│   ├── static              # 参与webpack构建的系统通用的静态资源img和css
│   ├── store               # redux的状态容器中的相关配置
│   ├── utils               # 工具函数库
│   └── test                # 测试用例集
├── tree-shaking            # tree-shaking演示目录 
├── webpack.config.dll.js   # dllPlugin编译配置文件
├── webpack.config.js       # 项目开发配置
├── webpack.config.prod.js  # 项目构建常规版配置
├── webpack.config.opt.js   # 项目构建优化版配置
└── yarn.lock               # yarn资源锁文件

```

#### webpack工程化应用实践系列
欢迎访问笔者的[博客](https://segmentfault.com/u/abcat)进行学习交流

#### 参考资料

 * https://webpack.js.org/concepts/
 * https://taikongfeizhu.github.io/webpack3-in-action/index.html
 * https://segmentfault.com/a/1190000011765141
 * https://github.com/hyy1115/react-latest-framework
