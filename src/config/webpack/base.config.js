var path = require('path')
var webpack = require('webpack')
const env = process.env.NODE_ENV


var baseConfig = {
    mode: 'development',
    entry: {
        main: [path.resolve(__dirname, '../../www/browser.js')],
        // m_default: path.resolve(__dirname, '../../module/default/index.js'),
        m_market: path.resolve(__dirname, '../../module/market/index.js'),
        m_admin: path.resolve(__dirname, '../../module/admin/index.js'),
        m_seller: path.resolve(__dirname, '../../module/seller/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../../../public/dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },

    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/, // add this line
            use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ["@babel/preset-env", {
                          "modules": false
                    }],
                    "@babel/preset-react",
                    // "@babel/preset-stage-0",
                  ],
                  plugins: [
                    // Stage 0
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-proposal-function-bind",
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose": true }],
                    "@babel/plugin-syntax-dynamic-import",
                    "@babel/plugin-transform-classes",
                    // require('babel-plugin-add-module-exports'),
                    // require('babel-plugin-transform-object-rest-spread'),
                    require('babel-plugin-transform-do-expressions')
                  ]
                }
            }
            

        }, ]
    },

    resolve: {
        alias: {
        //   "@jeoga": path.resolve(__dirname, '../../../../@jeoga'),
        //   "plugins": path.resolve(__dirname, '../../../../plugins'),
        }
    },

    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),
    ]
}


module.exports = baseConfig