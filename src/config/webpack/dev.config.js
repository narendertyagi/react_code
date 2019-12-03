var path = require('path')
var webpack = require('webpack')
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

const cjsConfig = require('./cjs1.config.js');

var config = {
    optimization: {
        runtimeChunk: true,
        minimize: false,
        splitChunks: {
            cacheGroups: {
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

            use: [{
                loader: 'babel-loader',
                options: {
                // babelrcRoots: ['.', './src'],
                  presets: [
                    ["@babel/preset-env", {
                        modules: 'umd'
                    }],
                    "@babel/preset-react",
                    // "@babel/preset-stage-0",
                  ],
                  plugins: [
                    // Stage 0
                    require('babel-plugin-add-module-exports'),
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-proposal-function-bind",
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose": true }],
                    "@babel/plugin-syntax-dynamic-import",
                    // "@babel/plugin-transform-classes",
                    // require('babel-plugin-transform-object-rest-spread'),
                    require('babel-plugin-transform-do-expressions'),

                    // DISABLE CODE SPLITTING https://gist.github.com/jcenturion/892c718abce234243a156255f8f52468
                    'dynamic-import-webpack',
                    'remove-webpack'
                  ]
                }
            }]
        }, ]
    },
}

const devConfig = merge(baseConfig, config)

module.exports = [cjsConfig, devConfig]