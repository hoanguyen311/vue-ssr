const path = require('path');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          },
          extractCSS: isProd
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.scss$/,
        use: isProd
        ? [ExtractTextPlugin.loader, 'css-loader', 'sass-loader']
        : ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: isProd
          ? [ExtractTextPlugin.loader, 'css-loader']
          : ['vue-style-loader', 'css-loader']
      },
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  mode: 'development',
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
          filename: '[name].[chunkhash].css'
        }),
        new FriendlyErrorsPlugin()
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]
};
