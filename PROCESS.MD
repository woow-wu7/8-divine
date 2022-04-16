# (一) 构建过程

## (1) 安装依赖

```
npm init -y
npm install vue -D

npm install webpack -D
npm install webpack-cli -D
npm install webpack-dev-server -D
npm install vue-loader vue-template-compiler html-webpack-plugin -D // vue组件处理 和 html模版处理
npm install url-loader file-loader html-loader -D //文件处理
npm install style-loader css-loader -D // 样式处理
npm install sass sass-loader node-sass -D // sass相关

npm install babel-loader @babel/core @babel/preset-env -D // babel可以把es6转成es5
npm install @babel/plugin-proposal-class-properties -D // -- 支持解析 class 语法，proposal是提案的意思 - 在后
npm install @babel/plugin-proposal-decorators // ----------- class 的装饰器语法，注意两者的顺序 -------- 在前

npm install cross-env -D


####### markdown 相关
npm install markdown-it -D // 解析器
npm install markdown-it-anchor -D // 生成锚点
npm install markdown-it-container -D // 创建块级自定义容器的解析插件
npm install markdown-it-chain -D // 支持链式调用 markdown-it
npm i -D transliteration // 汉字转拼音
```

### (2) 目录结构

```
.
├── build // webpack配置文件夹
├── dist // 打包后的文件夹
├── dist-prod // 入口文件夹
│   ├── 8divine.js
│   └── index.html
├── docs
│   └── README.md // 说明文档
├── examples // vue项目
│   ├── app.vue
│   ├── index.js
│   ├── logo.jpg
│   ├── main.js
│   └── utils
├── index.js // 组件库 - vue插件 - ui组件库的入口
├── package.json
├── packages // 各个组件
├── public  // 静态文件夹
│   └── index.html // vue模版
└── test
```
