var path = require('path')
var webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./base.config.js');

var config = {
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
            cacheGroups: {
                vendor: {
                    test: path.resolve(__dirname, "../../../node_modules/"),
                    chunks: "initial",
                    name: "vendor",
                    priority: -10,
                    enforce: true,
                    reuseExistingChunk: true,
                }
            }
        }
    },
}

const devConfig = merge(baseConfig, config)

module.exports = devConfig