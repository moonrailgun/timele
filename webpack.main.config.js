// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const path = require('path');

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
  // externals: {
  //   'active-win': 'active-win',
  // },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.node']
  },
  plugins: [
    {
      apply(compiler) {
        compiler.hooks.done.tap('done', () =>{
          console.log('编译完成')
          const binpath = path.resolve(__dirname, './.webpack/main/native_modules/main')
          const exists =fs.existsSync(binpath);
          if(exists) {
            console.log('给检查文件授权')
            fs.chmodSync(binpath, '744');
          }
        })
      }
    }
  ]
};
