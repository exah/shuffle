import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import compression from 'compression';

import { transform } from 'babel-core';
transform('code', {
  plugins: ['node-env-inline'],
});

import config from '../config';
import dataServer from './transport';

// --- DATA SERVER

mongoose.connect(config.dbHost, (err) => {
  if (err) {
    throw new Error('db connection error!');
  }
  dataServer(config.socketPort);
});

// --- STATIC FILE  SERVER

if (config.hotReload) {
  // --- DEV HOT RELOAD SERVER
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackDevConfig = require('../config/webpack.dev');

  const fileServer = new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunkModules: false,
    },
  });

  fileServer.use('/', express.static(__dirname + '/../static'));
  fileServer.listen(config.httpPort, () => {
    console.log('FIle and hot reload server listening on *:' + config.httpPort);
  });
  fileServer.use('/enviroment.js', (req, res) => res.send());
  fileServer.use('/ava/', express.static(__dirname + '/userGenerator/images'));
} else {
  const app = express();
  const httpServer = new http.Server(app);
  const historyFallback = require('connect-history-api-fallback');

  app.use(historyFallback());
  app.use(compression());

  // --- PROD FILE SERVER
  app.use('/', express.static(__dirname + '/../static'));

  app.use('/enviroment.js', (req, res) => {
    res.send(`
      window.ENVIROMENT_SOCKET_PORT = ${config.socketPort};
    `);
  });

  app.use('/ava/', express.static(__dirname + '/userGenerator/images'));

  httpServer.listen(config.httpPort, () => {
    console.log('File server listening on *:' + config.httpPort);
  });
}
