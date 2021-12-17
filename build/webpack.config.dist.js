const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV, // 这里的值在 package.json 中的 scripts 中的打包命令中通过 cross-env 来指定了
  target: "web",
  entry: path.resolve(__dirname, "../index.js"),
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "bundle.js",
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