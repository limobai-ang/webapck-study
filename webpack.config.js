// 引入path模块
const path = require('path')

// 导入一个HTMML插件 得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 创建一个HtmlPlugin的实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html',  // 指定源文件的存放路径
    filename: './index.html'  // 指定生成文件的存放路径
})

// 按需导入插件，得到插件的构造函数之后，创建插件的实例对象
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 将创建的实例对象 挂载到plugins节点中
const cleanPlugin = new CleanWebpackPlugin()

// 使用Node.js的导出语法，向外导出一个webpack配置对象
module.exports = {
    // 代表webpack的开发模式，有两个值development和production。development代表开发模式；development代表生产模式，能够对代码进行压缩
    mode: "development",
    // 此选项生成的source-map能够保证运行时报错的行数与源码行数保持一致
    devtool: 'nosources-source-map',
    // entry 要处理的哪个文件
    entry: path.join(__dirname, './src/index.js'),

    // 指定生成的文件要存放在哪里
    output: {
        // 存放的目录
        path: path.join(__dirname, 'dist'),
        // 生成的文件名  ( 明确的告诉webpack 把生成的js文件放在dist目录下的js子目录中 )
        filename: 'js/main.js'
    },
    plugins: [htmlPlugin, cleanPlugin], // 通过配置plugins节点，使htmlPlugin插件生效

    // 以通过 devServer 节点对 webpack-dev-server 插件进行更多的配置
    devServer: {
        open: true,  // 初次打包完成后自动打开浏览器
        host: 'localhost',  // 实时打包所用的打包地址
        port: 80  // 实时打包所用的端口号
    },

    // 所有第三方模块的匹配规则
    module: {
        // 文件后缀名的匹配
        rules: [
            // 处理css文件
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 处理样式表中与 url 路径相关的文件
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        // 如果有多个loader需要指定为数组
                        loader: 'url-loader',
                        options: {
                            limit: 200000,
                            // 明确指定把打包生成的图片文件，储存到dist目录下的image文件夹中
                            outputPath: 'image'
                        }
                    }
                ]
            },
            // 处理js中的高级语法
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: [
                    //         ['@babel/preset-env', { targets: "defaults" }]
                    //     ]
                    // }
                }
            }
        ]
    },

    // 配置@为src目录路径，在webpack中使用
    resolve: {
        alias: {
            // 告诉webpack程序员写的@代表src底层目录
            '@': path.join(__dirname, './src/')
        }
    }

}