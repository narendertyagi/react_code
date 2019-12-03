var path = require('path')
var webpack = require('webpack')
const merge = require('webpack-merge');
// const baseConfig = require('./base.config.js');

var path = require('path')
var webpack = require('webpack')
const env = process.env.NODE_ENV


var config = {
    mode: 'development',
    target: 'node',
    entry: path.resolve(__dirname, '../../www/browser.js'),
    entry: {
        main: [path.resolve(__dirname, '../../www/browser.js')],
        m_default: path.resolve(__dirname, '../../module/default/index.js')
    },

    output: {
        path: path.resolve(__dirname, '../../../public/dist'),
        filename: '[name].cjs.js',
        libraryTarget: "commonjs2",
        libraryExport: 'default'
    },

    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/, // add this line
            use: [{
                loader: 'babel-loader'
              }]
        }, ]
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

module.exports = config