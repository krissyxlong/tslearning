const path = require('path')

module.exports = {
    //默认是production，打包的文件默认被压缩。开发时可以设置为development，不被压缩
    mode:'production',
    //打包项目的入口文件
    entry: './src/index.js',
    //打包项目的输出文件
    output: {
        //自定义打包输出文件名
        filename:'bundle.js',
        //输出文件的绝对路径
        path: path.resolve(__dirname,'bundle')
    }
}
