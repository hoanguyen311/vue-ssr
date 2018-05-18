const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./base');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const config = merge(baseConfig, {
  entry: {
    main: ['babel-polyfill', path.resolve(__dirname, '../src/index.server.js')]
  },
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': JSON.stringify('server'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});

module.exports = config;
