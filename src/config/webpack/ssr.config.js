var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        filename: '[name].js',
    },
    optimization: {
        runtimeChunk: true,
 
        minimize: false,

        splitChunks: {
            // minChunks: 1,
            cacheGroups: {
                // commons: {
                //     chunks: "initial",
                //     minChunks: 0,
                //     maxInitialRequests: 5, // The default limit is too small to showcase the effect
                //     minSize: 0 // This is example is too small to create commons chunks
                // },
                // antd: {
                //     test: 'antd',
                //     name: "antd",
                //     enforce: true,
                // },
                // async: {
                //     test: path.resolve(__dirname, "../../../node_modules/"),
                //     chunks: "async",
                //     name: "async",
                //     priority: -10,
                //     enforce: true,
                //     reuseExistingChunk: true,
                // },
                vendor: {
                    test: path.resolve(__dirname, "../../../node_modules/"),
                    chunks: "initial",
                    name: "vendor",
                    priority: -10,
                    enforce: true,
                    reuseExistingChunk: true,
                },

               
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
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        })
    ]
}

var serverConfig = {
    mode: 'development',
    entry: path.resolve(__dirname, '../../www/server.js'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, '../../../'),
        filename: 'server.js',
        publicPath: '/'
    },

      
    module: {
        rules: [{
            test: /\.(js)$/,
            use: 'babel-loader',
            exclude: /node_modules/, // add this line
        }]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
          }),
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        })
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


// module.exports = [cssConfig]
module.exports = [browserConfig, serverConfig]