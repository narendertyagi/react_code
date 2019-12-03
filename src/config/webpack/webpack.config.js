var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

// console.log(__dirname)
var browserConfig = {
    mode: 'development',
    devtool: "source-map",
    // entry: path.resolve(__dirname, '../../www/browser.js'),
    entry: {
        main: [path.resolve(__dirname, '../../www/browser.js')],
        // vendor: ['react', 'react-dom', 'react-router-dom', 'axios'],
        // antd: ['antd']
    },
    output: {
        path: path.resolve(__dirname, '../../../public/dist'),
        // filename: 'bundle.js',
        // publicPath: '/'
        publicPath: '/dist/',
        filename: '[name].js'
    },
    optimization: {
        minimizer: [
            // https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                extractComments: false,
                uglifyOptions: {
                  compress: true,
                  ecma: 6,
                  mangle: true,
                  output: {
                    comments: false
                    }
                },
                sourceMap: true
              })
        ],

        runtimeChunk: true,
 
        minimize: true,

        splitChunks: {
            // minChunks: 1,
            cacheGroups: {
                
                // if you have to export particular module separately then enable module under Entry array and uncommet below code also

                // antd: {
                //     test: 'antd',
                //     name: "antd",
                //     enforce: true,
                // },
              

                vendor: {
                    test: path.resolve(__dirname, "../../../node_modules/"),
                    chunks: "initial",
                    name: "vendor",
                    priority: -10,
                    enforce: true,
                    reuseExistingChunk: true,
                },

                
                // If enabled then it will merge all the async chungs into one all.js and include all.js file before main.js script tag in server_static.js
                // default: {
                //     chunks: "async",
                //     name: "all",
                //     priority: -12,
                //     enforce: true,
                //     reuseExistingChunk: true,
                // },
                
               
            }
        }
    },

    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/, // add this line
            use: 'babel-loader'
        }, ]
    },
    plugins: [
        // new webpack.optimize.LimitChunkCountPlugin({
        //     maxChunks: 5
        // }),

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),

        // new CompressionPlugin()
    ]
}

var cssConfig = {
    mode: 'development',
    target: 'node',
    entry: {
        vendor: path.resolve(__dirname, '../../assets/index.js'),
        style: path.resolve(__dirname, '../../assets/scss/index.scss'),
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


module.exports = [browserConfig]