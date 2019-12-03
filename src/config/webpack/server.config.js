var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
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

module.exports = serverConfig