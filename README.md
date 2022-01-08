# 8-divine

# (一) 相关仓库
- [element-ui 源码分析-仓库](https://github.com/woow-wu7/8-element-source-code-analysis)


# (二) 前值知识

```
1
process.cwd() 和 __dirname 的区别
- process.cwd()
  - 返回 Node.js 进程的当前工作目录
  - 其实就是：调用node命令执行脚本时的目录
- __dirname
  - 返回 源代码所在的目录
- 案例
  - 比如在 8-divine 文件夹下输入命令 node test/cwd.__dirname.js
  - process.cwd() ---> 就是 /8-divine
  - __dirname -------> 就是 /8-divine/test


2
path.resolve() 和 path.join() 和 __dirname 的区别？
- path.resolve() -------> 生成绝对路径；resolve是决心，决定，解析的意思
- path.join() ----------> 拼接路径
- __dirname ------------> 当前文件的目录，是一个绝对路径
- 案例1
  - 在本项目执行 node test/resolve.join.__dirname.js
- 案例2
  - 等价：path.join(__dirname, 'public') 等价于 path.resolve(__dirname, 'public')
  - 因为：__dirname就是返回的绝对路径


3
webpack-dev-server
version >= 4.0.0
案例：
devServer: {
  // 静态资源从之前的 contentBase 改成 static
  static: {
    directory: path.resolve(__dirname, "dist"),
  },
  port: 7777,
  compress: true,
}
命令行执行 webpack serve --config webpack.config.js
// 之前3.x是 webpack-dev-server --config webpack.config.js


4
output
output webpack中的output和打包上传npm相关的属性
- output.library
- 官网文档：https://webpack.docschina.org/configuration/output/#outputumdnameddefine
---示例
 output: {
    library: {
      name: "8divine", // 配置导出库的名称，如使用require引入，这里就是require("8divine")
      type: "umd", // 配置将库暴露的方式，即配置以何种方式导出库，注意 该属性用来代替下面的 libraryTarget，以后webpack可能移除对 libraryTarget 的支持
      // type: "var", // var表示：让你的库加载之后，入口起点的返回值 将会被赋值给一个变量
      umdNamedDefine: true, // 当使用 output.library.type: "umd" 时，将 output.library.umdNamedDefine 设置为 true 将会把 AMD 模块命名为 UMD 构建。否则使用匿名 define
    },
    // libraryTarget: "umd", // 配置以何种方式导出库 ---> 将被 output.library.type 代替
    // umdNamedDefine: true, // ---------------------> 将被 output.library.umdNamedDefine 代替，当使用 libraryTarget: "umd" 时，设置 output.umdNamedDefine 为 true 将命名由 UMD 构建的 AMD 模块。否则将使用一个匿名的 define。
  }


5
环境变量
- cross-env
  - 作用：设置的是 ( node的环境 ) 中的环境变量 process.env，也就是说只能在webpack.config.js中访问到
  - 例子：`{ scripts: { "test:dev": "cross-env NODE_ENV=development OTHER_ENV=other webpack serve --config build/webpack.config.js" }}`
  - 语法：cross-env可以设置多个node环境的环境变量，只需要空格隔开就行，如上
  - 安装：npm install cross-env
- webpack.DefinePlugin()
  - 设置的是 ( 浏览器环境 ) 中的环境变量，也就是说可以在各个js文件中使用到 webpack.DefinePlugin() 中定义的环境变量
  - 注意点：
    - 如果环境变量的值是一个字符串，那么需要用 JSON.stringify('"string"') 进行转译，所以为了安全保证，将所有数据类型都进行JSON.stringify来处理
    - 如果 webpack.DefinedPlugin({'process.env.NODE_ENV': xxxx})，那么在浏览器环境中也能访问到process.env.NODE_ENV，这就是webpack.config.js中的mode属性需要干的事情
- mode
  - mode的作用是，mode的值将会作为 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('mode的值')})
  - development，production，none
- 总结区别
  - cross-env定义的环境变量，只能在node环境中被访问到，即 webpack.config.js 中被访问到
  - webpack.DefinePlugin()定义的环境变量，只能在浏览器环境中被访问到，即只能在各个module模块中去使用，不能在webpack.config.js中使用
  - mode指定的值，mode的值将会作为 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('mode的值')})，从而能在浏览器环境中访问，即module中访问
- 实践案例1
  - 结果：如果webpack.config.js中的 mode="development"，并且在 build命令时执行的命令 cross-env NODE_ENV="production"，随便在模块js中打印process.env.NODE_ENV输出的是'development'
  - 原因：说明浏览器环境中的process.env.NODE_ENV是通过webpack.config.js 中的 mode属性 设置的，而webpack.config.js中的process.env.NODE_ENV是通过cross-env来设置的
  - 本质：mode的作用是，mode的值将会作为 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('mode的值')})，从而能在浏览器环境中访问，即module中访问
  - 所以：如何同步？可以将 mode 设置为 ( mode:process.env.NODE_ENV ) 这样 ( node 和 浏览器 中的环境变量就同步了 )，因为 ( cross-env将webpack.config.js中的环境变量设置为了对应的值，而mode=process.env.NODE_ENV，mode有设置了webpack.DefinePlugin()中的process.env.NODE_ENV，用于在浏览器环境中使用)
- 实践案例2
  - 设置不同的环境对应的后端服务器地址，详见examples/main.js


6
我们在 package.json 中设置main，browser
- 浏览器环境优先级：browser > module > main
- node环境优先级：module > main
---示例
"main": "dist-prod/8divine.js", // 这里我们使用打包后的文件作为入口文件，上传到npm上
"browser": "dist-prod/8divine.js"


7
说明文档编写
vuepress // press是出版社的意思
注意：在webpack5中需要使用 vuepress2
命令：在项目根目录执行：sudo vuepress dev ./docs
官网：https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%A4%9A%E4%B8%AA%E4%BE%A7%E8%BE%B9%E6%A0%8F
```

# 资料

- npm 打包发布流程 https://juejin.cn/post/6994746118135349262
- process.cwd() 和 \_\_direname 的区别 https://www.jianshu.com/p/a80c59abd1fb
- 环境变量区别 https://juejin.cn/post/6844904023791796237#heading-0
