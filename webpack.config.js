// __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
// path是node.js中提供的处理文件路径的小工具。 (http://www.runoob.com/nodejs/nodejs-path-module.html)
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  { CleanWebpackPlugin }  = require('clean-webpack-plugin');
module.exports = {
	mode : 'development',
    // 项目入口，webpack从此处开始构建
    entry: {
        bundle: path.resolve(__dirname, './src/main.js'),
        //添加要打包在vendor里面的库
        vendors: ['react','react-dom','react-router'],
    },
    output: {
	    path: path.resolve(__dirname, "./build"),
	    filename: "js/[name]-[hash]" + ".js",
	    chunkFilename: "js/[name]-[hash]" + ".js",
	},
    devServer: {
	    port: 8083,
	    host: '127.0.0.1',
        hot: true,
	},
    module: {
        rules: [
			{
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
	    ]
	},
	performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
    },
    plugins: [
        new webpack.DefinePlugin({//设置成production去除警告
            'process.env':{
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/common.html',
            filename: 'index.html', 
            inject: 'body' ,
            minify: {
                removeComments: true,    //移除HTML中的注释
            //    collapseWhitespace: true,    //删除空白符与换行符
              }
        }),
        new CleanWebpackPlugin(),
    ],
}
