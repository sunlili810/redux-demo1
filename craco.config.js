const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  eslint: {
    enable: false /* (default value) */
    // mode: "extends" /* (default value) */ || "file",
    // configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
    // configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
    // pluginOptions: { /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */ },
    // pluginOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
  },
  babel: {
    plugins: [
      // [
      //   'import',
      //   {
      //     libraryName: 'antd',
      //     style: true
      //   }
      // ],
      ['@babel/plugin-proposal-decorators', { legacy: true }] // MobX
    ]
  },
  webpack: {
    alias: {
      components: path.join(__dirname, './src/components'),
      images: path.join(__dirname, './src/res/images'),
      medias: path.join(__dirname, './src/res/media'),
      iconfonts: path.join(__dirname, './src/res/iconfont'),
      // media: path.join(__dirname, '../res/media'),
      pages: path.join(__dirname, './src/pages'),
      localData: path.join(__dirname, './src/testdata/localdata'),
      mockData: path.join(__dirname, './src/testdata/mockdata'),
      util: path.join(__dirname, './src/utils'),
      store: path.join(__dirname, './src/store')
    },
    // plugins: {
    //   add: [], /* An array of plugins */
    //   remove: [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */
    // },
    // configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
    // configure: (webpackConfig, { env, paths }) => webpackConfig
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1581BF',
              '@layout-footer-background': '#252d3a',
              '@layout-trigger-background': '#fff',
              '@layout-trigger-color': '#252d3a',
              '@layout-sider-background': '#252d3a'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
