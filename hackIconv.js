/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const iconvPath = path.resolve(__dirname, './node_modules/iconv/lib/iconv.js')


console.log('正在修改:', iconvPath)

/**
 * 一个hack, 在执行electron-rebuild时不知道为什么会把catch块里的Debug引用也会执行一遍，但是编译的时候只编译了Release版本
 */
const c = fs.readFileSync(iconvPath);
fs.writeFileSync(iconvPath, String(c).replace('build/Debug/iconv.node', 'build/Release/iconv.node'))

console.log('修改iconv代码完毕')
