import path from 'path';
import webpack from 'webpack';
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
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    './client/main',
  ],
  output: {
    path: path.join(root, 'build/client'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot?sourceMap', 'babel?sourceMap'],
      include: [
        path.join(root, 'client'),
        path.join(root, 'common'),
      ],
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: root + '/client/index.html',
    }),
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
      SOCKET_PORT: '"3001"',
    }),
  ],
};

