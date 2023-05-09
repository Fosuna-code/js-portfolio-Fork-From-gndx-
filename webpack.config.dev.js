const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].[contenthash].dev.js"
    },
    mode:'development',
    resolve: {
        extensions: [".js"],
        alias: {
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
            '@fonts': path.resolve(__dirname,'src/assets/fonts/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader:"babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2)$/,
                type:"asset/resource",
                generator: {
                    filename: "assets/fonts/[name].[contenthash].dev.[ext]"
                },
                parser: {
                    dataUrlCondition: {
                      maxSize: 10 * 1024, //limit 10kb
                    },
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject:true,
            template: './public/index.html',
            filename: './index.[contenthash].dev.html'
        }),
        new MiniCssExtractPlugin({
            filename: './styles/[name].[contenthash].dev.css'
        }),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images/[name].[contenthash].dev.[ext]"
                }
            ]
        }),
        new Dotenv()
    ],
    devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 8080,
		open: true,
	}
}
