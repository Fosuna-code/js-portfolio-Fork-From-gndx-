const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].[contenthash].js",
        clean: true
    },
    mode: 'production',
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
                    filename: "assets/fonts/[name].[contenthash].[ext]"
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
            filename: './index.[contenthash].html'
        }),
        new MiniCssExtractPlugin({
            filename: './styles/[name].[contenthash].css'
        }),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images/[name].[contenthash].[ext]"
                }
            ]
        }),
        new Dotenv()
    ],
    optimization:{
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin({
                  minify: HtmlMinimizerPlugin.swcMinify,
                  minimizerOptions: {}
                })
        ]
    }
}
