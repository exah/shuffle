import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const root = __dirname.slice(0, -7);
console.log('Root folder is', root);

// PostCSS plugins:
import postcssImports from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssVariables from 'postcss-advanced-variables';
import postcssCalc from 'postcss-calc';
import autoprefixer from 'autoprefixer';
import rucksack from 'rucksack-css';
import cssnano from 'cssnano';

export default {
  debug: false,
  cache: false,
  entry: [
    './client/main',
  ],
  output: {
    path: path.join(root, 'build/static'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(root, 'client'),
        path.join(root, 'common'),
      ],
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
      include: [
        path.join(root, 'client'),
      ],
    }],
  },
  postcss: () => [
    postcssImports({
      glob: true,
    }),
    postcssNested(),
    autoprefixer(),
    postcssVariables(),
    postcssCalc(),
    rucksack(),
    cssnano(),
  ],
  resolve: {
    alias: {
      'actions': path.join(root, 'client/actions.js'),
    },
    modulesDirectories: [
      'node_modules',
      path.join(root, 'client'),
      path.join(root, 'common'),
    ],
    extensions: ['', '.js', '.jsx', '.json', '.css'],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      filename: 'index.html',
      template: root + '/client/index.html',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
      sourceMap: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: '"production"',
      SOCKET_PORT: '"8080"',
    }),
  ],
};

