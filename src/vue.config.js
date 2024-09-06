const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vuetify')
      .test(/vuetify\.min\.css$/)
      .use('css-loader')
      .loader('css-loader')
      .end();

    config.module
      .rule('css')
      .test(/\.css$/)
      .use('css-loader')
      .loader('css-loader')
      .end();

    config.module
      .rule('scss')
      .test(/\.scss$/)
      .use('sass-loader')
      .loader('sass-loader')
      .end();
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
  },
  transpileDependencies: [
    'vuetify'
  ]
};
