const webpack = require("webpack");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
  // Put your normal webpack config below here
  target: 'electron-main',
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new webpack.ExternalsPlugin("commonjs", ['active-win']),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  },
};
