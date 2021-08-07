# timele

时间都去哪儿了？

## 编译问题

- 如果出现
  ```
  UnhandledPromiseRejectionWarning: Error: The module 'xxxxxxxxxxxxxxx'
  was compiled against a different Node.js version using
  NODE_MODULE_VERSION 83. This version of Node.js requires
  NODE_MODULE_VERSION 89. Please try re-compiling or re-installing
  the module (for instance, using `npm rebuild` or `npm install`).
  ```

  请执行`npx electron-rebuild`
