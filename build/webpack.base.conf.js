
const path = require('path')
const isAdmin = process.env.NODE_ENV_TYPE === 'admin'
const prodConf = isAdmin ? require('../config').admin.build : require('../config').client.build
const vueLoaderConfig = require('./vue-loader.conf')
// 拼接路径
const resolve =  function(dir) {
  return path.join(__dirname, '..', dir)//path.join只是简单的将该路径片段进行拼接
}
// 资源路径
const assetsPath = function(dir) {//以posix兼容的方式交互
    return path.posix.join(prodConf.assetsSubDirectory, dir)
}
// webpack的基本配置
module.exports = {
  entry: {//项目入口文件
    app:[isAdmin ? resolve('project/admin/src/main.js') : resolve('project/client/src/main.js'),'babel-polyfill']
  },
  resolve: {//配置模块如何被解析
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': (isAdmin ? resolve('project/admin/src') : resolve('project/client/src')),
      'src': (isAdmin ? resolve('project/admin/src') : resolve('project/client/src')),
      'components': (isAdmin ? resolve('project/admin/src/components') : resolve('project/client/src/components')),
      'assets': (isAdmin ? resolve('project/admin/src/assets') : resolve('project/client/src/assets')),
      'views': (isAdmin ? resolve('project/admin/src/views') : resolve('project/client/src/views')),
      'store': (isAdmin ? resolve('project/admin/src/store') : resolve('project/client/src/store')),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: isAdmin ? resolve("project/admin/src") : resolve("project/client/src"),
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: isAdmin ? resolve("project/admin/src") : resolve("project/client/src")
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude:[resolve('project/admin/src/icons')],
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('project/admin/src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
