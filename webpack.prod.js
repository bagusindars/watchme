/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  plugins: [
    new MiniCssExtraPlugin(),
    new TerserPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtraPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
});
