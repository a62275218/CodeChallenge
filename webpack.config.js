const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            react: path.resolve('node_modules', 'react'),
        }
    },
    module: {
        rules: [{
            test: /\.less$/,
            use:[
                'style-loader',
                'css-loader',
                'less-loader',
                {
                    loader:'style-resources-loader',
                    options: {
                        patterns: path.resolve(__dirname, './src/style/common.less')
                    }
                }
            ]
        }, {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};