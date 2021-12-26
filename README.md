# 8-divine

### (一) 前值知识

```
1
process.cwd() 和 __dirname 的区别
- process.cwd()
  - 返回 Node.js 进程的当前工作目录
  - 其实就是：调用node命令执行脚本时的目录
- __dirname
  - 返回 源代码所在的目录
- 案例
  - 比如在 8-divine 文件夹下输入命令 node/test/cwd.__dirname.js
  - process.cwd() ---> 就是 /8-divine
  - __dirname -------> 就是 /8-divine/test


2
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


3
我们在 package.json 中设置main，browser
- 浏览器环境优先级：browser > module > main
- node环境优先级：module > main
---示例
"main": "dist-prod/8divine.js", // 这里我们使用打包后的文件作为入口文件，上传到npm上
"browser": "dist-prod/8divine.js",
```

# 资料

- npm 打包发布流程 https://juejin.cn/post/6994746118135349262
- process.cwd() 和 \_\_direname 的区别 https://www.jianshu.com/p/a80c59abd1fb

