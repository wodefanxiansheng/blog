'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const isAdmin = process.env.NODE_ENV_TYPE === 'admin'
const prodConf = isAdmin ? require('../config').admin.build : require('../config').client.build
const merge = require('webpack-merge')//合并
const baseWebpackConfig = require('./webpack.base.conf')//基本配置

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')//环境
// 资源路径
const assetsPath = function (dir) {
    return path.posix.join(prodConf.assetsSubDirectory, dir)
}

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: '#source-map',
  output: {
    path: path.resolve(__dirname, `../dist/${isAdmin ? 'admin' : 'client'}`),
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    //开发环境配置
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩js代码
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: prodConf.productionSourceMap,
      parallel: true
    }),
    // 抽离css
    new ExtractTextPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
    // 压缩css
    new OptimizeCSSPlugin({
      cssProcessorOptions: prodConf.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // html配置
    new HtmlWebpackPlugin({
      filename: (isAdmin ? path.resolve(__dirname, '../dist/admin/index.html') : path.resolve(__dirname, '../dist/client/index.html')),
      template: (isAdmin ? 'project/admin/index.html' : 'project/client/index.html'),
      favicon:(isAdmin ? 'project/admin/src/assets/img/favicon.ico':'project/client/src/assets/img/favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    //根据模块相对路径生成四位数hash值作为模块id
    new webpack.HashedModuleIdsPlugin(),
    //作用域提升,提升代码在浏览器执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 第三方库chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    //将整个文件复制到构建输出指定目录下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: prodConf.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
//是否开启Gzip压缩
if (prodConf.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        prodConf.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (prodConf.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
