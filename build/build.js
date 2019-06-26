'use strict'
//版本检查 node的版本号  版本有要求"engines": {"node": ">= 4.0.0","npm": ">= 3.0.0"}
//立即执行
require('./check-versions')()
process.env.NODE_ENV = 'production'//process是node中的global全局对象的属性，process是node中的全局变量，env设置环境变量
const isAdmin = process.env.NODE_ENV_TYPE === 'admin'
const ora = require('ora')//ora是一个命令行转圈圈动画插件，好看用的
const rm = require('rimraf')// rimraf插件是用来执行UNIX命令rm和-rf的用来删除文件夹和文件，清空旧的文件
const path = require('path')// node.js路径模块 连接路径
const chalk = require('chalk')//chalk插件，用来在命令行中输入不同颜色的文字
const webpack = require('webpack')// 引入webpack模块使用内置插件和webpack方法

// const config = require('../config')//commonJs风格，引入文件模块，引入模块分为内置模块与文件模块两种
const webpackConfig = require('./webpack.prod.conf')
// 指定删除的文件
const rmFile = path.resolve(__dirname,`../dist/${isAdmin ? 'admin':'client'}static`)
const spinner = ora('building for production...')// 开启转圈圈动画
spinner.start()
// 调用rm方法，第一个参数的结果就是 绝对/工程名/dist/static，表示删除这个路径下面的所有文件
rm(rmFile, err => {
  if (err) throw err// 如果删除的过程中出现错误，就抛出这个错误，同时程序终止
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    // 没有错误，就执行webpack编译
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
