const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "development",
  devtool: "inline-source-map",
  // @ts-expect-error
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          { 
            loader: 'simple-pug-loader',
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          { 
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/images/[name][[hash]][ext][query]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/fonts/[name][[hash]][ext][query]"
        }
      },
    ]
  },
}

module.exports = merge(common, config);