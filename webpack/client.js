const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  entry: {
    main: ['babel-polyfill', path.resolve(__dirname, '../src/index.client.js')]
  },
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity
    }
  },
  plugins: [
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': JSON.stringify('client'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});
