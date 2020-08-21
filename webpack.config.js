const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  devServer: {
    proxy: {
      '/api/*' : 'http://77.120.241.80:8911'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(s*)css$/,
        use: [
          "style-loader", {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/'
            }
          },
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    })
  ]
};
