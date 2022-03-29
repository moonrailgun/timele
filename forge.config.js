/* eslint-disable @typescript-eslint/no-var-requires */
const {
  utils: { fromBuildIdentifier },
} = require('@electron-forge/core');
const path = require('path')

// Reference: https://www.electronforge.io/configuration
module.exports = {
  packagerConfig: {
    extraResource: [
      path.resolve(__dirname, './resource'),
    ],
    appBundleId: fromBuildIdentifier({
      beta: 'com.moonrailgun.timele',
      prod: 'com.moonrailgun.beta.timele',
    }),
    // icon: path.resolve(__dirname, './build/icon'),
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'timele',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          nodeIntegration: true,
          entryPoints: [
            {
              html: './src/render/index.html',
              js: './src/render/renderer.ts',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
};
