/*
 * @Description:
 * @Date: 2022-06-09 15:11:51
 * @LastEditors: ranqi
 * @LastEditTime: 2022-11-07 11:34:06
 */
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}

console.log(process.env.NODE_ENV);
// vue.config.js
const vueConfig = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // publicPath: './',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const plugns = [
        new FileManagerPlugin({
          onEnd: {
            delete: ['./dist.zip'],
            archive: [
              {
                source: './dist',
                destination: './dist.zip'
              }
            ]
          }
        })
      ]
      config.plugins.push(...plugns)
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  devServer: {
    hot: true,
    open: false,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://20.20.129.168:8080/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/internet'
        }
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: undefined
}

module.exports = vueConfig
