const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
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
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties"],
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
  optimization: {
    moduleIds: "named",
  },
};
