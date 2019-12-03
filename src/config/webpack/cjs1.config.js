var path = require('path')
var webpack = require('webpack')
const env = process.env.NODE_ENV


var commonjs = {
    mode: 'development',
    entry: {
        main: [path.resolve(__dirname, '../../www/browser.js')],
        m_default: path.resolve(__dirname, '../../module/default/index.js')
    },

    output: {
        // library: 'Khanakia',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '../../../public/dist'),
        filename: '[name].cjs.js',
    },

    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/, // add this line

            use: [{
                loader: 'babel-loader',
                options: {
                  presets: [
                    ["@babel/preset-env", {
                        modules: 'commonjs'
                    }],
                    "@babel/preset-react",
                    // "@babel/preset-stage-0",
                  ],
                  plugins: [
                    // Stage 0
                    // "@babel/plugin-transform-runtime",
                    // "@babel/plugin-proposal-function-bind",
                    // ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    // ["@babel/plugin-proposal-class-properties", { "loose": true }],
                    // "@babel/plugin-syntax-dynamic-import",
                    // "@babel/plugin-transform-classes",
                    // // require('babel-plugin-transform-object-rest-spread'),
                    // require('babel-plugin-transform-do-expressions'),

                    // // DISABLE CODE SPLITTING https://gist.github.com/jcenturion/892c718abce234243a156255f8f52468
                    // 'dynamic-import-webpack',
                    // 'remove-webpack'
                  ]
                }
            }]
        }, ]
    },

    externals: {
        'react':'react',
        'react-dom':'react-dom',
        "react-dom/server" : "react-dom/server",
        'react-router-dom' : 'react-router-dom',
        'mobx-react' : 'mobx-react',
        'react-loadable' : 'react-loadable',
        'antd' : 'antd'
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
module.exports = commonjs

