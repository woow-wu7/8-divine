# 8-divine

![8-divine](static/divine.jpg)

# (一) 相关仓库

- [element-ui 源码分析-仓库](https://github.com/woow-wu7/8-element-source-code-analysis)

# (二) 前值知识

### (1) process.cwd() 和 `__dirname`

- process.cwd() - 命令脚本文件所在的目录
- `__dirname` ----- `__dirname`代码文件所在的目录

```
1
process.cwd() 和 __dirname 的区别
- process.cwd()
  - 返回 Node.js 进程的当前工作目录
  - 其实就是：调用node命令执行脚本时的目录
- __dirname
  - 返回 源代码所在的目录，即 __dirname 代码所在的文件夹
- 案例
  - 比如在 8-divine 文件夹下输入命令 node test/cwd.__dirname.js
  - process.cwd() ---> 就是 /8-divine
  - __dirname -------> 就是 /8-divine/test
```

### (2) path.resolve() 和 path.join() 的区别

```
2
path.resolve() 和 path.join() 和 __dirname 的区别？
- path.resolve() -------> 生成绝对路径；resolve是决心，决定，解析的意思
- path.join() ----------> 拼接路径
- __dirname ------------> 当前__dirname文件的目录，是一个绝对路径
- 案例1
  - 在本项目执行 node test/resolve.join.__dirname.js
- 案例2
  - 等价：path.join(__dirname, 'public') 等价于 path.resolve(__dirname, 'public')
  - 因为：__dirname就是返回的绝对路径
```

### (3) webpack-dev-server^4 配置变化

```
3
webpack-dev-server
version >= 4.0.0
---

3.1
devServer: {
  // 静态资源从之前的 contentBase 改成 static
  static: {
    directory: path.resolve(__dirname, "dist"),
  },
  port: 7777,
  compress: true,
}

3.2
命令行执行 webpack serve --config webpack.config.js
// 之前3.x是 webpack-dev-server --config webpack.config.js
```

### (4) output 和 npm 包上传 相关的属性

- output.library

```
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
```

### (5) 环境变量

- cross-env + webpack.DefinePlugin() + mode

```
5
环境变量
---

- cross-env
  - 作用：设置的是 ( node的环境 ) 中的环境变量 process.env，也就是说只能在webpack.config.js中访问到
  - 例子：`{ scripts: { "test:dev": "cross-env NODE_ENV=development OTHER_ENV=other webpack serve --config build/webpack.config.js" }}`
  - 语法：cross-env可以设置多个node环境的环境变量，只需要空格隔开就行，如上
  - 安装：npm install cross-env -S
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
  - 原因：
    - 1. 说明浏览器环境中的process.env.NODE_ENV是通过 -------- webpack.config.js 中的 ( mode属性 ) 设置的
    - 2. 而webpack.config.js中的process.env.NODE_ENV是通过 - ( cross-env ) 来设置的
  - 本质：mode的作用是，mode的值将会作为 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('mode的值')})，从而能在浏览器环境中访问，即module中访问
  - 所以：如何同步？
    - 回答：可以将 mode 设置为 ( mode:process.env.NODE_ENV ) 这样 ( node 和 浏览器 中的环境变量就同步了 )
    - 因为：
      - cross-env NODE_ENV=development 将 webpack.config.js 中的环境变量 NODE_ENV 设置为了 development
      - 而 mode=process.env.NODE_ENV 访问到了 NODE_ENV=development，即 mode=development，mode的作用就是设置 webpack.DefinePlugin() 中的 process.env.NODE_ENV，用于在浏览器环境中使用
      - 这样 浏览器环境 和 node环境的 NODE_ENV 就都为 development
- 实践案例2
  - 设置不同的环境对应的后端服务器地址，详见examples/main.js

---
浏览器中的环境变量有多少种指定的方式 ( 两种 )
- mode 指定
- webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify('NODE_ENV的值') })
```

### (6) package.json

```
6
我们在 package.json 中设置main，browser
- 浏览器环境优先级：browser > module > main
- node环境优先级：module > main
---示例
"main": "dist-prod/8divine.js", // 这里我们使用打包后的文件作为入口文件，上传到npm上
"browser": "dist-prod/8divine.js"
"bin": 命令 - 对应的文件
```

### (7) 说明文档编写

```
7
说明文档编写
vuepress // press是出版社的意思
注意：在webpack5中需要使用 vuepress2
命令：在项目根目录执行：sudo vuepress dev ./docs
官网：https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%A4%9A%E4%B8%AA%E4%BE%A7%E8%BE%B9%E6%A0%8F
```

### (8) Vue.use()

```
1
Vue.use(plugin)
- 作用
  - 安装vue插件
- plugin
  - 1. 如果插件是一个对象，必须要有 install 方法
  - 2. 如果插件是一个函数，函数自身会被作为 install 方法
  - 注意：如果一个插件多次调用install方法，插件只会安装一次
- 调用时机
  - Vue.use() 必须在 new Vue() 之前调用


2
插件
- 作用：插件通常为vue提供 ( 全局功能 )
- 类型
  - 1. 插件是object
   - 当插件是对象时，必须要有一个 install 方法
   - install(Vue, options)
    - 第一个参数
      - Vue
      - 所以：在插件中就可以利用大Vue上的属性和方法实现不同的功能
      - 比如：Vue.directive指令，Vue.mixin混合，Vue.prototype.xxx原型属性方法，Vue.xxx静态属性和方法
    - 第二个参数：可选的 ( 选项对象 )
  - 2. 插件是function
    - 函数自身会作为install方法


3
Vue.use源码
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 1
    // 每个 Vue 的 plugin
    // - 1. 是对象时都具有一个install方法
    // - 2. 是函数时本身会被当作install方法
    // 2
    // install(Vue [, options])
    // - 第一个参数：是大Vue
    //  - 所以：具有Vue的能力
    //  - 比如：Vue.directive指令，Vue.mixin混合，Vue.prototype.xxx原型属性方法，Vue.xxx静态属性和方法

    const installedPlugins = this._installedPlugins || (this._installedPlugins = []); // 不存在赋值空数组
    // ------------ 插件已经注册过
    if (installedPlugins.indexOf(plugin) > -1) {
      // 如果已经注册过该插件，返回this
      // this表示大Vue，返回this，表示不再往下执行，同时可以实现链式调用，Vue.use().use()
      return this;
    }
    // ----------- 插件未注册过，继续往下执行
    // additional parameters 附加参数
    // - Vue.use(plugin, additionalParameters) 附加的可选的第二个配置项对象参数
    const args = toArray(arguments, 1);
    // args
    // - 注意这里的 arguments 是 Vue.use()方法中的 arguments
    // - 这里表示：获取 Vue.use() 的第二个参数 options 对象

    // toArray()
    // export function toArray (list: any, start?: number): Array<any> {
    //   start = start || 0
    //   let i = list.length - start
    //   const ret: Array<any> = new Array(i)
    //   while (i--) {
    //     ret[i] = list[i + start] // 这里写的很精妙
    //   }
    //   return ret
    // }

    args.unshift(this);
    // 将大 Vue 添加进参数数组最前面，这样调用plugin的install方法的第一个参数就变成了Vue

    if (typeof plugin.install === "function") {
      // 插件是对象，install方法存在并且是function，调用
      // 注意：vue的plugin中的install方法的第一个参数：大Vue，就是args数组的第一个成员就是大Vue， args.unshift(this);
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      // 插件本身是函数，调用
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin); // 未注册过该插件，调用插件后，把该插件添加进插件数组，用于之后判断是否注册过该插件
    return this; // 同样的，插件 注册过 和 未注册过 都在最后返回 Vue，实现Vue.use() 的链式调用
  };
}
```
