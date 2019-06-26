
const path = require('path')//node.js的模块路径

module.exports = {
    client:{
      dev: {
        env: 'development',
        assetsPublicPath: '/',
        host: 'localhost',
        port: 8080,
        assetsSubDirectory: 'static',
        devtool: 'cheap-module-eval-source-map',
        proxyTable: {//proxy代理
            '/api':{ //vue-cli使用这个功能是借助http-proxy-middleware插件，一般解决跨域请求api
                target:'http://localhost:3000',
                changeOrigin: true,//指示是否跨域
                pathRewrite: {
                  '^/api': '/'
                }
            },
        }, 
        autoOpenBrowser: true,//浏览器
        errorOverlay: true,////浏览器错误提示
        notifyOnErrors: true,//跨平台错误提示
        poll: false,//使用文件系统(file system)获取文件改动的通知devServer.watchOptions
        cacheBusting: true,//缓存破解
        cssSourceMap: true // 是否开启 cssSourceMap代码压缩后进行调bug定位将非常困难，于是引入sourcemap记录压缩前后的位置信息记录，当产生错误时直接定位到未压缩前的位置，将大大的方便我们调试
      },
      build: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/client/',
        index: path.resolve(__dirname, '../dist/client/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/client'),
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report// 下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
      }
    },
    admin:{
       dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {//proxy代理
          '/api':{ //vue-cli使用这个功能是借助http-proxy-middleware插件，一般解决跨域请求api
              target:'http://localhost:3000',
              changeOrigin: true,//指示是否跨域
              pathRewrite: {
                '^/api': '/'
              }
          },
        }, 
        host: 'localhost',
        port: 8090,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true
      },

      build: {
        index: path.resolve(__dirname, '../dist/admin/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/admin'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/admin/',
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
      } 
    }
}
