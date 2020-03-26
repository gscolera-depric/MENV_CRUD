const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const express = require('express');
let nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

const dist = path.resolve(__dirname, "../www");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: dist,
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals({
    whitelist: [/^[a-z\-0-9]+$/]
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/swagger.yaml'), to: dist }
    ])
  ]
}