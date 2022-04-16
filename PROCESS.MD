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
├── examples // vue项目测试，即起一个vue本地服务测试各个组件
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

### (3) 打包

```
1. 执行命令 build:prod 进行webpack打包
- "build:prod": "cross-env NODE_ENV=development webpack --config  build/webpack.config.prod.js"
- 入口：index.js
  - 作用：主要做的事情就是引入 8-divine 组件库中的所有组件，并声明install方法，即作为Vue的插件，完成组件注册
  - 使用：在 package.json 中 main 配置项指定了项目入口是 dist-prod/8divine.js，其实就是 index.js 为入口的所有依赖代码
- 出口：dist-prod
```

### (4) npm 发布包相关

```
1
package.json
---

main
- 指定了项目的入口文件
- 即使用组件库时 import xxx from 'xxxx' 使用的文件

keywords
- 关键字数组，可以通过关键字来搜索npm包

homepage
- 项目的官网链接url地址
```

```
2
webpack.config.js
- output.library
  - name：导出库的名称
  - type：暴露库的方式，比如 umd ( umd 同时支持 esmodule + commanjs + amd )
  - umdNameDifine: true 将amd转成umd
---

output: {
    filename: "8divine.js",
    path: path.resolve(process.cwd(), "dist-prod"),

    library: {
      name: "8divine", // 配置导出库的名称，如使用require引入，这里就是require("8divine")
      type: "umd", // 配置将库暴露的方式，即配置以何种方式导出库，注意 该属性用来代替下面的 libraryTarget，以后webpack可能移除对 libraryTarget 的支持
      umdNamedDefine: true, // 当使用 output.library.type: "umd" 时，将 output.library.umdNamedDefine 设置为 true 将会把 AMD 模块命名为 UMD 构建。否则使用匿名 define
    }
  },
```

```
3
npm 命令
---

npm pack
- 生成一个压缩文件 ( name-version.tgz )
- 注意：npm pack 命令是在整个项目的根目录中输入的命令，因为package.json在根目录
- 使用：npm install 路径\xx-xx.tgz


---
发布流程
1. 第一次发包
- npm adduser --- 注意 npm 必须是npm的源，不能是淘宝等，可以使用nrm切换
- 然后输入 用户名 密码

2. 非第一次发包
npm login

3. 发布
npm publish

4. 撤销发布的包
npm unpublish
npm unpublish 包名@版本号

5.1 更新至新的补丁版本
npm version patch

5.2 更新版本号并进行git提交，自定义提交描述
npm version major -m "版本更新至%s"

5.3 更新至新的补丁版本，并不增加git的tag
npm version patch --no-git-tag-version
```

# 资料

- npm 打包发布流程 https://juejin.cn/post/6994746118135349262
- npm 发布相关 https://blog.51cto.com/u_15328720/3401308
- process.cwd() 和 \_\_direname 的区别 https://www.jianshu.com/p/a80c59abd1fb
- 环境变量区别 https://juejin.cn/post/6844904023791796237#heading-0
- 构建过程 https://juejin.cn/post/6950905030635421710
