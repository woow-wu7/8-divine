const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

// 1
// cross-env
// - 在 package.json 中设置了 "dev:development": "cross-env NODE_ENV=development webpack --config build/webpack.config.js"
// - "cross-env NODE_ENV=development" -> 表示的是设置 NODE 环境中的 process.env.NODE_ENV 环境变量的值为 development
// - process.env.NODE_ENV 作用就是访问 node环境的 NODE_ENV 环境变量
console.log(`process.env.NODE_ENV`, process.env.NODE_ENV);
console.log(`process.env.HOST_ENV`, process.env.HOST_ENV);

// 2
// 真实项目的环境变量的设置
// webpack3
// (1) 现在 package.json 中通过 cross-env 插件设置 ( NODE ) 环境变量
//    - cross-env NODE_ENV=development
//    - 在node环境中可以通过 process.env.NODE_ENV 来获取
// (2) 在 webpack.config.js 中通过 webpack.DefinePlugin 将 ( 浏览器 ) 环境变量设置为 第一步设置的值
//    - webpack.config.js 中的 webpack.definePlugin 中设置 "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
//    - 表示将浏览器环境中的 process.env.NODE_ENV 设置为 node环境中的 process.env.NODE_ENV
// (3) 这样 浏览器环境 和 node 环境中的值就同步了，都是为 cross-env 指定的值
// webpack4
// (1) webpack4中可以直接设置：mode 属性
//    - mode:development
//    - 相当于：webpack.definedPlugin({'process.env.NODE_ENV': JSON.stringify('development')})

// console.log(`NAME`, NAME); // 报错了，说明 webpack.DefinePlugin 中定义的环境变量只能在浏览器环境中访问，即任何一个module中访问

// 前值知识

// 1
// RegExp
// - regular expression 正则表达式
// - 两种方法声明正则表达式
//    - 编译时运行新建正则 ----------- const regexp = /xyz/
//    - 运行时新建正则 -------------- const regexp = new RegExp('xyz', '修饰符igm')
// - 实例方法
//    - RegExp.prototype.test() --- 返回一个布尔值，表示是否匹配参数字符串
// - 字面量字符 和 元字符
//    - 表示字面意思的字符称为字面字符
//    - 表示特殊的含义，而不是表示字面意思
//      - . 点字符，匹配除 回车\r 换行\n 行分割符
//      - ^ $ 位置字符
//      - | 选择符 表示or或关系；( /ab|cd/ ) 匹配 ( ab或cd，而不是 b或c )
//      - \\ \*
//      - + ? () [] {} 等
// - 正则表达式中需要转译的字符，一共12个
//    - ^、.、[、$、(、)、|、*、+、?、{ 和 \\
//    - 我们调整一下顺序：
//      点字符.
//      位置字符^$
//      选择符｜
//      量词符*?+
//      () [ { \\
// - 预定义模式
//    - \d [0-9] digit
//    - \D [^0-9]
//    - \w [a-z0-9A-Z_]
//    - \W [^a-z0-9A-Z_]
//    - \s [ \t\r\n\v\f]
//    - \S
//    - \b 单词边界，boundary
//    - \B 匹配非词边界，即在词的内部
// - 字符类
//    - [abc] 表示只要匹配其中一个字符就可以
//      - 脱字符 ^
//        - [^xyz]表示除了x、y、z之外都可以匹配
//        - [^]，就表示匹配一切字符
//      - 连字符 -
//        - 连续序列的字符
//        - [abc]可以写成[a-c]
// - 重复类
//    - {n}表示恰好重复n次
//    - {n,}表示至少重复n次
//    - {n,m}表示重复不少于n次，不多于m次
// - 量词符
//    - ? 问号表示某个模式出现0次或1次，等同于 {0, 1}
//    - * 星号表示某个模式出现0次或多次，等同于 {0,}
//    - + 加号表示某个模式出现1次或多次，等同于 {1,}
//    - 贪婪模式 var s = 'aaa';
//      - s.match(/a+/) // ["aaa"]
//    - 非贪婪模式
//      - s.match(/a+?/) // ["a"]
//    - *?：表示某个模式出现0次或多次，匹配时采用非贪婪模式
//    - +?：表示某个模式出现1次或多次，匹配时采用非贪婪模式
//    - 为什么 ? 没有非贪婪模式，因为是0个或者1个，本来就不贪婪

// 2
// webpack优化
// 2.1 noParse
// - module.noParse
// - 当安装的第三方库没有依赖其他库时，是不需要去寻找解析第三方库的依赖关系，提高构建速度
// module: {
//   noParse: /jquery|lodash/, // ------ 不去解析jquery或lodash的依赖关系，因为它们俩都没有依赖其他库，从而提高构建速度
//   rules: []
// }
// 2.2 include 和 exclude
// - 在 module.rules 中去配置loader时，通过 include 和 exclude 来缩小寻找loader的范围
// - 因为在寻找loader时默认回去node_modules中去寻找，而我们真正要要loader处理的是我们自己开发的文件时，就可以通过 exclude 来缩小loader匹配的范围
// 2.3 DllPlugin 和 DllReferencePlugin
// - DllPlugin
//    - 主要作用是：单独打包第三方包时，生成一个 json 任务清单，即生成动态链接库
//    - name path
// - DllReferencePlugin
//    - 主要作用是：引用动态连结库
// 2.3 懒加载
// - 安装 @babel/plugin-syntax-dynamic-import
// - import().then() 即import函数返回一个promise，配合webpack的代码分割懒加载不同的chunk
// 2.4 热更新
// - webpack.HotModuleReplacementPlugin -----> 负责热更新
// - webpack.NameModulesPlugin --------------> 打印更新模块的路径
// - devServer 中设置 hot: true
// if (module.hot) {
//   module.hot.accept("./main.js", () => {
//     require("./main");
//   });
// }

module.exports = {
  // 1
  // mode
  // 指定 浏览器环境中的环境变量，即不同的module模块中访问到
  // - mode用来指定 webpack.DefinePlugin 中 process.env.NODE_ENV 的值，这样就能在浏览器环境中访问到，即module模块中访问到
  // - 除了在 webpack.config.js 配置文件中使用，还可以通过 package.json 中的 scripts 标签来执行webpack命令，比如 webpack --mode=development
  // - mode指定的值，mode的值将会作为 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('mode的值')})，从而能在浏览器环境中访问NODE_ENV，即module中访问

  // 2
  // 浏览器和node环境，都可以通过 ( process.env.环境变量名 ) 来访问环境变量

  // 3
  // 浏览器中的环境变量有多少种指定的方式 ( 两种 )
  // - mode 指定
  // - webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify('NODE_ENV的值') })

  mode: process.env.NODE_ENV,

  entry: {
    main: path.resolve(__dirname, "../examples/index.js"), // __dirname表示当前的文件所在的目录，即 webpack.config.js 文件所在的文件夹
  },
  // 真正打包 output npm 相关的配置文件在：webpack.config.prod.js
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  // devtool
  // eval-source-map：不产生source-map文件，但是调试时会显示行数
  // source-map：产生source-map文件，显示行列信息
  devtool: "eval-source-map",
  devServer: {
    static: {
      // 静态资源从之前的 contentBase 改成 static
      // path.resolve()生成一个绝对路径，__dirname返回当前代码所在的文件夹
      // 这里static.directory 表示将dist文件夹中的文件打包起一个服务
      directory: path.resolve(__dirname, "../dist"),
    },
    port: 7777,
    compress: true,
    hot: true,
  },
  // resolve
  // resolve.alias 取别名
  // resolve.extensions 当import省略后缀时，先找.js文件，再找.css文件
  resolve: {
    alias: {
      "@image": path.resolve(__dirname, "../examples"), // @image === 根/examples/
    },
    extensions: [".js", ".css", ".less", "*"],
    // ------------------------------------------------- import时省略后缀时，先找.js文件，再找.css文件
    // ------------------------------------------------- 注意：'*' 表示所有类型的文件
  },
  module: {
    noParse: /jquery|lodash/, // ------ module.noParse 不去解析jquery或lodash的依赖关系，因为它们俩都没有依赖其他库，从而提高构建速度
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            // extractCSS: true, // 单独抽离css
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env"]],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器语法
                ["@babel/plugin-proposal-class-properties"], // 支持 class
                // proposal 是提案的意思
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {},
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false, //“[object Module]”问题
              outputPath: "img/", // 将图片资源打包到img文件夹中
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "8-divine",
      template: "public/index.html", // 注意这里的路径问题
      filename: "index.html",
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      NAME: JSON.stringify('"woow_wu7"'),
      "process.env.HOST_ENV": JSON.stringify(process.env.HOST_ENV),
    }),
    // new webpack.NameModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    moduleIds: "named",
  },
};
