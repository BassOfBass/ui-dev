const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  entry: {
    index: "./src/scripts/index.js",
  },
  plugins: [
    // @ts-expect-error
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "styles/[id].[contenthash].css"
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: "./src/templates/index.pug",
      chunks: ['index'],
    }),
  ],
  resolve: {
    alias: {
      scripts: path.resolve(__dirname, "src/scripts"),
      styles: path.resolve(__dirname, "src/styles"),
      components: path.resolve(__dirname, "src/components")
    },
  },
  output: {
    filename: "scripts/[name][[contenthash]].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: '/',
    assetModuleFilename: "assets/[name]-[[hash]][ext][query]"
  },
}

module.exports = config;