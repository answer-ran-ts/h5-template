/*
 * @Description:
 * @Date: 2022-06-09 15:11:51
 * @LastEditors: ranqi
 * @LastEditTime: 2022-11-07 11:34:06
 */
const packageName = 'dist'
const path = require('path')
// 自动生成压缩包
const FileManagerPlugin = require('filemanager-webpack-plugin')
// 打包分析报告
const webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 开启Gzip压缩
const compressionPlugin = require("compression-webpack-plugin");
// 编译时长获取
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// 
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// 代码丑化
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
const vueConfig = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // publicPath: './',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const plugns = [
        new FileManagerPlugin({
          events: {
            onEnd: {
              delete: [ // 首先需要删除项目根目录下的dist.zip
                `./${packageName}.zip`
              ],
              archive: [ // 选择文件夹将之打包成xxx.zip并放在根目录
                { source: `./${packageName}`, destination: `./${packageName}.zip` }
              ]
            }
          }
        }),
        new compressionPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8,//压缩比
          deleteOriginalAssets: false // 不能删除源文件，不然报错"Uncaught SyntaxError: Unexpected token <"
        }),
        new webpackBundleAnalyzer(),
        new SpeedMeasurePlugin(),
        new UglifyJsPlugin(),
        // new HardSourceWebpackPlugin({
        //   root: process.cwd(),
        //   directories: [],
        //   environmentHash: {
        //     root: process.cwd(),
        //     directories: [],
        //     // 配置了files 的主要原因是解决配置更新，cache 不生效了的问题
        //     // 配置后有包的变化，plugin 会重新构建一部分 cache
        //     files: ['package.json']
        //   }
        // }),
      ]
      config.plugins.push(...plugns)
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }

    } else {
      config.optimization = {
        nodeEnv: false
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))
    config.modules
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
  lintOnSave: process.env.NODE_ENV !== 'production'
}

module.exports = vueConfig
