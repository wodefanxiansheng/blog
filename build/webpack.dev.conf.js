'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')//webpack基础配置
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')//一个创建html入口文件的webpack插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')//一个编译提示的webpack插件！
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// 判断是client还是admin
const isAdmin = process.env.NODE_ENV_TYPE === 'admin'
const devConf = isAdmin ? require('../config').admin.dev : require('../config').client.dev //开发环境配置参数
// 拼接路径
const resolve = function (dir) {
    return path.join(__dirname, '..', dir)
}
// 资源路径
const assetsPath = function (dir) {
    return path.posix.join(devConf.assetsSubDirectory, dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  output: {
    filename: '[name]-[hash].js',// 打包生成app.js文件
    publicPath:devConf.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: devConf.cssSourceMap, usePostCSS: true }) //自动生成了css,postcss,less等规则，并进行模块转换，转换成webpack可识别的文件，进行解析转换
  },
  devtool: devConf.devtool,//生成sourceMaps(方便调试)
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    hot: true,// 热加载
    inline: true, //自动刷新
    open: true,//自动打开浏览器
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,//为你的代码进行压缩。加快开发流程和优化的作用
    host: HOST || devConf.host,//主机名
    port: PORT || devConf.port,//端口号
    overlay: devConf.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: devConf.assetsPublicPath,
    proxy: devConf.proxyTable,
    quiet: false, //终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
    watchOptions: {
      poll: devConf.poll,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//开启HMR(热替换功能,替换更新部分,不重载页面！)
    new webpack.NamedModulesPlugin(), //显示模块相对路径 HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),//在编译时出现错误时，使用跳过发射阶段。这可确保不会发出包含错误的资产
    //配置html入口信息
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template:(isAdmin ? 'project/admin/index.html' : 'project/client/index.html'),
      inject: true,
      favicon:(isAdmin ? 'project/admin/src/assets/img/favicon.ico':'project/client/src/assets/img/favicon.ico'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: devConf.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = devWebpackConfig;