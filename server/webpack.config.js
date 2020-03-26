const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../www"),
    filename: 'server.js'
  },
  target: 'node',
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}