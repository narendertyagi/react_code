var path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const env = process.env.NODE_ENV

var cssConfig = {
    mode: 'development',
    target: 'node',
    entry: {
        css_mmarket_vendor: path.resolve(__dirname, '../../module/market/assets/index.js'),
        css_mmarket_main: path.resolve(__dirname, '../../module/market/assets/scss/index.scss'),
        css_madmin_vendor: path.resolve(__dirname, '../../module/admin/assets/index.js'),
        css_madmin_main: path.resolve(__dirname, '../../module/admin/assets/scss/index.scss'),
        css_mseller_vendor: path.resolve(__dirname, '../../module/seller/assets/index.js'),
        css_mseller_main: path.resolve(__dirname, '../../module/seller/assets/scss/index.scss'),
    },
    output: {
        path: path.resolve(__dirname, '../../../public/dist'),
        filename: '[name].js',
    },

    module: {

        rules: [

            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: "url-loader?limit=1000",
            },
            {
                test: /\.(woff|woff2|eot|otf|ttf|svg)$/,
                use: "file-loader",
            },

            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            //  minimize: false || {
                            //     discardComments: {
                            //         removeAll: true,
                            //     },
                            // }
                        }
                    },
                    // 'css-loader',
                    "sass-loader",
                    // "postcss-loader"
                    // { loader: "resolve-url-loader", options: { sourceMap: true } },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(__dirname, 'postcss.config.js'),
                            },
                            sourceMap: true,
                            // plugins: [
                            //   require('cssnano')(),
                            // ]
                        }
                    },
                ]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
    ]
}


module.exports = cssConfig