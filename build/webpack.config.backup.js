const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV, // 这里的值在 package.json 中的 scripts 中的打包命令中通过 cross-env 来指定了
  target: "web",
  entry: path.resolve(__dirname, "../index.js"), // 入口文件就是根目录下的 index.js
  output: {
    path: path.resolve(process.cwd(), "dist-prod"), // 等价于 path: path.resolve(__dirname, "dist-prod"),
    // 1
    // process.cwd() ---> 返回 Node.js 进程的当前工作目录，即执行命令的文件所在的文件夹，这里命令是在 package.json文件中执行的，所在的文件夹是 8-divine
    // __dirname -------> 返回 源代码所在的目录文件夹，这里源代码文件就是webpack.config.prod.js，所在文件夹就是build，

    filename: "8divine.js",
    library: {
      name: "8divine", // 配置导出库的名称，如使用require引入，这里就是require("8divine")
      type: "umd", // 配置将库暴露的方式，即配置以何种方式导出库，注意 该属性用来代替下面的 libraryTarget，以后webpack可能移除对 libraryTarget 的支持
      // type: "var", // var表示：让你的库加载之后，入口起点的返回值 将会被赋值给一个变量
      umdNamedDefine: true, // 当使用 output.library.type: "umd" 时，将 output.library.umdNamedDefine 设置为 true 将会把 AMD 模块命名为 UMD 构建。否则使用匿名 define
    },
    // libraryTarget: "umd", // 配置以何种方式导出库 ---> 将被 output.library.type 代替
    // umdNamedDefine: true, // ---------------------> 将被 output.library.umdNamedDefine 代替，当使用 libraryTarget: "umd" 时，设置 output.umdNamedDefine 为 true 将命名由 UMD 构建的 AMD 模块。否则将使用一个匿名的 define。
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
            // preserveWhitespace boolean
            // false ---> 如果设置为 false，则标签之间的空格会被忽略；这能够略微提升一点性能但是可能会影响到内联元素的布局
            // true ----> 这意味着编译好的渲染函数会保留所有 HTML 标签之间的空格
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false, //“[object Module]”问题
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      // favicon: "./public/favicon.ico",
      template: "public/index.html",
      filename: "index.html",
      inject: true,
    }),
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    moduleIds: "named",
  },
};
