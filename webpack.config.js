const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader',
        {
          loader: 'style-resources-loader',
          options: {
            patterns: path.resolve(__dirname, './src/style/common.less')
          }
        }
      ]
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true,
      },
    }
  }
};